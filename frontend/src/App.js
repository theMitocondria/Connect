import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import { loadUser } from "./Actions/user";
import './App.css';
import Account from "./components/Accounts/Account";
import Header from "./components/header/header";
import Home from "./components/Home/Home";
import Login from "./components/login/login";
import Newpost from "./components/newpost/Newpost";
import Register from "./components/register/register";
import Reset from "./components/resetpassword/Reset";
import Token from "./components/Token/Token";
import Updatepassword from "./components/Updatepassword/Updatepassword";
import Updateprofile from "./components/updateprofile/Updateprofile";
import UserProfile from "./components/UserProfile/UserProfile";
function App() {

  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(loadUser());
  },[]);

  const {isAuthenticated} = useSelector((state)=>state.user);

  return (
      <Router>
        {isAuthenticated && <Header />}
        <Routes>
          <Route path="/" element={isAuthenticated?<Home/>:<Login />} /> 
          <Route path="/account" element={isAuthenticated?<Account/>:<Login />} />
          <Route path="/newpost" element={isAuthenticated?<Newpost/>:<Login />} />
          <Route path="/register" element={isAuthenticated?<Account/>:<Register />} />
          <Route path="/update/profile" element={isAuthenticated?<Updateprofile/>:<Login />} />
          <Route path="/update/password" element={isAuthenticated?<Updatepassword/>:<Login />} />
          <Route path="/forgot/password" element={isAuthenticated?<Updatepassword/>:<Reset />} />
          <Route path="/password/reset/:token" element={isAuthenticated?<Updatepassword/>:<Token />} /> 
          <Route path="/user/:id" element={isAuthenticated?<UserProfile/>:<Login/>} />
        </Routes>
      </Router>
  );
}

export default App;