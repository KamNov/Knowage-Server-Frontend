import { AxiosResponse } from 'axios'
import { addDataToCache, addDriversToData, addParametersToData, addSelectionsToData, hasFields, showGetDataError } from '@/modules/documentExecution/dashboard/DashboardDataProxy'
import { clearDatasetInterval } from '@/modules/documentExecution/dashboard/helpers/datasetRefresh/DatasetRefreshHelpers'
import { IDashboardDataset, IWidget, ISelection, IDashboardConfiguration } from '@/modules/documentExecution/dashboard/Dashboard'
import { md5 } from 'js-md5'
import { indexedDB } from '@/idb'

export const getPivotData = async (dashboardId: any, dashboardConfig: IDashboardConfiguration, widget: IWidget, datasets: IDashboardDataset[], $http: any, initialCall: boolean, selections: ISelection[], associativeResponseSelections?: any) => {
    const datasetIndex = datasets.findIndex((dataset: IDashboardDataset) => widget.dataset === dataset.id)
    const selectedDataset = datasets[datasetIndex]

    if (selectedDataset && hasFields(widget)) {
        const url = `/restful-services/2.0/datasets/${selectedDataset.dsLabel}/data?offset=-1&size=-1&nearRealtime=true`

        const postData = formatPivotModelForGet(dashboardId, widget, selectedDataset, initialCall, selections, associativeResponseSelections)
        let tempResponse = null as any

        if (widget.dataset || widget.dataset === 0) clearDatasetInterval(widget.dataset)

        const dataHash = md5(JSON.stringify(postData))
        const cachedData = await indexedDB.widgetData.get(dataHash)

        if (dashboardConfig.menuWidgets.enableCaching && cachedData && cachedData.data) {
            tempResponse = cachedData.data
            tempResponse.initialCall = initialCall
        } else {
            await $http
                .post(import.meta.env.VITE_KNOWAGE_CONTEXT + url, postData, { headers: { 'X-Disable-Errors': 'true' } })
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
                    if (dashboardConfig.menuWidgets.enableCaching) addDataToCache(dataHash, tempResponse)
                })
        }

        return tempResponse
    }
}

const formatPivotModelForGet = (dashboardId: any, propWidget: IWidget, dataset: IDashboardDataset, initialCall: boolean, selections: ISelection[], associativeResponseSelections?: any) => {
    const dataToSend = {
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
    addDriversToData(dataset, dataToSend)
    addParametersToData(dataset, dashboardId, dataToSend)

    dataToSend.aggregations.dataset = dataset.dsLabel

    for (const fieldsName in propWidget.fields) {
        const fields = propWidget.fields[fieldsName]
        fields.forEach((field) => {
            if (field.fieldType === 'MEASURE') {
                const measureToPush = { id: field.alias, alias: field.alias, columnName: field.columnName, funct: field.aggregation, orderColumn: field.alias } as any
                field.formula ? (measureToPush.formula = field.formula) : ''
                dataToSend.aggregations.measures.push(measureToPush)
            } else {
                const attributeToPush = { id: field.alias, alias: field.alias, columnName: field.columnName, orderType: '', funct: 'NONE' } as any
                dataToSend.aggregations.categories.push(attributeToPush)
            }
        })
    }

    return dataToSend
}
