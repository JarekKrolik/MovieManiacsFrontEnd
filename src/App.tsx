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
import {LoginForm} from "./components/forms/LoginForm";
import {UserMainPage} from "./components/user/UserMainPage";
import {BackGroundPicture} from "./components/pictures/BackGroundPicture";
import {Spinner} from "./components/Spinner";

function App() {
const [id,setId]=useState('');

    return (
<>
        <div className={'mainBox'}>
            <BackGroundPicture/>
     {/*<Header/>*/}
            <UserContext.Provider value={{id,setId}}>
      <Routes>
          <Route path={'/'} element={<LoginComponent/>}/>
        <Route path={'/log'} element={<LoginForm login={''} password={''}/>}/>
          <Route path={'/register'} element={<FormAdd/>}/>
          <Route path={'/userMain'} element={<UserMainPage/>}/>
      </Routes>
            </UserContext.Provider>
            <Footer/>
        </div>

</>
  );
}

export default App;
