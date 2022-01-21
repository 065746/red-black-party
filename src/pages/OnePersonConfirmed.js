import { useEffect, useState } from "react"
import { DataGrid } from "@mui/x-data-grid"
import { collection, onSnapshot, query, orderBy } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import moment from "moment"
import { db } from "../firebase"
import { useStateValue } from "../context/StateProider"
import Spinner from "../components/Spinner"
import Modal from "../admin/Modal"

function OnePersonConfirmed() {
    const [loading, setLoading] = useState(true)
    const [userRows, setUserRows] = useState([])
    const [open, setOpen] = useState(false) 
    const [findDoc, setFindDoc] = useState('')

    const navigate = useNavigate()
    const [{hide, search}, dispatch] = useStateValue()

    useEffect(() => {
        if(search){
            const newUsers = userRows.filter(user => {
                if (user.fullName.toLowerCase().includes(search.toLowerCase())) {
                 return user
               }
             })
             setUserRows(newUsers)
        } else {
            const unsabscribe = onSnapshot(query(collection(db,'One Person'), orderBy('timestamp', 'desc')), (snapshot) => {
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
        }
    }, [loading, search])

    const columns = [
        { field: 'id', headerName: 'ID', width: 180 },
        { field: 'fullName', headerName: 'Full Name', width: 150 },
        { field: 'phoneNumber', headerName: 'Phone Number', width: 200, renderCell: (params) => (
            <div className='flex items-center space-x-2'>
                <p>{params.row.phoneNumber}</p>
                <a className='bg-green-700 p-2 rounded-full text-white' href={`https://wa.me/${params.row.phoneNumber}`} target={'_blank'} >Watp</a>
            </div>
        ) },
        { field: 'email', headerName: 'Email', width: 150 },
        { field: 'gender', headerName: 'Gender', width: 100 },
        { field: 'status', headerName: 'Status', width: 150 },
        { field: 'timestamp', headerName: 'Timestamp', width: 150 },
        // { field: 'view', headerName: 'View', width: 150, renderCell: (params) => (
        //     <div className="space-x-2">
        //         <button onClick={() => {
        //             setOpen(true)
        //             setFindDoc(params.row.id)
        //         }} className="px-3 py-2 bg-red-700 rounded-full text-white">Delete</button>
        //         <button onClick={() => navigate(`/admin/customers/one-person/${params.row.id}`, {
        //             state: userRows
        //         })} className="px-3 py-2 bg-green-700 rounded-full text-white">View</button>
        //     </div>
        // ) },
      ];
    return (
        <div className={`h-screen w-[calc(100%-300px)] ml-auto px-10 pb-8 transition-all duration-200 ${hide && '!w-full'}`}>
            <h2 className="text-center text-3xl font-semibold mb-7">"One Person" Table</h2>
            {!userRows.length ? <Spinner /> 
                       :  <DataGrid
                            rows={userRows.filter(row => row.status === 'Confirmed')} 
                            columns={columns}
                            checkboxSelection
                            />}
                    <Modal open={open} setOpen={setOpen} document={'One Person'} id={findDoc} />
        </div>
    )
}

export default OnePersonConfirmed
