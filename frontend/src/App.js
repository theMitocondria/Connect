import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import { loadUser } from "./Actions/user";
import './App.css';
import Header from "./components/header/header";
import Home from "./components/Home/Home";
import Login from "./components/login/login";
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
        </Routes>
      </Router>
  );
}

export default App;