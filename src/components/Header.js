import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Header({ orderHeader }) {
    const [header, setHeader] = useState(false)
    const [toggleMenu, setToggleMenu] = useState(false)
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
           <div className='logo' >
                <h1>Dev Maji</h1>
            </div>
            <ul className={toggleMenu ? 'toggle' : ''} >
                <li>
                    <Link to='/' >Home</Link>
                </li>
                <li>
                    <Link to='/about' >About</Link>
                </li>
                <li>
                    <Link to='/event' >Event</Link>
                </li>
                <li>
                    <Link to='/tickets' >Tickets</Link>
                </li>
                <li>
                    <Link to='/contact' >contact</Link>
                </li>
                <li className='close' onClick={() => setToggleMenu(e => !e)} >X</li>
            </ul>
            <div className='menu' onClick={() => setToggleMenu(e => !e)}>Menu</div>
        </header>
    )
}

export default Header
