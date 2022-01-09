import { MenuIcon, SearchIcon } from "@heroicons/react/outline"
import { signOut } from "firebase/auth"
import { useLocation } from "react-router-dom"
import user__menu from "../assets/user__menu"
import { useStateValue } from "../context/StateProider"
import { auth } from "../firebase"
import Dropdown from "./Dropdown"

const userToggler = (user) => {
    return (
        <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full overflow-hidden">
                <img className="w-full" src={"https://bit.ly/3GTFSZ7"} alt="" />
            </div>
            <div className="font-medium">
                {user.email}
            </div>
        </div>
    )
}

const renderUser = (item, index,) => {
    return (
        <div className='cursor-pointer' key={index}>
            <div className="flex space-x-2 p-5 text-gray-600 hover:bg-gray-200">
                {item.icon}
                <span className="">{item.content}</span>
            </div>
        </div>
    )
}

function TopNav() {
    const [{user, hide, search}, dispatch] = useStateValue()
    const location = useLocation()

    const handleSidebar = () => {
        dispatch({
            type: 'SET_HIDE',
            hide: !hide,
        })
    }
    return (
        <div className={`ml-[300px] p-8 flex items-center justify-between h-[110px] transition-all duration-200 ${hide && '!ml-0'}`}>
            {location.pathname !== "/admin/dashboard" ? (
                <div className="relative h-12 bg-white flex items-center shadow-md rounded-md overflow-hidden p-2">
                    <input type="text" value={search} onChange={(e) => dispatch({type: 'SET_SEARCH', search: e.target.value })} className="h-full w-full py-10 pr-16 pl-5 outline-none text-base rounded-md bg-white text-gray-600" placeholder='Search by full name' />
                    <SearchIcon className="h-6 absolute right-5" />
                </div>
            ) : (
                <h1 className="text-4xl font-semibold" >Hello</h1>
            )}
            <div className="flex items-center">
                <div className="ml-8">
                    <Dropdown
                        customToggle={() => userToggler(user)}
                        contentData={user__menu}
                        renderItems={(item, index) => renderUser(item, index)}
                        logOut={async () => await signOut(auth).then(() => console.log('admin logged out'))}
                    />
                </div>
                <div onClick={handleSidebar} className="ml-8">
                    <Dropdown
                        Icon={MenuIcon} 
                    />
                </div>
            </div>
        </div>
    )
}

export default TopNav
