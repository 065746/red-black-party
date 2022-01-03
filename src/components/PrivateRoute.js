import { Navigate, Outlet } from "react-router-dom"
import { useStateValue } from "../context/StateProider"

function PrivateRoute() {
    const [{user}, dispatch] = useStateValue()
    return user ?  <Outlet /> : <Navigate to='/admin-login' />
    
}

export default PrivateRoute
