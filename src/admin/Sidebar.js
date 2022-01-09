import { Link } from "react-router-dom"
import sidebar__routes from '../assets/sidebar__routes.js'
import sub_sidebar__routes from "../assets/sub_sidebar__routes.js"
import { useStateValue } from "../context/StateProider.js"
import SidebarItem from "./SidebarItem"
import SubItem from "./SubItem.js"

function Sidebar({ location }) {
    const activeItem = sidebar__routes.findIndex(item => item.route === location.pathname)
    const [{hide}, dispatch] = useStateValue()
    return (
        <div className={`min-w-[300px] h-screen fixed top-0 left-0 bg-white shadow-md transition duration-200 transform ${hide && 'translate-x-[-100%]'}`}>
            <div className="">
                <div className="flex items-center justify-center h-32">
                    <Link className="text-3xl" to='/'>Red&Black Party</Link>
                </div>
                {sidebar__routes.map(({display_name, icon, route},index) => (
                    <Link to={route} key={index} >
                        <SidebarItem 
                            icon={icon}
                            title={display_name}
                            active={index === activeItem}
                        />
                    </Link>
                ))}
                <div className="space-y-4">
                    {sub_sidebar__routes.map(({display_name, route}, index) => (
                        <Link to={route} key={index}>
                            <SubItem display_name={display_name} route={route}  />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Sidebar
