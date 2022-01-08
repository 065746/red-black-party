import { Navigate, Outlet } from "react-router-dom"
import { useStateValue } from "../context/StateProider"

function PrivateRoute({ loading }) {
  const [{ user }, dispatch] = useStateValue()
  console.log('loading => ', loading)
  console.log('user => ', user)
    return user && !loading ?  <Outlet /> : <Navigate to='/admin-login' />
    
}

export default PrivateRoute
