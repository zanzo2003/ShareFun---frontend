import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import './App.css';
import Addpost from "./pages/Addpost";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect } from "react";
import { getAllPosts } from "./redux/actions/postActions";
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers } from "./redux/actions/userActions";
import AllUsers from "./pages/AllUsers";
import Editprofile from "./pages/Editprofile.js"





function App() {


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPosts()) ;
    dispatch(getAllUsers());

  }, [])



  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/profile/:userid" exact element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/addpost" exact element={<ProtectedRoute><Addpost /></ProtectedRoute>} />
          <Route path="/allusers" exact element={<ProtectedRoute><AllUsers /></ProtectedRoute>} />
          <Route path="/editprofile" exact element={<ProtectedRoute><Editprofile /></ProtectedRoute>} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


export const ProtectedRoute = ({children})=>{

  if(localStorage.getItem('user')){
      return children;
  }
  else{
    return <Navigate to='/login'  replace/>;
  }

}