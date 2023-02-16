import React from "react";
import {Link} from "react-router-dom";

export const LoginComponent=()=>{


    return(
        <div>
            <button>login</button>
            <Link to={'/register'}>register</Link>
        </div>
    )
}