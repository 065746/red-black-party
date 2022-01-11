import { DataGrid } from "@mui/x-data-grid"
import { collection, onSnapshot } from "firebase/firestore"
import moment from "moment"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Modal from "../admin/Modal"
import Spinner from "../components/Spinner"
import { useStateValue } from "../context/StateProider"
import { db } from "../firebase"

function FourGirlsTable() {
    const [loading, setLoading] = useState(true)
    const [userRows, setUserRows] = useState([])
    const [open, setOpen] = useState(false)
    const [findDoc, setFindDoc] = useState('')

    const [{hide}, dispatch] = useStateValue()
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
    const columns = [
        { field: 'id', headerName: 'ID', width: 180 },
        { field: 'timestamp', headerName: "Timestamp", width: 180 },
        { field: 'status', headerName: "Status", width: 180 },
        { field: 'view', headerName: "View", width: 180, renderCell: (params) => (
            <div className="space-x-2">
                <button onClick={() => {
                    setOpen(true)
                    setFindDoc(params.row.id)
                }} className="px-3 py-2 bg-red-700 rounded-full text-white"
                >
                    Delete
                </button>
                <button 
                    className="bg-green-800 text-white px-3 py-2 rounded-full" 
                    onClick={() => navigate(`/admin/customers/4-girls/${params.row.id}`,{
                        state:{
                            userRows,
                        }
                    })} 
                >View group</button>
            </div>
        )  },
      ];
    console.log(loading)
    return (
        <div className={`h-screen w-[calc(100%-300px)] ml-auto px-10 pb-8 ${hide && '!w-full'} `}>
            <h2 className="text-center text-3xl font-semibold mb-7">"Four Girls" Table</h2>
            {loading ? <Spinner />
                     : <DataGrid
                        rows={userRows} 
                        columns={columns}
                        checkboxSelection
                        />
            }
            <Modal open={open} setOpen={setOpen} document={'4 Girls'} id={findDoc} />
        </div>
    )
}

export default FourGirlsTable