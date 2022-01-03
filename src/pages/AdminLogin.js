import { signInWithEmailAndPassword } from "@firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import { auth } from "../firebase";

function AdminLogin() {
    const navigate = useNavigate()
    const handleSubmit = (data) => {
        delete data.phoneNumber
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((res) => console.log(res))
            .then(() => navigate('/dashboard'))
            .catch((err) => console.log(err))
        }
    return (
        <div style={{
            background: 'rgb(2,0,36)',
            background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(84,9,121,1) 56%, rgba(0,212,255,1) 100%)',
        }}>
        <div  className='h-screen flex justify-center flex-col items-center'>
            <h2 className="text-center text-4xl text-white font-semibold">red&black party</h2>
                <Form onSubmit={ (data) => handleSubmit(data)} adminForm />
            </div>
        </div>
    )
}

export default AdminLogin