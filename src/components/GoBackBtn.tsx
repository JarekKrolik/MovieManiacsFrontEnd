import React from "react";
import {Link} from "react-router-dom";
import './css/GoBackBtn.css'



export const GoBackBtn=()=>{


    return <Link className={'goBack'} to={'/'}>strona główna</Link>
}