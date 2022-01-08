import { DataGrid } from "@mui/x-data-grid"
import { collection, onSnapshot } from "firebase/firestore"
import moment from "moment"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { db } from "../firebase"

function FourGirlsTable() {
    const [loading, setLoading] = useState(true)
    const [userRows, setUserRows] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        const unsabscribe = onSnapshot(collection(db,'4 Girls'), (snapshot) => {
            const dataArr = []
            snapshot.forEach((snap) => {
                dataArr.push({
                  id: snap.id,
                  ...snap.data(),
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
        { field: 'timestamp', headerName: "Timestamp", width: 180 },
        { field: 'status', headerName: "Status", width: 180 },
        { field: 'view', headerName: "View", width: 180, renderCell: (params) => (
            <div className="">
                <button 
                    className="bg-green-800 text-white px-3 py-1 rounded-full" 
                    onClick={() => navigate(`/admin/customers/4-girls/${params.row.id}`,{
                        state:{
                            userRows,
                        }
                    })} 
                >View group</button>
            </div>
        )  },
      ];
    console.log(userRows)
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

export default FourGirlsTable