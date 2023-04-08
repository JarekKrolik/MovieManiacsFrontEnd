import React from "react";
import '../css/MovieListElement.css';
import {Link} from "react-router-dom";


export const DataDelayComponent = () => {


    return (
        <div className="container">
            <div className="element delay">
                <div className="shade"></div>
                <h2>Gathering data takes to long, try again later...</h2>
                <div className="loginBox">
                    <Link to={'/userMain'}>OK</Link>
                </div>
            </div>
        </div>
    )
}