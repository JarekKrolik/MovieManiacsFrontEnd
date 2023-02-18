import React, {useContext} from "react";
import {UserContext} from "../../contexts/userContext";

export const UserMainPage= ()=>{
const {id,setId} = useContext(UserContext)

    return <h1>{id}</h1>
}