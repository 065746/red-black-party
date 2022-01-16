import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { db } from '../firebase'


function ChartTable() {
    const [loading, setLoading] = useState(true)
    const [onePersonArr, setOnePersonArr] = useState([])
    const [coupleArr, setCoupleArr] = useState([])
    const [fourBoysArr, setFourBoysArr] = useState([])
    const [fourGirlsArr , setFourGirlsArr] = useState([])
    useEffect(() => {
        const unsabscribe = onSnapshot(collection(db,'One Person'), (snapshot) => {
            setOnePersonArr(snapshot.docs)
        })
        setLoading(false)
        return () => unsabscribe()
    }, [db, loading])

    useEffect(() => {
        const unsabscribe = onSnapshot(collection(db,'Couple'), (snapshot) => {
              setCoupleArr(snapshot.docs)
        })
        setLoading(false)
        return () => unsabscribe()
    }, [db, loading])

    useEffect(() => {
        const unsabscribe = onSnapshot(collection(db,'4 Boys'), (snapshot) => {
              setFourBoysArr(snapshot.docs)
        })
        setLoading(false)
        return () => unsabscribe()
    }, [db, loading])

    useEffect(() => {
        const unsabscribe = onSnapshot(collection(db,'4 Girls'), (snapshot) => {
              setFourGirlsArr(snapshot.docs)
        })
        setLoading(false)
        return () => unsabscribe()
    }, [db, loading])
      
    const chartOptions = {
        options: {
            chart: {
                background: '#f4f4f4',
                foreColor: '#333'
            },
            xaxis: {
                categories: [
                    'One Person',
                    'Couple',
                    'Four Boys',
                    'Four Girls'
                  ]
            },
            plotOptions: {
                bar:{
                    horizontal: false
                }
            },
            fill: {
                colors: ["#F44336"]
              },

            dataLabels: {
                enabled: false
            },
            
            title: {
                text: "Analytics",
                align: "center",
                margin: 20,
                offsetY: 20,
                style: {
                    fontSize: "25px"
                }
            }
        },
        series:[
            {
                name: 'Person',
                data: [
                    onePersonArr.length,
                    coupleArr.length,
                    fourBoysArr.length,
                    fourGirlsArr.length,
                  ]
            }
        ]
    }
    return (
        <div className="card h-full max-h-64 shadow-md rounded-md">
            <Chart 
                options={chartOptions.options}
                series={chartOptions.series}
                type='bar'
                height='100%'
            />
        </div>
    )
}

export default ChartTable
