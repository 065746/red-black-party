import { useEffect, useState } from "react"
import { DataGrid } from "@mui/x-data-grid"
import { collection, onSnapshot } from "firebase/firestore"
import moment from "moment"
import { useLocation, useNavigate } from "react-router-dom"
import Spinner from "../components/Spinner"
import { db } from "../firebase"

function OnePersonTable() {
    const [loading, setLoading] = useState(true)
    const [userRows, setUserRows] = useState([])
    const navigate = useNavigate()
    const { state } = useLocation()
    useEffect(() => {
        const unsabscribe = onSnapshot(collection(db,'Couple'), (snapshot) => {
            const dataArr = []
            snapshot.forEach((snap) => {
                dataArr.push({
                  id: snap.id,
                  ...snap.data().perso1,
                  fullName2: snap.data().perso2.fullName,
                  email2: snap.data().perso2.email,
                  phoneNumber2: snap.data().perso2.phoneNumber,
                  gender2: snap.data().perso2.gender,
                  status: snap.data().status,
                  timestamp: moment(snap.data().timestamp.seconds*1000).format('MMMM Do YYYY')
                })
              })
              setUserRows(dataArr)
        })
        setLoading(false)
        return () => unsabscribe()
    }, [loading, state])
    
    const columns = [
        { field: 'id', headerName: 'ID', width: 180 },
        { field: 'fullName', headerName: "First Person's Full Name", width: 260 },
        { field: 'email', headerName: "First Person's Email", width: 260 },
        { field: 'phoneNumber', headerName: "First Person's Phone Number", width: 260 },
        // { field: 'gender', headerName: "First Person's gender", width: 260 },
        { field: 'fullName2', headerName: "Second Person's Full Name", width: 260 },
        { field: 'email2', headerName: "Second Person's Email", width: 260 },
        { field: 'phoneNumber2', headerName: "Second Person's Phone Number", width: 260 },
        { field: 'status', headerName: "Couple status", width: 200 },
        { field: 'timestamp', headerName: "Timestamp", width: 260 },
        { field: 'actions', headerName: "Actions", width: 260, renderCell: (params) => (
          <div className="space-x-2">
                <button className="px-3 py-2 bg-red-700 rounded-full text-white">Delete</button>
                <button onClick={() => navigate(`/admin/customers/couple/${params.row.id}`, {
                    state: userRows
                })} className="px-3 py-2 bg-green-700 rounded-full text-white">View</button>
            </div>
        ) },

      ];
    return (
        <div className="h-screen w-[calc(100%-300px)] ml-auto px-10 pb-8">
            {!userRows.length ? <Spinner /> 
                       :  <DataGrid
                            rows={userRows} 
                            columns={columns}
                            checkboxSelection
                            />}
        </div>
    )
}

export default OnePersonTable