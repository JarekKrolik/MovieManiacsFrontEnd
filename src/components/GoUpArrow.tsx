import React from "react";
import './css/GoUpArrow.css'
export const GoUpArrow = ()=>{
const handleClick = ()=>{
    window.scrollTo(0,0)
}


    return(
        <div onClick={handleClick} className="arrow">
            <img src={require('../assets/img/up-arrow.png')} alt=""/>
        </div>
    )
}