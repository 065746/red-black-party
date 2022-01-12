import Chart from 'react-apexcharts'
import { chartOptions } from "../assets/chartOptions"


function ChartTable() {
    return (
        <div className="card h-full max-h-64 shadow-md rounded-md">
            <Chart 
                options={chartOptions.options}
                series={chartOptions.series}
                type='line'
                height='100%'
            />
        </div>
    )
}

export default ChartTable
