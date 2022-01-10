import { Navigate, Outlet } from "react-router-dom"
import { useStateValue } from "../context/StateProider"

function PrivateRoute({ loading }) {
  const [{ user }, dispatch] = useStateValue()
    return user && !loading ?  <Outlet /> : <Navigate to='/admin-login' />
    
}

export default PrivateRoute
