// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./Component/Home";
import Userlisting from "./Component/Userlisting";
import Adduser from "./Component/Adduser";
import Updateuser from "./Component/Updateuser";
import { ToastContainer } from "react-toastify";
import { Provider, useSelector } from "react-redux";
import Store from "./Redux/Store";
import SignIn from "./Component/SignIn";
import { useEffect, useState } from "react";

function App() {
 const [login,setLogin]=useState(false)
 const status =localStorage.getItem("login")
  useEffect(() => {
  if(status!=="false"){
    setLogin(true)
  }else{
    setLogin(false)
  }
  }, [status]);
const logOut =()=>{
  localStorage.setItem("login",false)
  window.location.reload(false)
}

  return (
    <div className="App">
     {login && <div className="header">
        <Link to={"/"}>Admin Dashboard</Link>
        {/* <Link to={'/user'}>User</Link> */} <span onClick={()=>logOut()} style={{float :"right"}}>Logout</span>
      </div>}
      {!login ? (
        <Routes>
          <Route   path="*" element={<SignIn></SignIn>}></Route>
        </Routes>
      ) : (
        <Routes>
        
          <Route  exact path="*" element={<Userlisting></Userlisting>}></Route>
          <Route exact path="/user/add" element={<Adduser></Adduser>}></Route>
          <Route  exact
            path="/user/edit/:code"
            element={<Updateuser></Updateuser>}
          ></Route>
        </Routes>
      )}

      <ToastContainer
        className="toast-position"
        position="bottom-right"
      ></ToastContainer>
    </div>
  );
}

export default App;
