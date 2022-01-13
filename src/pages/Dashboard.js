import { useEffect, useState } from "react"
import { UserGroupIcon, UserIcon, UsersIcon } from '@heroicons/react/outline'
import { DataGrid } from '@mui/x-data-grid';
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { db } from "../firebase"
import StatusCard from "../admin/StatusCard"
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { useStateValue } from "../context/StateProider";
import moment from "moment";
import ChartTable from "../admin/ChartTable";

function Dashboard() {
    const [loading, setLoading] = useState(true)
    const [onePerson, setOnePerson] = useState([])
    const [coupleArr, setCoupleArr] = useState([])
    const [fourBoysArr, setFourBoysArr] = useState([])
    const [fourGirlsArr , setFourGirlsArr] = useState([])

    const [{hide}, dispatch] = useStateValue()
    const navigate = useNavigate()
    useEffect(() => {
        const unsabscribe = onSnapshot(query(collection(db,'One Person'), orderBy('timestamp', 'desc')), (snapshot) => {
            const dataArr = []
            snapshot.forEach((snap) => {
                dataArr.push({
                  id: snap.id,
                  ...snap.data().perso1,
                  timestamp: moment(snap.data().timestamp.seconds*1000).format('MMMM Do YYYY')
                })
              })
              setOnePerson(dataArr)
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
                  ...snap.data(),
                  timestamp: moment(snap.data().timestamp.seconds*1000).format('MMMM Do YYYY')
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
        { field: 'email', headerName: 'Email', width: 220 },
        { field: 'timestamp', headerName: 'Timestamp', width: 150 },
      ];
    return (
        <div className={`ml-[300px] transition-all duration-200  px-6 py-2 ${hide && 'ml-0'}`}>
            <h2 className='text-3xl mb-3'>Dashboard</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <div className="">
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        <StatusCard Icon={UserIcon} title='One Person' count={onePerson.length} redirect={() => navigate('/admin/customers/one-person')} />
                        <StatusCard Icon={UsersIcon} title='Couple' count={coupleArr.length} redirect={() => navigate('/admin/customers/couple')} />
                        <StatusCard Icon={UserGroupIcon} title='4 Boys' count={fourBoysArr.length} redirect={() => navigate('/admin/customers/4-boys')} />
                        <StatusCard Icon={UserGroupIcon} title='4 Girls' count={fourGirlsArr.length} redirect={() => navigate('/admin/customers/4-girls')}/>
                    </div>
                </div>
                <div className="w-full">
                    <ChartTable />
                </div>
            </div>
            <div className="h-screen py-7 space-y-5">
                <h2 className='text-2xl font-semibold'>Recent Submitted Clients</h2>
                <DataGrid 
                    rows={onePerson} 
                    columns={columns}
                    checkboxSelection
                />
                <Link to='/admin/customers' >View More</Link>
            </div>
        </div>
    )
}

export default Dashboard
