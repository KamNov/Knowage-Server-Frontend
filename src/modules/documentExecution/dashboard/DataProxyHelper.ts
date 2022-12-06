/**
 * ! this helper will get the input informations from the widget requests and create an hash that will be used as unique data request identifier.
 * ! When the same data will be requested the helper will get it from the indexedDB, new data will be requested to the BE
 * TODO: add the hash manager and the indexedDB manager (dexie?)
 */

import i18n from '@/App.i18n'
import deepcopy from 'deepcopy'
import store from '@/App.store.js'
import { AxiosResponse } from 'axios'
import { setDatasetInterval, clearDatasetInterval } from './helpers/datasetRefresh/DatasetRefreshHelpers'
import { aggregationRegex, aggregationsRegex, limitRegex, rowsRegex } from './helpers/common/DashboardRegexHelper'
import { IDataset, ISelection, IVariable, IWidget, IModelDataset, IDashboardDatasetDriver } from './Dashboard'

const { t } = i18n.global
const mainStore = store()

export const getData = (item) =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve({ item, ...new Date() })
        }, 1000)
    })

export const getWidgetData = async (widget: IWidget, datasets: IModelDataset[], $http: any, initialCall: boolean, selections: ISelection[], associativeResponseSelections?: any) => {
    switch (widget.type) {
        case 'table':
            return await getTableWidgetData(widget, datasets, $http, initialCall, selections, associativeResponseSelections)
        case 'selector':
            return await getSelectorWidgetData(widget, datasets, $http, initialCall, selections, associativeResponseSelections)
        case 'html':
            return await getHtmlWidgetData(widget, datasets, $http, initialCall, selections, associativeResponseSelections)
        case 'text':
            return await getTextWidgetData(widget, datasets, $http, initialCall, selections, associativeResponseSelections)
        case 'chart':
            return await getChartWidgetData(widget, datasets, $http, initialCall, selections, associativeResponseSelections)
        default:
            break
    }
}

//#region ===================== Common Methods - Formatting Model, Drivers, Parameters, Selections Management ====================================================
const formatWidgetModelForGet = (propWidget: IWidget, dataset: IModelDataset, initialCall: boolean, selections: ISelection[], associativeResponseSelections?: any) => {
    var dataToSend = {
        aggregations: {
            dataset: '',
            measures: [],
            categories: []
        },
        parameters: {},
        selections: {},
        drivers: {},
        indexes: []
    } as any

    addSelectionsToData(dataToSend, propWidget, dataset.dsLabel, initialCall, selections, associativeResponseSelections)

    dataToSend.aggregations.dataset = dataset.dsLabel

    //summary rows - exclusive to table
    if (propWidget.type === 'table' && propWidget.settings.configuration.summaryRows.enabled) {
        dataToSend.summaryRow = getSummaryRow(propWidget)
    }

    propWidget.columns.forEach((column) => {
        if (column.fieldType === 'MEASURE') {
            let measureToPush = { id: column.alias, alias: column.alias, columnName: column.columnName, funct: column.aggregation, orderColumn: column.alias } as any
            column.formula ? (measureToPush.formula = column.formula) : ''
            dataToSend.aggregations.measures.push(measureToPush)
        } else {
            let attributeToPush = { id: column.alias, alias: column.alias, columnName: column.columnName, orderType: '', funct: 'NONE' } as any

            //sort logic - to be changed by other widgets
            if (propWidget.type === 'table' || propWidget.type === 'html' || propWidget.type === 'text') column.id === propWidget.settings.sortingColumn ? (attributeToPush.orderType = propWidget.settings.sortingOrder) : ''
            else attributeToPush.orderType = propWidget.settings.sortingOrder

            dataToSend.aggregations.categories.push(attributeToPush)
        }
    })

    console.log('USED DATASET , ', dataset)

    if (dataset.drivers && dataset.drivers.length > 0) {
        dataset.drivers.forEach((driver: IDashboardDatasetDriver) => {
            dataToSend.drivers[`${driver.urlName}`] = driver.parameterValue
        })
    }

    return dataToSend
}

const addSelectionsToData = (dataToSend: any, propWidget: IWidget, datasetLabel: string, initialCall: boolean, selections: ISelection[], associativeResponseSelections: any) => {
    if (associativeResponseSelections) {
        dataToSend.selections = associativeResponseSelections
    } else if (!initialCall) {
        dataToSend.selections = getFormattedSelections(selections)
    }
    addFiltersToPostData(propWidget, dataToSend.selections, datasetLabel)
}

const addFiltersToPostData = (propWidget: IWidget, selectionsToSend: any, datasetLabel: string) => {
    const filters = getFilters(propWidget, datasetLabel)
    const filterKeys = filters ? Object.keys(filters) : []
    filterKeys.forEach((key: string) => {
        if (selectionsToSend[key]) {
            addFilterToSelection(selectionsToSend[key], filters[key])
        } else {
            selectionsToSend[key] = filters[key]
        }
    })
}

const getFilters = (propWidget: IWidget, datasetLabel: string) => {
    var columns = propWidget.columns
    var activeFilters = {} as any

    columns.forEach((column) => {
        if (column.filter.enabled && column.filter.operator) {
            var filterData = { filterOperator: column.filter.operator, filterVals: [`('${column.filter.value}')`] }
            createNestedObject(activeFilters, [datasetLabel, column.columnName], filterData)
        }
    })

    return activeFilters
}

const createNestedObject = function (base, names, value) {
    var lastName = arguments.length === 3 ? names.pop() : false

    for (var i = 0; i < names.length; i++) {
        base = base[names[i]] = base[names[i]] || {}
    }
    if (lastName) base = base[lastName] = value

    return base
}

const addFilterToSelection = (selection: any, filter: any) => {
    const filterColumnKeys = filter ? Object.keys(filter) : []
    filterColumnKeys.forEach((key: string) => {
        if (selection[key]) {
            selection[key].push(filter[key])
        } else {
            selection[key] = filter[key]
        }
    })
}

const getFormattedSelections = (selections: ISelection[]) => {
    const formattedSelections = {}
    selections?.forEach((selection: ISelection) => {
        const formattedFilterValues = selection.value.map((value: string | number) => "('" + value + "')")
        if (formattedSelections[selection.datasetLabel]) formattedSelections[selection.datasetLabel][selection.columnName] = formattedFilterValues
        else {
            const key = selection.columnName
            formattedSelections[selection.datasetLabel] = { [key]: formattedFilterValues }
        }
    })
    return formattedSelections
}

const showGetDataError = (error: any, datasetLabel: string) => {
    let message = error.message
    if (error.message === '100') {
        message = t('dashboard.getDataError', { datasetLabel: datasetLabel })
    }
    mainStore.setError({ title: t('common.toast.errorTitle'), msg: message })
}

const resetDatasetInterval = (widget: IWidget) => {
    // TODO - set proper interval when realtime dataset example is ready
    if (widget.dataset || widget.dataset === 0) setDatasetInterval(widget.dataset as number, 10000)
}

export const getVariableData = async (variable: IVariable, datasets: IDataset[], $http: any) => {
    const selectedDataset = getVariableDatasetLabel(variable, datasets)
    if (!selectedDataset) return
    const url = `2.0/datasets/${selectedDataset.label}/data?offset=-1&size=-1&widgetName=undefined`
    const postData = { aggregations: { dataset: selectedDataset.label, measures: [], categories: [] }, parameters: {}, selections: {}, indexes: [] }
    let tempResponse = null as any
    await $http
        .post(import.meta.env.VITE_RESTFUL_SERVICES_PATH + url, postData, { headers: { 'X-Disable-Errors': 'true' } })
        .then((response: AxiosResponse<any>) => (tempResponse = response.data))
        .catch((error: any) => {
            showGetDataError(error, selectedDataset.label)
        })
    return tempResponse
}

const getVariableDatasetLabel = (variable: IVariable, datasets: IDataset[]) => {
    var datasetIndex = datasets.findIndex((dataset: IDataset) => variable.dataset === dataset.id.dsId)
    return datasetIndex !== -1 ? datasets[datasetIndex] : null
}
//#endregion ================================================================================================

//#region ===================== Table Widget ====================================================
export const getTableWidgetData = async (widget: IWidget, datasets: IModelDataset[], $http: any, initialCall: boolean, selections: ISelection[], associativeResponseSelections?: any) => {
    var datasetIndex = datasets.findIndex((dataset: IModelDataset) => widget.dataset === dataset.id)
    var selectedDataset = datasets[datasetIndex]

    if (selectedDataset) {
        var url = ''
        let pagination = widget.settings.pagination
        if (pagination.enabled) {
            url = `2.0/datasets/${selectedDataset.dsLabel}/data?offset=${pagination.properties.offset}&size=${pagination.properties.itemsNumber}&nearRealtime=true`
        } else url = `2.0/datasets/${selectedDataset.dsLabel}/data?offset=0&size=-1&nearRealtime=true`

        let postData = formatWidgetModelForGet(widget, selectedDataset, initialCall, selections, associativeResponseSelections)
        var tempResponse = null as any

        if (widget.dataset || widget.dataset === 0) clearDatasetInterval(widget.dataset)
        await $http
            .post(import.meta.env.VITE_RESTFUL_SERVICES_PATH + url, postData, { headers: { 'X-Disable-Errors': 'true' } })
            .then((response: AxiosResponse<any>) => {
                tempResponse = response.data
                if (pagination.enabled) widget.settings.pagination.properties.totalItems = response.data.results
                // pagination.totalItems = response.data.results
            })
            .catch((error: any) => {
                showGetDataError(error, selectedDataset.dsLabel)
            })
            .finally(() => {
                // TODO - uncomment when realtime dataset example is ready
                // resetDatasetInterval(widget)
            })

        return tempResponse
    }
}

const getSummaryRow = (propWidget: IWidget) => {
    var summaryArray = [] as any
    var columns = propWidget.columns
    for (var k in propWidget.settings.configuration.summaryRows.list) {
        var measures = [] as any
        if (columns) {
            for (var i = 0; i < columns.length; i++) {
                var col = columns[i]
                if (col.fieldType != 'ATTRIBUTE') {
                    var obj = {}
                    obj['id'] = col.columnName || col.alias
                    obj['alias'] = col.alias || col.alias

                    if (propWidget.settings.configuration.summaryRows.list[k].aggregation == 'Columns Default Aggregation') obj['funct'] = col.aggregation
                    else obj['funct'] = propWidget.settings.configuration.summaryRows.list[k].aggregation || col.aggregation

                    if (col.formula) {
                        obj['formula'] = col.formula
                    } else obj['columnName'] = col.columnName

                    measures.push(obj)
                }
            }
        }
        var result = {} as any
        result['measures'] = measures
        result['dataset'] = propWidget.dataset
        summaryArray.push(result)
    }

    return summaryArray
}
//#endregion ================================================================================================

//#region ===================== Selector Widget ====================================================
export const getSelectorWidgetData = async (widget: IWidget, datasets: IModelDataset[], $http: any, initialCall: boolean, selections: ISelection[], associativeResponseSelections?: any) => {
    var datasetIndex = datasets.findIndex((dataset: any) => widget.dataset === dataset.id)
    var selectedDataset = datasets[datasetIndex]

    if (selectedDataset) {
        var url = `2.0/datasets/${selectedDataset.dsLabel}/data?offset=-1&size=-1&nearRealtime=true`

        let postData = formatWidgetModelForGet(widget, selectedDataset, initialCall, selections, associativeResponseSelections)
        var tempResponse = null as any

        if (widget.dataset || widget.dataset === 0) clearDatasetInterval(widget.dataset)
        await $http
            .post(import.meta.env.VITE_RESTFUL_SERVICES_PATH + url, postData, { headers: { 'X-Disable-Errors': 'true' } })
            .then((response: AxiosResponse<any>) => {
                tempResponse = response.data
                tempResponse.initialCall = initialCall
            })
            .catch((error: any) => {
                showGetDataError(error, selectedDataset.dsLabel)
            })
            .finally(() => {
                // TODO - uncomment when realtime dataset example is ready
                // resetDatasetInterval(widget)
            })
        return tempResponse
    }
}
//#endregion ================================================================================================

//#region ===================== Text & HTML Widget ====================================================
export const getTextWidgetData = async (widget: IWidget, datasets: IModelDataset[], $http: any, initialCall: boolean, selections: ISelection[], associativeResponseSelections?: any) => {
    var datasetIndex = datasets.findIndex((dataset: any) => widget.dataset === dataset.id.dsId)
    var selectedDataset = datasets[datasetIndex]

    if (selectedDataset && widget.settings.editor.text) {
        var text = widget.settings.editor.text
        var numOfRowsToGet = maxRow(widget)
        var url = `2.0/datasets/${selectedDataset.dsLabel}/data?offset=0&size=${numOfRowsToGet}&nearRealtime=true&limit=${numOfRowsToGet}`

        var aggregationsModel = getAggregationsModel(widget, text, selectedDataset)
        var aggregationDataset = null as any
        if (aggregationsModel) {
            let aggregationsPostData = formatWidgetModelForGet(aggregationsModel, selectedDataset, initialCall, selections, associativeResponseSelections)
            await $http
                .post(import.meta.env.VITE_RESTFUL_SERVICES_PATH + url, aggregationsPostData, { headers: { 'X-Disable-Errors': 'true' } })
                .then((response: AxiosResponse<any>) => {
                    aggregationDataset = response.data
                })
                .catch((error: any) => {
                    showGetDataError(error, selectedDataset.dsLabel)
                })
        }

        let postData = formatWidgetModelForGet(widget, selectedDataset, initialCall, selections, associativeResponseSelections)
        var tempResponse = null as any
        if (widget.dataset || widget.dataset === 0) clearDatasetInterval(widget.dataset)
        await $http
            .post(import.meta.env.VITE_RESTFUL_SERVICES_PATH + url, postData, { headers: { 'X-Disable-Errors': 'true' } })
            .then((response: AxiosResponse<any>) => {
                tempResponse = response.data
                tempResponse.initialCall = initialCall
            })
            .catch((error: any) => {
                showGetDataError(error, selectedDataset.dsLabel)
            })
            .finally(() => {
                // TODO - uncomment when realtime dataset example is ready
                // resetDatasetInterval(widget)
            })

        return { tempResponse: tempResponse, aggregationDataset: aggregationDataset }
    }
}

export const getHtmlWidgetData = async (widget: IWidget, datasets: IModelDataset[], $http: any, initialCall: boolean, selections: ISelection[], associativeResponseSelections?: any) => {
    var datasetIndex = datasets.findIndex((dataset: any) => widget.dataset === dataset.id.dsId)
    var selectedDataset = datasets[datasetIndex]

    if (selectedDataset && widget.settings.editor.html) {
        var html = widget.settings.editor.html
        var numOfRowsToGet = maxRow(widget)
        var url = `2.0/datasets/${selectedDataset.dsLabel}/data?offset=0&size=${numOfRowsToGet}&nearRealtime=true&limit=${numOfRowsToGet}`

        var aggregationsModel = getAggregationsModel(widget, html, selectedDataset)
        var aggregationDataset = null as any
        if (aggregationsModel) {
            let aggregationsPostData = formatWidgetModelForGet(aggregationsModel, selectedDataset, initialCall, selections, associativeResponseSelections)
            await $http
                .post(import.meta.env.VITE_RESTFUL_SERVICES_PATH + url, aggregationsPostData, { headers: { 'X-Disable-Errors': 'true' } })
                .then((response: AxiosResponse<any>) => {
                    aggregationDataset = response.data
                })
                .catch((error: any) => {
                    showGetDataError(error, selectedDataset.dsLabel)
                })
        }

        let postData = formatWidgetModelForGet(widget, selectedDataset, initialCall, selections, associativeResponseSelections)
        var tempResponse = null as any
        if (widget.dataset || widget.dataset === 0) clearDatasetInterval(widget.dataset)
        await $http
            .post(import.meta.env.VITE_RESTFUL_SERVICES_PATH + url, postData, { headers: { 'X-Disable-Errors': 'true' } })
            .then((response: AxiosResponse<any>) => {
                tempResponse = response.data
                tempResponse.initialCall = initialCall
            })
            .catch((error: any) => {
                showGetDataError(error, selectedDataset.dsLabel)
            })
            .finally(() => {
                // TODO - uncomment when realtime dataset example is ready
                // resetDatasetInterval(widget)
            })

        return { tempResponse: tempResponse, aggregationDataset: aggregationDataset }
    }
}

const maxRow = (widgetModel) => {
    if (!widgetModel) return

    const str = widgetModel.type == 'html' ? widgetModel.settings.editor.css + widgetModel.settings.editor.html : widgetModel.settings.editor.text
    let tempMaxRow = 1
    const repeaters = str.replace(limitRegex, function (match: string, p1: any) {
        if (parseInt(p1) == -1) tempMaxRow = -1
        else if (p1 > tempMaxRow) tempMaxRow = parseInt(p1) + 1
    })
    const occurrencies = str.replace(rowsRegex, function (match: string, p1: any, p2: any) {
        if (p2 >= tempMaxRow) tempMaxRow = parseInt(p2) + 1
    })
    return tempMaxRow
}

const getAggregationsModel = (widgetModel, rawHtml, selectedDataset) => {
    var aggregationsReg = rawHtml.match(aggregationsRegex)
    if (aggregationsReg) {
        var modelToSend = deepcopy(widgetModel)
        const tempModel = deepcopy(widgetModel)
        delete modelToSend.settings
        modelToSend.columns = []

        for (var a in aggregationsReg) {
            var aggregationReg = aggregationRegex.exec(aggregationsReg[a])
            for (var m in tempModel.columns) {
                if (aggregationReg && aggregationReg[1] && tempModel.columns[m].columnName == aggregationReg[1]) {
                    tempModel.columns[m].alias = aggregationReg[1] + '_' + aggregationReg[3]
                    tempModel.columns[m].fieldType = 'MEASURE'
                    tempModel.columns[m].aggregation = aggregationReg[3]
                    var exists = false
                    for (var c in modelToSend.columns) {
                        if (modelToSend.columns[c].alias == aggregationReg[1] + '_' + aggregationReg[3]) exists = true
                    }
                    if (!exists) modelToSend.columns.push(deepcopy(tempModel.columns[m]))
                }
            }
        }
        return modelToSend
    } else return null
}

//#endregion ================================================================================================

export const getChartWidgetData = async (widget: IWidget, datasets: IModelDataset[], $http: any, initialCall: boolean, selections: ISelection[], associativeResponseSelections?: any) => {
    var datasetIndex = datasets.findIndex((dataset: IModelDataset) => widget.dataset === dataset.id)
    var selectedDataset = datasets[datasetIndex]

    if (selectedDataset) {
        console.log('', widget)
        var url = `2.0/datasets/${selectedDataset.dsLabel}/data?offset=-1&size=-1&nearRealtime=true`

        let postData = formatWidgetModelForGet(widget, selectedDataset, initialCall, selections, associativeResponseSelections)
        var tempResponse = null as any

        console.group(`%c Widget ---------------`, 'background: #121212; color: orange')
        console.log(widget)
        console.log(postData)
        console.groupEnd()

        if (widget.dataset || widget.dataset === 0) clearDatasetInterval(widget.dataset)
        await $http
            .post(import.meta.env.VITE_RESTFUL_SERVICES_PATH + url, postData, { headers: { 'X-Disable-Errors': 'true' } })
            .then((response: AxiosResponse<any>) => {
                tempResponse = response.data
                tempResponse.initialCall = initialCall
            })
            .catch((error: any) => {
                showGetDataError(error, selectedDataset.dsLabel)
            })
            .finally(() => {
                // TODO - uncomment when realtime dataset example is ready
                // resetDatasetInterval(widget)
            })
        return tempResponse
    }
}
