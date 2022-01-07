import { useEffect, useState } from "react"
import { DataGrid } from "@mui/x-data-grid"
import { collection, onSnapshot } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import moment from "moment"
import { db } from "../firebase"

function OnePersonTable() {
    const [loading, setLoading] = useState(true)
    const [userRows, setUserRows] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        const unsabscribe = onSnapshot(collection(db,'One Person'), (snapshot) => {
            const dataArr = []
            snapshot.forEach((snap) => {
                dataArr.push({
                  id: snap.id,
                  ...snap.data().perso1,
                  status: snap.data().status,
                  gender : snap.data().perso1.gender.type,
                  timestamp: moment(snap.data().timestamp.seconds*1000).format('MMMM Do YYYY')
                })
              })
              setUserRows(dataArr)
        })
        setLoading(false)
        return () => unsabscribe()
    }, [loading])
    console.log(userRows)
    const columns = [
        { field: 'id', headerName: 'ID', width: 180 },
        { field: 'fullName', headerName: 'Full Name', width: 150 },
        { field: 'phoneNumber', headerName: 'Phone Number', width: 150 },
        { field: 'email', headerName: 'Email', width: 150 },
        { field: 'gender', headerName: 'Gender', width: 150 },
        { field: 'status', headerName: 'Status', width: 150 },
        { field: 'timestamp', headerName: 'Timestamp', width: 150 },
        { field: 'view', headerName: 'View', width: 150, renderCell: (params) => (
            <div className="space-x-2">
                <button className="px-3 py-2 bg-red-700 rounded-full text-white">Delete</button>
                <button onClick={() => navigate(`/admin/customers/one-person/${params.row.id}`, {
                    state: userRows
                })} className="px-3 py-2 bg-green-700 rounded-full text-white">View</button>
            </div>
        ) },
      ];
    return (
        <div className="h-screen w-[calc(100%-300px)] ml-auto px-10 pb-8">
            <DataGrid
                rows={userRows} 
                columns={columns}
                checkboxSelection
            />
        </div>
    )
}

export default OnePersonTable
