import React, {useContext, useEffect} from "react";
import {useState} from "react";
import{UserDataContext} from "./contexts/UserDataContext";
import {Form, Route, Routes} from "react-router-dom";
import {FormAdd} from "./components/forms/RegisterForm";
import {Footer} from "./components/Footer";
import {LoginComponent} from "./components/LoginComponent";
import {LoginForm} from "./components/forms/LoginForm";
import {UserMainPage} from "./components/user/UserMainPage";
import {BackGroundPicture} from "./components/pictures/BackGroundPicture";
import {UserPanel} from "./components/user/UserPanel";


function App() {
    const obj = {
        name:'',
        id:'',
        avatar:0,
        date:'',
        email:'',
        movieId: '',
    }
const[userData,setUserData]=useState(obj)


    return (
<>
        <div className={'mainBox'}>
            <BackGroundPicture/>
<UserDataContext.Provider value={{obj: userData,setUserData}}>
      <Routes>
          <Route path={'/'} element={<LoginComponent/>}/>
        <Route path={'/log'} element={<LoginForm login={''} password={''}/>}/>
          <Route path={'/register'} element={<FormAdd/>}/>
          <Route path={'/userMain'} element={<UserMainPage/>}/>
          <Route path={'/userPanel'} element={<UserPanel/>} />
      </Routes>
</UserDataContext.Provider>




            <Footer/>
        </div>

</>
  );
}

export default App;
