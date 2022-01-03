import React , { useEffect } from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import { onAuthStateChanged } from "firebase/auth";
import { useStateValue } from "./context/StateProider";
import { auth } from "./firebase";
import Order from "./pages/Order";


function App() {
const [{}, dispatch] = useStateValue()
useEffect(() => {
  const unsabscribe = onAuthStateChanged(auth, (user) => {
    dispatch({
      type: 'SET_USER',
      user: user
    })      
  } )

  return () => unsabscribe()
}, [dispatch])
   return (
     <div className="">
       <Routes>
         <Route path='/' element={<Home />} />
         <Route path='/order' element={<Order />} />
         <Route path='/admin-login' element={<Login />} />
         <Route element={<PrivateRoute />} >
           {/*  */}
         </Route>
       </Routes>
     </div>
  );
}

export default App;
