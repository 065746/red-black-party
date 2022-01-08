import { useEffect, useState } from "react"
import { UserGroupIcon, UserIcon, UsersIcon } from '@heroicons/react/outline'
import { DataGrid } from '@mui/x-data-grid';
import { collection, onSnapshot } from "firebase/firestore"
import Chart from 'react-apexcharts'
import { db } from "../firebase"
import StatusCard from "../admin/StatusCard"
import { Link } from "react-router-dom";
import { chartOptions } from "../assets/chartOptions";
import { useNavigate } from 'react-router-dom'

function Dashboard() {
    const [loading, setLoading] = useState(true)
    const [userRows, setUserRows] = useState([])
    const [coupleArr, setCoupleArr] = useState([])
    const [fourBoysArr, setFourBoysArr] = useState([])
    const [fourGirlsArr , setFourGirlsArr] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        const unsabscribe = onSnapshot(collection(db,'One Person'), (snapshot) => {
            const dataArr = []
            snapshot.forEach((snap) => {
                dataArr.push({
                  id: snap.id,
                  ...snap.data()
                })
              })
              setUserRows(dataArr)
        })
        setLoading(false)
        return () => unsabscribe()
    }, [db, loading])

    useEffect(() => {
        const unsabscribe = onSnapshot(collection(db,'Couple'), (snapshot) => {
            const dataArr = []
            snapshot.forEach((snap) => {
                dataArr.push({
                  id: snap.id,
                  ...snap.data()
                })
              })
              setCoupleArr(dataArr)
        })
        setLoading(false)
        return () => unsabscribe()
    }, [db, loading])

    useEffect(() => {
        const unsabscribe = onSnapshot(collection(db,'4 Boys'), (snapshot) => {
            const dataArr = []
            snapshot.forEach((snap) => {
                dataArr.push({
                  id: snap.id,
                  ...snap.data()
                })
              })
              setFourBoysArr(dataArr)
        })
        setLoading(false)
        return () => unsabscribe()
    }, [db, loading])

    useEffect(() => {
        const unsabscribe = onSnapshot(collection(db,'4 Girls'), (snapshot) => {
            const dataArr = []
            snapshot.forEach((snap) => {
                dataArr.push({
                  id: snap.id,
                  ...snap.data()
                })
              })
              setFourGirlsArr(dataArr)
        })
        setLoading(false)
        return () => unsabscribe()
    }, [db, loading])
      
      const columns = [
        { field: 'id', headerName: 'ID', width: 180 },
        { field: 'fullName', headerName: 'Full Name', width: 150 },
        { field: 'phoneNumber', headerName: 'Phone Number', width: 150 },
        { field: 'email', headerName: 'Email', width: 150 },
      ];
    return (
        <div className='ml-[300px] px-6 py-2'>
            <h2 className=''>Dashboard</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <div className="">
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        <StatusCard Icon={UserIcon} title='One Person' count={userRows.length} redirect={() => navigate('/admin/customers/one-person')} />
                        <StatusCard Icon={UsersIcon} title='Couple' count={coupleArr.length} redirect={() => navigate('/admin/customers/couple')} />
                        <StatusCard Icon={UserGroupIcon} title='4 Boys' count={fourBoysArr.length} redirect={() => navigate('/admin/customers/4-boys')} />
                        <StatusCard Icon={UserGroupIcon} title='4 Girls' count={fourGirlsArr.length} redirect={() => navigate('/admin/customers/4-girls')}/>
                    </div>
                </div>
                <div className="w-full">
                    <div className="card h-full max-h-64 shadow-md rounded-md">
                        <Chart 
                            options={chartOptions.options}
                            series={chartOptions.series}
                            type='line'
                            height='100%'
                        />
                    </div>
                </div>
            </div>
            <div className="h-screen py-7 space-y-5">
                <h2 className='text-2xl font-semibold'>Recent Submitted Clients</h2>
                <DataGrid 
                    rows={userRows} 
                    columns={columns}
                    checkboxSelection
                />
                <Link to='/admin/customers' >View More</Link>
            </div>
        </div>
    )
}

export default Dashboard
