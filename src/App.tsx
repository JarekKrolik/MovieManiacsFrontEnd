import React, {useContext, useEffect} from "react";
import {useState} from "react";
import {apiUrl} from "./config/api";
import {MovieFinder} from "./repository/MovieFinder";
import {UserEntity}from 'types'
import {UserContext} from '../src/contexts/userContext'
import {MainComponent} from "./components/MainComponent";
import {Form, Route, Routes} from "react-router-dom";
import {FormAdd} from "./components/forms/RegisterForm";
import {Header} from "./components/Header";
import {Footer} from "./components/Footer";
import {LoginComponent} from "./components/LoginComponent";

function App() {
const [id,setId]=useState('');

    return (

        <>
     <Header/>
            <UserContext.Provider value={{id,setId}}>
      <Routes>
        <Route path={'/log'} element={<LoginComponent/>}/>
          <Route path={'/register'} element={<FormAdd/>}/>
      </Routes>
            </UserContext.Provider>
<Footer/>
        </>
  );
}

export default App;
