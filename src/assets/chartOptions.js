export const chartOptions = {
    series:[
        {
            name: 'Online Customers',
            data: [40,70,20,90,36,80,91,60]
        },
        {
            name: 'Store Customers',
            data: [40,50,20,70,36,20,75,68, 20, 51, 10]
        }
    ],
    options: {
        color: ['#6ab04c', '#2980b9'],
        chart:{
            background: 'transparent'
        },
        dataLabels: {
            enabled: false,
        },
        stroke:{
            curve: 'smooth',
        },
        xaxis:{
            categories:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        legend:{
            position: 'top',
        },
        grid: {
            show: true,
        }
    }
}