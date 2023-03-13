import React from "react";
import {Link} from "react-router-dom";
import "./css/LoginComponent.css"
import {Header} from "./Header";

export const LoginComponent = () => {


    return (
        <>
            <Header/>
            <div className={'loginBox'}>
                <Link to={'/log'}>log in</Link>
                <Link to={'/register'}>register</Link>
            </div>
        </>
    )
}