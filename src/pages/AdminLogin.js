import { useState } from "react";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

function AdminLogin() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then(() => navigate('/admin/dashboard', {replace: true}))
            .catch((err) => console.log(err))
        }
    return (
        <div
        style={{
            backgroundColor: 'rgb(2,0,36)',
            background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(84,9,121,1) 56%, rgba(0,212,255,1) 100%)',
        }}
        className='h-screen flex justify-center items-center'>
            <form onSubmit={handleSubmit} className='flex flex-col items-center px-8 py-1 w-full space-y-4'>
                <div className= 'py-7 px-7  flex-grow flex flex-col'>
                    <label className='text-gray-300 font-bold'>Email:</label>
                    <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className='flex-grow w-full py-2 px-5 rounded-lg outline-none border' />
                </div>
                <div className='py-2 px-7 caret-gray-50w-full flex-grow flex flex-col'>
                    <label className='text-gray-300 font-bold' >password:</label>
                    <input type="password" placeholder='passowrd' value={password} onChange={(e) => setPassword(e.target.value)} className='flex-grow w-full py-2 px-5 rounded-lg outline-none border' />
                </div> 
                <button className='text-cent px-7 py-2 border-gray-100 border-2 uppercase transition duration-500 text-gray-100 font-bold hover:bg-white hover:text-gray-900' >Submit</button>
            </form>
        </div>
    )
}

export default AdminLogin