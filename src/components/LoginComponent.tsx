import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import "./css/LoginComponent.css"
import {Header} from "./Header";
import {UserDataContext} from "../contexts/UserDataContext";
export const LoginComponent=()=>{
const{obj,setUserData} = useContext(UserDataContext);



    return(<>
            <Header/>
        <div className={'loginBox'}>
            <Link to={'/log'}>zaloguj</Link>
            <Link to={'/register'}>zarejestruj</Link>
        </div>
        </>
    )
}