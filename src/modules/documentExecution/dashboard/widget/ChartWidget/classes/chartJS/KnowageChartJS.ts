import { IChartJSChartModel } from "@/modules/documentExecution/dashboard/interfaces/chartJS/DashboardChartJSWidget";
import * as  chartJSDefaultValues from "../../../WidgetEditor/helpers/chartWidget/chartJS/ChartJSDefaultValues"

export class KnowageChartJS {
    model: IChartJSChartModel

    constructor() {
        this.model = this.createNewChartModel()
    }

    getModel = () => {
        return this.model;
    }

    createNewChartModel = () => {
        return {
            chart: { type: '' },
            data: {
                labels: [],
                datasets: [{ backgroundColor: [], data: [] }]
            },
            options: {
                plugins: {
                    title: { display: false },
                    tooltip: chartJSDefaultValues.getDefaultTooltipSettings(),
                    legend: chartJSDefaultValues.getDefaultLegendSettings()
                }
            }
        }

    }
}
