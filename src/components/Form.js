import { useEffect, useState } from 'react'
import PhoneInput from 'react-phone-number-input'
import { Link } from 'react-router-dom'
import { useStateValue } from '../context/StateProider'

const prepareForm = (formArr) => 
    formArr?.reduce((p, v) => ({...p, [v.name]: ''}), {})


function Form({ title, formArr, submitBtn, onSubmit, successMsg, redirect, ticketType, params ,adminForm, formArr2, formArr3, formArr4}) {
    const [form, setForm] = useState(prepareForm(formArr))
    const [form2, setForm2] = useState(prepareForm(formArr2))
    const [form3, setForm3] = useState(prepareForm(formArr3))
    const [form4, setForm4] = useState(prepareForm(formArr4))

    const [phoneNumber1, setPhoneNumber1] = useState('')
    const [phoneNumber2, setPhoneNumber2] = useState('')
    const [phoneNumber3, setPhoneNumber3] = useState('')
    const [phoneNumber4, setPhoneNumber4] = useState('')

    const [gender, setGender] = useState({})

    const [{ data }, dispatch] = useStateValue()

    const dataSubmitter = () => {
        if(params.get('ticketType') === 'One Person'){
            dispatch({
                type: 'SET_DATA',
                data: {
                    perso1:{
                        ...form,
                        phoneNumber: phoneNumber1,
                        gender: gender,
                    },
                    status: 'Not Confirmed'
                }
            })
            return;
        }
        else if(params.get('ticketType') === 'Couple'){
            dispatch({
                type: 'SET_DATA',
                data: {
                    perso1:{
                        ...form,
                        phoneNumber: phoneNumber1,
                        gender: 'Male'
                    },
                    perso2:{
                        ...form2,
                        phoneNumber: phoneNumber2,
                        gender: 'Female'
                    },
                    status: "Not Confirmed"
                }
            })
            return;
        }

        else if(params.get('ticketType') === '4 Boys'){
            dispatch({
                type: 'SET_DATA',
                data: {
                    perso1:{
                        ...form,
                    phoneNumber: phoneNumber1,
                    },
                    perso2:{
                        ...form2,
                        phoneNumber: phoneNumber2,
                    },
                    perso3:{
                        ...form3,
                        phoneNumber: phoneNumber3,
                    },
                    perso4:{
                        ...form4,
                        phoneNumber: phoneNumber4,
                    },
                    status: "Not Confirmed"
                }
            })
            return;
        }

        else if(params.get('ticketType') === '4 Girls'){
            dispatch({
                type: 'SET_DATA',
                data: {
                    perso1:{
                        ...form,
                    phoneNumber: phoneNumber1,
                    },
                    perso2:{
                        ...form2,
                        phoneNumber: phoneNumber2,
                    },
                    perso3:{
                        ...form3,
                        phoneNumber: phoneNumber3,
                    },
                    perso4:{
                        ...form4,
                        phoneNumber: phoneNumber4,
                    },
                    status: "Not Confirmed"
                }
            })
            return;
        }  
    }

    useEffect(() => {
        dataSubmitter()
    }, [form, form2, form3, form4, phoneNumber1, phoneNumber2, phoneNumber3, phoneNumber4, gender])

    const formSetter = () =>{
        setForm(prepareForm(formArr))
        setForm2(prepareForm(formArr2))
        setForm3(prepareForm(formArr3))
        setForm4(prepareForm(formArr4))

        setPhoneNumber1('')
        setPhoneNumber2('')
        setPhoneNumber3('')
        setPhoneNumber4('')
    }

    const onSubmitHandler = () => 
        onSubmit(data, formSetter())

    const hasRedirect = !!redirect
    
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            onSubmitHandler()
        }} className={`w-full border-4 rounded-2xl border-gray-800 p-5 space-y-2 bg-fuchsia-900 shadow-md ${adminForm && 'border-0 !bg-transparent shadow-none max-w-xl mx-auto'} `} autoComplete="off">
            <h2 className="text-2xl font-medium text-center text-gray-200">{title}</h2>
            <p className='text-center underline text-white'>{ticketType}</p>
            {formArr.map(({label, name, type}, index) => (
                <>
                    <div key={index} className="last-of-type:mb-2">
                        <label className="font-semibold text-sm block m-2 text-white" htmlFor={name}>{label}</label>
                        {type === 'number' ? (
                            <PhoneInput
                            placeholder="Enter phone number"
                            defaultCountry="MA"
                            className={'border border-gray-600 focus:ring-2 ring-purple-600 transition-all duration-200 w-full py-2 px-4 outline-none bg-white'}
                            value={phoneNumber1}
                            onChange={setPhoneNumber1}
                        />
                        ) : (
                            <input 
                                name={name} 
                                type={type} 
                                className='border border-gray-600 focus:ring-2 ring-purple-600 transition-all duration-200 w-full py-2 px-4 outline-none' 
                                placeholder={label} 
                                value={form[name]}
                                onChange={(e) => setForm((p) => ({...p, [e.target.name]: e.target.value}))}
                            />
                        )}
                    </div>
                </>
                ))}
            {params.get('ticketType') === 'One Person' && (
                <div className="space-x-4 text-white">
                    <label className='w-full flex-grow flex flex-col text-gray-300 '>Gender :</label> <br></br>
                    <label for="Man" className="w-full space-x-4"><input id="Man" type="radio" name="type" onChange={(e) => setGender({[e.target.name] : e.target.value})} value={'Male'} /> Man</label>
                    <label for="Woman" className="w-full space-x-4"><input id="Woman" type="radio" name="type" onChange={(e) => setGender({[e.target.name] : e.target.value})} value={'Female'}/> Woman</label>
                </div>
            )}
            {formArr2 && (
                <>
                    <br />
                    {formArr2.map(({label, name, type}, index) => (
                        <div key={index} className="last-of-type:mb-2">
                            <label className="font-semibold text-sm block m-2 text-white" htmlFor={name}>{label}</label>
                            {type === 'number' ? (
                            <PhoneInput
                                placeholder="Enter phone number"
                                defaultCountry="MA"
                                className={'border border-gray-600 focus:ring-2 ring-purple-600 transition-all duration-200 w-full py-2 px-4 outline-none bg-white'}
                                value={phoneNumber2}
                                onChange={setPhoneNumber2}
                            />
                    ) : (
                        <input 
                            name={name} 
                            type={type} 
                            className='border border-gray-600 focus:ring-2 ring-purple-600 transition-all duration-200 w-full py-2 px-4 outline-none' 
                            placeholder={label} 
                            value={form2[name]}
                            onChange={(e) => setForm2((p) => ({...p, [e.target.name]: e.target.value}))}
                        />
                    )}
                        </div>
                    ))}
                </>
            )}
            {formArr3 && (
                <>
                    <br />
                    {formArr3.map(({label, name, type}, index) => (
                        <div key={index} className="last-of-type:mb-2">
                            <label className="font-semibold text-sm block m-2 text-white" htmlFor={name}>{label}</label>
                            {type === 'number' ? (
                            <PhoneInput
                                placeholder="Enter phone number"
                                defaultCountry="MA"
                                className={'border border-gray-600 focus:ring-2 ring-purple-600 transition-all duration-200 w-full py-2 px-4 bg-white outline-none'}
                                value={phoneNumber3}
                                onChange={setPhoneNumber3}
                            />
                    ) : (
                        <input 
                            name={name} 
                            type={type} 
                            className='border border-gray-600 focus:ring-2 ring-purple-600 transition-all duration-200 w-full py-2 px-4 outline-none' 
                            placeholder={label} 
                            value={form3[name]}
                            onChange={(e) => setForm3((p) => ({...p, [e.target.name]: e.target.value}))}
                        />
                    )}
                        </div>
                    ))}
                </>
            )}
            {formArr4 && (
                <>
                    <br />
                    {formArr4.map(({label, name, type}, index) => (
                        <div key={index} className="last-of-type:mb-2">
                            <label className="font-semibold text-sm block m-2 text-white" htmlFor={name}>{label}</label>
                            {type === 'number' ? (
                            <PhoneInput
                                placeholder="Enter phone number"
                                defaultCountry="MA"
                                className={'border border-gray-600 focus:ring-2 ring-purple-600 transition-all duration-200 w-full py-2 px-4 bg-white outline-none'}
                                value={phoneNumber4}
                                onChange={setPhoneNumber4}
                            />
                    ) : (
                            <input 
                                name={name} 
                                type={type} 
                                className='border border-gray-600 focus:ring-2 ring-purple-600 transition-all duration-200 w-full py-2 px-4 outline-none' 
                                placeholder={label} 
                                value={form4[name]}
                                onChange={(e) => setForm4((p) => ({...p, [e.target.name]: e.target.value}))}
                            />
                    )}
                        </div>
                    ))}
                </>
            )}
            {successMsg && (
                <p className="text-center text-white font-medium bg-green-600 py-3 px-5 mt-5">{successMsg}</p>
            )}
            <div className="flex justify-center pt-3">
                <button className='bg-transparent border-gray-200 border-2 uppercase hover:bg-gray-100 hover:text-gray-900 font-medium active:bg-purple-800 text-center px-6 py-2 text-white' type="submit">{submitBtn}</button>
            </div>
            {hasRedirect && (
                <div className="space-x-2 text-center">
                    <span>{redirect.label}</span>
                    <Link className="text-green-700 underline" to={redirect.link.to}>{redirect.link.label}</Link>
                </div>
            )}
        </form>
    )
}

Form.defaultProps = {
    title: 'Sign in',
    formArr:[
        {label: 'Email', name: 'email', type: 'text',},
        {label: 'Password', name: 'password', type: 'password',}
    ],
    submitBtn: 'Sign in',
    onSubmit: (data) => console.log(data),
}

export default Form
