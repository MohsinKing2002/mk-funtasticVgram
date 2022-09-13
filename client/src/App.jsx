import React, { useEffect } from "react";
import "./App.css";
import {useSelector, useDispatch} from 'react-redux';
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import NewPost from "./components/Post/NewPost";
import Search from "./components/Util/Search";
import Home from "./components/User/Home";
import Account from "./components/User/Account";
import { loadUser } from "./components/Actions/User";
import Update from "./components/User/Update";
import SingleUser from "./components/User/SingleUser";
import ErrorPage from "./components/Util/ErrorPage";
import UpdatePost from "./components/Post/UpdatePost";
import Message from './components/Util/Message';


const App = ()=>{

  const { isAuthenticated } = useSelector(state=>state.user);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(loadUser());
  }, [dispatch]);

  return(
    <>
      <Header/>

      <div className="center">
        <Routes>
          <Route path="/register" element={ <Register/> } />
          <Route path="/" element={isAuthenticated ? <Home/> : <Login /> } />
          <Route path="/search" element={isAuthenticated ? <Search/> : <Login/> } />
          <Route path="/account" element={isAuthenticated ? <Account/> : <Login/> } />
          <Route path="/me/update" element={isAuthenticated ? <Update/> : <Login/> } />
          <Route path="/users/:id" element={isAuthenticated ? <SingleUser/> : <Login/> } />

          <Route path="/new" element={isAuthenticated ? <NewPost/> : <Login /> } />
          <Route path="/post/update/:id" element={isAuthenticated ? <UpdatePost/> : <Login /> } />
          <Route path="/message" element={isAuthenticated ? <Message /> : <Login /> } />

          <Route path="*" element={<ErrorPage/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;