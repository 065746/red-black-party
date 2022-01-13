import { useEffect, useState } from "react";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useStateValue } from "./context/StateProider";
import { auth } from "./firebase";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Order from "./pages/Order";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Sidebar from './admin/Sidebar'
import TopNav from "./admin/TopNav";
import OnePersonTable from "./pages/OnePersonTable";
import CoupleTable from "./pages/CoupleTable";
import FourGirlsTable from "./pages/FourGirlsTable";
import FourGirlsGroup from "./pages/FourGirlsGroup";
import FourBoysTable from "./pages/FourBoysTable";
import FourBoysGroup from "./pages/FourBoysGroup";
import OnePersonDetails from "./pages/OnePersonDetails";
import CoupleDetails from "./pages/CoupleDetails";
import QrCodeOnePersonGenrator from "./pages/QrCodeOnePersonGenrator";
import QrCodeCoupleGenerator from "./pages/QrCodeCoupleGenerator";



function App() {
  const [{}, dispatch] = useStateValue()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user){
        dispatch({
          type: 'SET_USER',
          user: user
        })
      } else {
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
      setLoading(false)
  })
}, [])
  const location = useLocation()
   return (
     <div className="">
       <Routes>
         <Route path='/' element={<Home />} />
         <Route path='/order' element={<Order />} />
         <Route path='/admin-login' element={<AdminLogin />} />
         <Route element={<PrivateRoute loading={loading} />} >
           {!loading && (
             <Route path='/admin' element={<><Sidebar location={location} /><TopNav /><Outlet  /></>} >
              <Route index path='dashboard' element={<Dashboard />}/>
              <Route index path='customers' element={<Customers  />} />
              <Route path='customers/one-person' element={<OnePersonTable />} />
              <Route path='customers/one-person/:id' element={<OnePersonDetails />} />
              <Route path='customers/one-person/:id/qrcode' element={<QrCodeOnePersonGenrator />} />
              <Route path='customers/couple' element={<CoupleTable />} />
              <Route path='customers/couple/:id' element={<CoupleDetails />} />
              <Route path='customers/couple/:id/qrcode' element={<QrCodeCoupleGenerator />} />
              <Route path='customers/4-girls' element={<FourGirlsTable />} />
              <Route path='customers/4-girls/:id' element={<FourGirlsGroup />} />
              <Route path='customers/4-boys' element={<FourBoysTable />} />
              <Route path='customers/4-boys/:id' element={<FourBoysGroup />} />
            </Route>
           )}
         </Route>
       </Routes>
     </div>
  );
}

export default App;
