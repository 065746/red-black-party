import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-scroll'

function Header({ orderHeader }) {
    const [header, setHeader] = useState(false)
    const [toggleMenu, setToggleMenu] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        const handleHeader = () => {
            if(window.scrollY > 0) {
                setHeader(true)
            }
            else {
                setHeader(false)
            }
        }
        window.addEventListener('scroll', () => handleHeader())
        return () =>  window.removeEventListener('scroll', () => handleHeader())
    }, [])
    return (
        <header 
            className={`fixed top-0 z-10 w-full flex px-6 py-10 items-center justify-around 
            bg-gray-700 bg-opacity-50 ${header && '!py-6 bg-opacity-100 bg-gray-900 shadow-md'} 
            ${orderHeader && '!py-6 bg-opacity-100 bg-gray-900 sticky shadow-md'} transition-all duration-500 ease-out`}
        >
           <div onClick={() => navigate('/')} className='logo cursor-pointer' >
                <img className='h-12 object-contain' src="/logo2.png" alt="" />
                {/* <h1 className='text-2xl font-medium'>Logo</h1> */}
            </div>
            <ul className={toggleMenu ? 'toggle' : ''} >
                <li  className='cursor-pointer'>
                    <Link to='home'smooth={true} duration={1000} >Home</Link>
                </li>
                <li className='cursor-pointer'>
                    <Link to='event' smooth={true} duration={1000}>Event</Link>
                </li>
                <li className='cursor-pointer'>
                    <Link to='about' smooth={true} duration={1000} >About</Link>
                </li>
                <li className='cursor-pointer'>
                    <Link to='tickets' smooth={true} duration={1000}>Tickets</Link>
                </li>
                <li className='cursor-pointer'>
                    <Link to='contact' smooth={true} duration={1000}>contact</Link>
                </li>
                <li className='close cursor-pointer' onClick={() => setToggleMenu(e => !e)} >X</li>
            </ul>
            <div className='menu' onClick={() => setToggleMenu(e => !e)}>Menu</div>
        </header>
    )
}

export default Header
