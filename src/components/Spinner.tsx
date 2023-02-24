import React, {useEffect, useState} from "react";
import '../components/css/Spinner.css'
import {Navigate} from "react-router-dom";

interface Props{
    returnRoute:string,
}

export const Spinner = (props:Props)=>{
    const[time,setTime]=useState(false)
    useEffect(()=>{
        setTimeout(()=>{
            setTime(true)
        },50000)
    },[])

    return( time?<Navigate to={props.returnRoute}/>:<div className="lds-hourglass"></div>)
}