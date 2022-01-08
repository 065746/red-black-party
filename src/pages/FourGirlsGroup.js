import { doc, getDoc, updateDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { db } from "../firebase"

function FourGirlsGroup() {
    const [group, setGroup] = useState([])
    const [confirm, setConfirm] = useState(false)
    const { id } = useParams()
    const { state } = useLocation()
    useEffect(() => {
        const findGroup = state.userRows.find(row => row.id === id)
        setGroup([findGroup])
    } , [id])
    const confirmUser = async () => {
        await updateDoc(doc(db, '4 Girls', id), { 
           status: 'Confirmed',
        }).then(() => setConfirm(true))
   }
   useEffect(() => {
       const getConfirm = async () => {
           const docRef =  doc(db, '4 Girls', id);
           const docSnap = await getDoc(docRef)
           if(docSnap.data().status === 'Confirmed'){
               setConfirm(true);
           }
           else {
               setConfirm(false);
           }
       }
       getConfirm()
   }, [id])
    return (
        <div className='w-[calc(100%-300px)] px-10 py-7 ml-auto'>
            {group?.map((row, index) => (
                <div key={index} className="space-y-8">
                    <div className="">
                        <h3 className="text-xl font-semibold">First Girls</h3>
                        <div className="px-2">
                            <p>Full Name : <strong>{row.perso1.fullName}</strong> </p>
                            <p>Email : <strong>{row.perso1.email}</strong> </p>
                            <p>Phone Number : <strong>{row.perso1.phoneNumber}</strong> </p>
                        </div>
                    </div>
                    <div className="">
                        <h3 className="text-xl font-semibold">Second Girls</h3>
                        <div className="px-2">
                            <p>Full Name : <strong>{row.perso2.fullName}</strong> </p>
                            <p>Email : <strong>{row.perso2.email}</strong> </p>
                            <p>Phone Number : <strong>{row.perso2.phoneNumber}</strong> </p>
                        </div>
                    </div>
                    <div className="">
                        <h3 className="text-xl font-semibold">Third Girls</h3>
                        <div className="px-2">
                            <p>Full Name : <strong>{row.perso3.fullName}</strong> </p>
                            <p>Email : <strong>{row.perso3.email}</strong> </p>
                            <p>Phone Number : <strong>{row.perso3.phoneNumber}</strong> </p>
                        </div>
                    </div>
                    <div className="">
                        <h3 className="text-xl font-semibold">Fourth Girls</h3>
                        <div className="px-2">
                            <p>Full Name : <strong>{row.perso4.fullName}</strong> </p>
                            <p>Email : <strong>{row.perso4.email}</strong> </p>
                            <p>Phone Number : <strong>{row.perso4.phoneNumber}</strong> </p>
                        </div>
                    </div>
                    <div className="">
                        <p>Status: <strong className={`${row.status === 'Not Confirmed' ? 'text-red-800 underline' : 'text-green-700 underline'}`} >{row.status}</strong></p>
                        <p>Timestamp: <strong>{row.timestamp}</strong></p>
                    </div>
                    <div className="">
                        {!confirm ? <button onClick={confirmUser} className="text-white px-5 py-2 bg-green-800 hover:bg-green-700 active:bg-green-900">Confirm</button>
                            : <button className="text-white px-5 py-2 bg-blue-800 hover:bg-blue-700 active:bg-blue-900">Send Qr Code</button>}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default FourGirlsGroup
