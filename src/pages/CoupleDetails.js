import { useParams, useLocation } from "react-router-dom"
import { useEffect, useState } from 'react'
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"

function OnePersonDetails() {
    const [user, setUser] = useState([])
    const { id } = useParams()
    const { state } = useLocation()
    const [confirm, setConfirm] = useState(false)
    useEffect(() => {
        const findUser = state.find(user => user.id === id)
        setUser([findUser])
    }, [id, state, confirm])
    const confirmUser = async () => {
         await updateDoc(doc(db, 'Couple', id), { 
            status: 'Confirmed',
         }).then(() => setConfirm(true))
    }
    useEffect(() => {
        const getConfirm = async () => {
            const docRef =  doc(db, 'Couple', id);
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
            <div className="">
                {user.map((item, index) => (
                <div  key={index} className="mb-6">
                    <h3 className="text-xl font-semibold capitalize">{`${item.fullName}'s details`}</h3>
                    <div className="px-2">
                        <p>Full Name : <strong>{item.fullName}</strong> </p>
                        <p>Email : <strong>{item.email}</strong> </p>
                        <p>Phone Number : <strong>{item.phoneNumber}</strong> </p>
                        <p>gender : <strong className='capitalize'>{item.gender}</strong> </p>
                        <p>Status : <strong className='capitalize'>{item.status}</strong> </p>
                        <p>Submitted at : <strong className='capitalize'>{item.timestamp}</strong> </p>
                    </div>
                    <br />
                    <h3 className="text-xl font-semibold capitalize">{`${item.fullName2}'s details`}</h3>
                    <div className="px-2">
                        <p>Full Name : <strong>{item.fullName2}</strong> </p>
                        <p>Email : <strong>{item.email2}</strong> </p>
                        <p>Phone Number : <strong>{item.phoneNumber2}</strong> </p>
                        <p>gender : <strong className='capitalize'>{item.gender2}</strong> </p>
                        <p>Status : <strong className='capitalize'>{item.status}</strong> </p>
                        <p>Submitted at : <strong className='capitalize'>{item.timestamp}</strong> </p>
                    </div>
                </div>
                ))}
            </div>
            <div className="">
                {!confirm ? <button onClick={confirmUser} className="text-white px-5 py-2 bg-green-800 hover:bg-green-700 active:bg-green-900">Confirm</button>
                         : <button className="text-white px-5 py-2 bg-blue-800 hover:bg-blue-700 active:bg-blue-900">Send Qr Code</button>}
            </div>
        </div>
    )
}

export default OnePersonDetails
