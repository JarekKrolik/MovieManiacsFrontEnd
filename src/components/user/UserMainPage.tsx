import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../../contexts/userContext";
import {apiUrl} from "../../config/api";
import {UserEntity} from 'types'
import {Header} from "../Header";
import {UserHeader} from "./UserHeader";
import {Spinner} from "../Spinner";
import {GoBackBtn} from "../GoBackBtn";
import {SearchComponent} from "./SearchComponent";
import {getUser} from "../../utils/getUser";
import {Navigate} from "react-router-dom";
import {UserPanel} from "./UserPanel";
import {UserDataContext} from "../../contexts/UserDataContext";

export const UserMainPage= ()=>{

const{obj,setUserData}=useContext(UserDataContext)
// const {id,setId} = useContext(UserContext);
const[user,setUser]=useState<UserEntity>()


const handleSwitches = (e:React.ChangeEvent<HTMLInputElement>)=>{
  console.log(e.target.name);
}

useEffect(()=>{
if(!obj.name){

    (async()=>{

       try{
           const data = await getUser(obj.id)as UserEntity[]
           const downloadedUser = data[0] as UserEntity
        setUser(downloadedUser);
           setUserData({
               ...obj,
               name:downloadedUser.name,
               avatar:downloadedUser.avatar,
               date:downloadedUser.date,
               email:downloadedUser.email,

           })

       }catch (e){console.log(e)}

    })()}else setUser({
    name:obj.name,
    email:obj.email,
    avatar:obj.avatar,
    date:obj.date,
    isverified:true,
    id:obj.id,
    passwordhash:'',

})


},[]);







    return(
        <>
            {obj.id?null:<Navigate to={'/'}/>}
            {user?<UserHeader name={obj.name} avatar={obj.avatar} email={obj.email} date={obj.date} id={obj.id}/>:<Spinner/>}
             <SearchComponent/>

            <GoBackBtn text={'wyloguj'} path={'/'}/>
        </>
    )
}