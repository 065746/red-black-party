import { useState } from "react"
import { useLocation } from "react-router-dom"
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import Form from "../components/Form"
import Header from "../components/Header"
import 'react-phone-number-input/style.css'

function Order() {
    const { search } = useLocation()
    const [success, setSuccess] = useState(null)
    const params = new URLSearchParams(search)
    const onSubmit = async (data) => {
        console.log(data)
        const { perso1, perso2, } = data
        
        if(params.get('ticketType') === 'One Person'){
            if (!perso1.fullName || !perso1.phoneNumber || !perso1.email ) return;
        }

        if(params.get('ticketType') === 'Couple'){
            if (!perso1.fullName || !perso1.phoneNumber || !perso1.email || !perso2.fullName || !perso2.phoneNumber || !perso2.email ) return;
        }

        const sendDataToDb = await addDoc(collection(db ,`${params.get('ticketType')}`), {
            ...data, timestamp: serverTimestamp()
        }).then((res) => {
            console.log(res)
            setSuccess('Thank you for Submitting, We call you')
        }).then(() => {
            setTimeout(() => {
                setSuccess(null)
            }, 5000)
        }).catch(error => console.log(error))
        
        return sendDataToDb
    }
    return (
        <div>
            <Header orderHeader />
            <div style={{
                background: 'rgb(2,0,36)',
                background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(116,9,121,1) 44%, rgba(89,56,152,1) 100%, rgba(0,212,255,1) 100%)',
            }} className="min-h-[92vh] py-28 flex justify-center items-center flex-col relative overflow-y-hidden px-6 ">
                <h3 className="absolute top-[105px] md:top-20 text-3xl text-white">red&black party</h3>
                <div className="max-w-xl w-full mt-14">
                    {params.get('ticketType') === 'One Person' && (
                        <Form 
                            title="Enter Your details"
                            ticketType={`Ticket for ${params.get('ticketType')}`}
                            formArr={[
                                {label: 'Full name', name: 'fullName', type: 'text',},
                                {label: 'Email', name: 'email', type: 'email',},
                                {label: 'Phone Number', name: 'phoneNumber', type: 'number',},
                            ]}
                            params={params}
                            submitBtn='Submit'
                            onSubmit={(data) => onSubmit(data)}
                            successMsg={success}
                            redirect={null}
                        />
                    )}
                    {params.get('ticketType') === 'Couple' && (
                        <Form 
                            title="Enter Your details"
                            ticketType={`Ticket for ${params.get('ticketType')}`}
                            clientType='Men'
                            formArr={[
                                {label: 'Full name', name: 'fullName', type: 'text',},
                                {label: 'Email', name: 'email', type: 'email',},
                                {label: 'Phone Number', name: 'phoneNumber', type: 'number',},
                            ]}
                            formArr2={[
                                {label: 'Full name', name: 'fullName', type: 'text',},
                                {label: 'Email', name: 'email', type: 'email',},
                                {label: 'Phone Number', name: 'phoneNumber', type: 'number',},
                            ]}
                            params={params}
                            submitBtn='Submit'
                            onSubmit={(data) => onSubmit(data)}
                            successMsg={success}
                            redirect={null}
                        />
                    )}
                    {params.get('ticketType') === '4 Boys' && (
                        <Form 
                            title="Enter Your details"
                            ticketType={`Ticket for ${params.get('ticketType')}`}
                            formArr={[
                                {label: 'Full name', name: 'fullName', type: 'text',},
                                {label: 'Email', name: 'email', type: 'email',},
                                {label: 'Phone Number', name: 'phoneNumber', type: 'number',},
                            ]}
                            formArr2={[
                                {label: 'Full name', name: 'fullName', type: 'text',},
                                {label: 'Email', name: 'email', type: 'email',},
                                {label: 'Phone Number', name: 'phoneNumber', type: 'number',},
                            ]}
                            formArr3={[
                                {label: 'Full name', name: 'fullName', type: 'text',},
                                {label: 'Email', name: 'email', type: 'email',},
                                {label: 'Phone Number', name: 'phoneNumber', type: 'number',},
                            ]}
                            formArr4={[
                                {label: 'Full name', name: 'fullName', type: 'text',},
                                {label: 'Email', name: 'email', type: 'email',},
                                {label: 'Phone Number', name: 'phoneNumber', type: 'number',},
                            ]}
                            params={params}
                            submitBtn='Submit'
                            onSubmit={(data) => onSubmit(data)}
                            successMsg={success}
                            redirect={null}
                        />
                    )}
                    {params.get('ticketType') === '4 Girls'&& (
                        <Form 
                            title="Enter Your details"
                            ticketType={`Ticket for ${params.get('ticketType')}`}
                            formArr={[
                                {label: 'Full name', name: 'fullName', type: 'text',},
                                {label: 'Email', name: 'email', type: 'email',},
                                {label: 'Phone Number', name: 'phoneNumber', type: 'number',},
                            ]}
                            formArr2={[
                                {label: 'Full name', name: 'fullName', type: 'text',},
                                {label: 'Email', name: 'email', type: 'email',},
                                {label: 'Phone Number', name: 'phoneNumber', type: 'number',},
                            ]}
                            formArr3={[
                                {label: 'Full name', name: 'fullName', type: 'text',},
                                {label: 'Email', name: 'email', type: 'email',},
                                {label: 'Phone Number', name: 'phoneNumber', type: 'number',},
                            ]}
                            formArr4={[
                                {label: 'Full name', name: 'fullName', type: 'text',},
                                {label: 'Email', name: 'email', type: 'email',},
                                {label: 'Phone Number', name: 'phoneNumber', type: 'number',},
                            ]}
                            params={params}
                            submitBtn='Submit'
                            onSubmit={(data) => onSubmit(data)}
                            successMsg={success}
                            redirect={null}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Order
