import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import {UserContext} from "../contexts/userContext";
import "./css/LoginComponent.css"
export const LoginComponent=()=>{


    return(
        <div className={'loginBox'}>
            <Link to={'/log'}>zaloguj</Link>
            <Link to={'/register'}>zarejestruj</Link>
        </div>
    )
}