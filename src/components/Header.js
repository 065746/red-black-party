import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MenuIcon } from '@heroicons/react/solid'

function Header() {
    const [header, setHeader] = useState(false)
    const [navLinks, setNavLinks] = useState(false)
    const [toggleMenu, setToggleMenu] = useState(false)
    useEffect(() => {
        window.addEventListener('scroll', () => {
            if(window.scrollY > 0) {
                setHeader(true)
            }
            else {
                setHeader(false)
            }
        })
    }, [])
    return (
        <header className={`fixed top-0 z-10 w-full flex px-6 py-10 items-center justify-around 
            bg-gray-700 bg-opacity-50 ${header && '!py-6 bg-opacity-100 bg-gray-900'} transition-all duration-500 ease-out`}>
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
                    <Link to='/Event' >Event</Link>
                </li>
                <li>
                    <Link to='/Tickets' >Tickets</Link>
                </li>
                <li>
                    <Link to='/Contact' >contact</Link>
                </li>
                <li className='close' onClick={() => setToggleMenu(e => !e)} >X</li>
            </ul>
            <div className='menu' onClick={() => setToggleMenu(e => !e)}>Menu</div>
        </header>
    )
}

export default Header
