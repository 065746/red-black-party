import sidebar__routes from '../assets/sidebar__routes.js'
import { useStateValue } from "../context/StateProider.js"
import SidebarItem from "./SidebarItem"

function Sidebar({ location }) {
    const [{hide}, dispatch] = useStateValue()
    return (
        <div className={`min-w-[300px] bg-gray-700 h-screen fixed top-0 left-0 shadow-md transition duration-200 transform ${hide && 'translate-x-[-100%]'}`}>
            <h2 className="text-center text-2xl text-gray-100 my-7">Red&Black Party</h2>
            <div className="">
                {sidebar__routes.map((item, index) => (
                    <SidebarItem key={index} item={item} location={location} />
                ))}
            </div>
        </div>
    )
}

export default Sidebar
