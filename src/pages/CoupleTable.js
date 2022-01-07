import { DataGrid } from "@mui/x-data-grid"
import { collection, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import Spinner from "../components/Spinner"
import { db } from "../firebase"

function OnePersonTable() {
    const [loading, setLoading] = useState(true)
    const [userRows, setUserRows] = useState([])
    useEffect(() => {
        const unsabscribe = onSnapshot(collection(db,'Couple'), (snapshot) => {
            const dataArr = []
            snapshot.forEach((snap) => {
                dataArr.push({
                  id: snap.id,
                  ...snap.data().perso1,
                  fullName2: snap.data().perso2.fullName,
                  email2: snap.data().perso2.email,
                  phoneNumber2: snap.data().perso2.phoneNumber
                })
              })
              setUserRows(dataArr)
        })
        setLoading(false)
        return () => unsabscribe()
    }, [loading])
    const columns = [
        { field: 'id', headerName: 'ID', width: 180 },
        { field: 'fullName', headerName: "First Person's Full Name", width: 260 },
        { field: 'email', headerName: "First Person's Email", width: 260 },
        { field: 'phoneNumber', headerName: "First Person's Phone Number", width: 260 },
        { field: 'fullName2', headerName: "Second Person's Full Name", width: 260 },
        { field: 'email2', headerName: "Second Person's Email", width: 260 },
        { field: 'phoneNumber2', headerName: "Second Person's Phone Number", width: 260 },
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