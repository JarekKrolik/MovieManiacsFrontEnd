import React, {useEffect, useState} from "react";
import '../components/css/Spinner.css';
import {Navigate} from "react-router-dom";
import {GearSpinner} from "./GearSpinner";

interface Props {
    returnRoute: string,
}

export const Spinner = (props: Props) => {
    const [time, setTime] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setTime(true)
        }, 50000)
    }, [])


    return (time ? <Navigate to={props.returnRoute}/> : <GearSpinner/>)
}