import { Outlet } from "react-router-dom"
import { useStateValue } from "../context/StateProider"
import Login from "./Login"

function PrivateRoute() {
    const [{user}, dispatch] = useStateValue()
    return user ?  <Outlet /> : <Login />
    
}

export default PrivateRoute
