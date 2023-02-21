import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../../contexts/userContext";
import {apiUrl} from "../../config/api";
import {UserEntity} from 'types'
import {Header} from "../Header";
import {UserHeader} from "./UserHeader";
import {Spinner} from "../Spinner";
import {GoBackBtn} from "../GoBackBtn";
import {SearchComponent} from "./SearchComponent";
export const UserMainPage= ()=>{
const {id,setId} = useContext(UserContext);
const[user,setUser]=useState<UserEntity>()

useEffect(()=>{
console.log(id);
    (async()=>{
       try{
        const res = await (fetch(`${apiUrl}/user/${id}`,{

            method:"GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        }));
        const data = await res.json()
           const downloadedUser = data[0] as UserEntity
        setUser(downloadedUser)}catch (e){console.log(e)}

    })()


},[])







    return(
        <>
            {user?<UserHeader passwordhash={user.passwordhash} isverified={user.isverified} id={user.id} name={user.name} avatar={user.avatar} email={user.email }/>:<Spinner/>}
             <SearchComponent/>

            <GoBackBtn text={'wyloguj'}/>
        </>
    )
}