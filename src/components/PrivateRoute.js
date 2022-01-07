import { Navigate, Outlet } from "react-router-dom"
import { useStateValue } from "../context/StateProider"

function PrivateRoute({ loading }) {
  const [{ user }, dispatch] = useStateValue()
  console.log(loading)
    return user && !loading ?  <Outlet /> : <Navigate to='/admin-login' />
    
}

export default PrivateRoute
