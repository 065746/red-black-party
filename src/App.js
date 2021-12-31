import Header from "./components/Header";
import Banner from "./components/Banner";
import About from "./components/About";
import Tickets from "./components/Tickets";
import React , { useEffect, useState } from "react";
import Clock from "./components/Clock";
import Contact from "./components/Contact";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import { onAuthStateChanged } from "firebase/auth";
import { useStateValue } from "./context/StateProider";
import { auth } from "./firebase";


function App() {
const [timerDays, setTimerDays]= useState();
const [timerHours, setTimerHours]= useState();
const [timerMinutes, setTimerMinutes]= useState();
const [timerSecondes, setTimerSecondes]= useState();
const [{}, dispatch] = useStateValue()
useEffect(() => {
  const unsabscribe = onAuthStateChanged(auth, (user) => {
    dispatch({
      type: 'SET_USER',
      user: user
    })      
  } )

  return () => unsabscribe()
}, [])
   return (
     <div className="">
       <Routes>
         <Route path='/' element={<Home />} />
         <Route path='/admin-login' element={<Login />} />
         <Route element={<PrivateRoute />} >
           {/*  */}
         </Route>
       </Routes>
       
       {/* <Clock timerDays={timerDays} timerHours={timerHours} timerMinutes={timerMinutes}
       timerSecondes={timerSecondes}/> */}
     </div>
  );
}

export default App;
