import { useEffect, useState } from "react"
import { DataGrid } from "@mui/x-data-grid"
import { collection, onSnapshot } from "firebase/firestore"
import moment from "moment"
import { Link, useLocation, useNavigate } from "react-router-dom"
import Spinner from "../components/Spinner"
import { db } from "../firebase"
import { useStateValue } from "../context/StateProider"
import Modal from "../admin/Modal"

function CoupleConfirmed() {
    const [loading, setLoading] = useState(true)
    const [userRows, setUserRows] = useState([])
    const [open, setOpen] = useState(false)
    const [findDoc, setFindDoc] = useState('')

    const [{hide, search}, dispatch] = useStateValue()

    const navigate = useNavigate()
    const { state } = useLocation()
    useEffect(() => {
        if(search){
            const newUsers = userRows.filter(user => {
                if (user.fullName.toLowerCase().includes(search.toLowerCase()) || user.fullName2.toLowerCase().includes(search.toLowerCase())) {
                 return user
               }
             })
             setUserRows(newUsers)
        } else {
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
        }
    }, [loading, state, search])
    
    const columns = [
        { field: 'id', headerName: 'ID', width: 180 },
        { field: 'fullName', headerName: "First Person's Full Name", width: 260 },
        { field: 'email', headerName: "First Person's Email", width: 260 },
        { field: 'phoneNumber', headerName: "First Person's Phone Number", width: 260, renderCell: (params) => (
            <div className='flex items-center space-x-2'>
                <p>{params.row.phoneNumber}</p>
                <a className="text-sm bg-green-800 text-white px-4 py-2 rounded-full" href={`https://wa.me/${params.row.phoneNumber}`} target={'_blank'} >Watp</a>
            </div>
        ) },
        { field: 'fullName2', headerName: "Second Person's Full Name", width: 260 },
        { field: 'email2', headerName: "Second Person's Email", width: 260 },
        { field: 'phoneNumber2', headerName: "Second Person's Phone Number", width: 260, renderCell: (params) => (
            <div className='flex items-center space-x-2'>
                <p>{params.row.phoneNumber}</p>
                <a className="text-sm bg-green-800 text-white px-4 py-2 rounded-full" href={`https://wa.me/${params.row.phoneNumber}`} target={'_blank'} >Watp</a>
            </div>
        ) },
        { field: 'status', headerName: "Couple status", width: 200 },
        { field: 'timestamp', headerName: "Timestamp", width: 260 },
        // { field: 'actions', headerName: "Actions", width: 260, renderCell: (params) => (
        //   <div className="space-x-2">
        //         <button onClick={() => {
        //             setOpen(true)
        //             setFindDoc(params.row.id)
        //         }} className="px-3 py-2 bg-red-700 rounded-full text-white">Delete</button>
        //         <button onClick={() => navigate(`/admin/customers/couple/${params.row.id}`, {
        //             state: userRows
        //         })} className="px-3 py-2 bg-green-700 rounded-full text-white">View</button>
        //     </div>
        // ) },

      ];
    return (
        <div className={`h-screen w-[calc(100%-300px)] transition-all duration-200 ml-auto ${hide && '!w-full'} px-10 pb-8`}>
            <h2 className="text-center text-3xl font-semibold mb-7">"Couple" Table</h2>
            {
                !userRows.length ? <Spinner /> 
                        :  <DataGrid
                                rows={userRows.filter(row => row.status === 'Confirmed')} 
                                columns={columns}
                                checkboxSelection
                            />
            }
            <Modal open={open} setOpen={setOpen} document={'Couple'} id={findDoc} />
        </div>
    )
}

export default CoupleConfirmed