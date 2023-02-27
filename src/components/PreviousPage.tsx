import React from "react";
import '../components/css/GoBackBtn.css'
import {useNavigate} from "react-router-dom";

export const PreviousPage = () => {
    const navigate = useNavigate();
    const handleClick = () => {

        navigate(-1);
    }
    return (
        <button onClick={handleClick} className="goBack">powrót</button>
    )
}