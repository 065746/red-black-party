import { useState } from 'react'
import PhoneInput from 'react-phone-number-input'
import { Link } from 'react-router-dom'

const prepareForm = (formArr) => 
    formArr.reduce((p, v) => ({...p, [v.name]: ''}), {})


function Form({ title, formArr, submitBtn, onSubmit, successMsg, redirect, ticketType, formArr2, formArr3, formArr4}) {
    const [form, setForm] = useState(prepareForm(formArr))
    const [phone, setPhone] = useState(null)
 
    const onChange = (e) => 
        setForm((p) => ({...p, [e.target.name]: e.target.value}))

    const onSubmitHandler = () => 
        onSubmit({...form, phoneNumber:phone}, setForm(prepareForm(formArr)))

    const hasRedirect = !!redirect
    console.log({...form, phoneNumber:phone})
    console.log(phone)
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            onSubmitHandler()
        }} className="w-full border-4 rounded-2xl border-gray-800 p-5 space-y-2 bg-fuchsia-900 shadow-md" autoComplete="off">
            <h2 className="text-2xl font-medium text-center text-gray-200">{title}</h2>
            <p className='text-center underline text-white'>{ticketType}</p>
            {formArr.map(({label, name, type}, index) => (
                <div key={index} className="last-of-type:mb-2">
                    <label className="font-semibold text-sm block m-2 text-white" htmlFor={name}>{label}</label>
                    {type === 'number' ? (
                        <PhoneInput
                        placeholder="Enter phone number"
                        defaultCountry="MA"
                        className={'border border-gray-600 focus:ring-2 ring-purple-600 transition-all duration-200 w-full py-2 px-4 outline-none bg-white outline-none'}
                        value={phone}
                        onChange={setPhone}
                    />
                    ) : (
                        <input 
                            name={name} 
                            type={type} 
                            className='border border-gray-600 focus:ring-2 ring-purple-600 transition-all duration-200 w-full py-2 px-4 outline-none' 
                            placeholder={label} 
                            value={form[name]}
                            onChange={onChange}
                        />
                    )}
                </div>
            ))}
            <br />
            {formArr2 && (
                <>
                    {formArr2.map(({label, name, type}, index) => (
                        <div key={index} className="last-of-type:mb-2">
                            <label className="font-semibold text-sm block m-2 text-white" htmlFor={name}>{label}</label>
                            <input 
                                name={name} 
                                type={type} 
                                className='border border-gray-600 focus:ring-2 ring-purple-600 transition-all duration-200 w-full py-2 px-4 outline-none' 
                                placeholder={label} 
                                value={form[name]}
                                onChange={onChange}
                            />
                        </div>
                    ))}
                </>
            )}
            <br />
            {formArr3 && (
                <>
                    {formArr3.map(({label, name, type}, index) => (
                        <div key={index} className="last-of-type:mb-2">
                            <label className="font-semibold text-sm block m-2 text-white" htmlFor={name}>{label}</label>
                            <input 
                                name={name} 
                                type={type} 
                                className='border border-gray-600 focus:ring-2 ring-purple-600 transition-all duration-200 w-full py-2 px-4 outline-none' 
                                placeholder={label} 
                                value={form[name]}
                                onChange={onChange}
                            />
                        </div>
                    ))}
                </>
            )}
            <br />
            {formArr4 && (
                <>
                    {formArr4.map(({label, name, type}, index) => (
                        <div key={index} className="last-of-type:mb-2">
                            <label className="font-semibold text-sm block m-2 text-white" htmlFor={name}>{label}</label>
                            <input 
                                name={name} 
                                type={type} 
                                className='border border-gray-600 focus:ring-2 ring-purple-600 transition-all duration-200 w-full py-2 px-4 outline-none' 
                                placeholder={label} 
                                value={form[name]}
                                onChange={onChange}
                            />
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
    redirect: {
        label: "Don't have an account ?",
        link:{
            label: "Register Now",
            to: '/register'
        }
    }
}

export default Form
