import React from "react";
import {useNavigate} from "react-router-dom";
export const BackArrow = ()=>{
    const navigate = useNavigate();
    const handleClick = ()=>{

        navigate(-1)
    }


    return(
        <div onClick={handleClick} className="arrow back">
            <img src={require('../../assets/img/up-arrow-2.png')} alt=""/>
        </div>
    )
}