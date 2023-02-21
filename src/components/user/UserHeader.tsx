import React from "react";
import {UserEntity} from 'types'
import '../css/UserHeader.css'
import {Link} from "react-router-dom";

export const UserHeader = (props:UserEntity)=>{



    return(
        <>
        <header className="userHeader">
            <div className="buttons">
            <div className="button">ulubione</div>
            <div className="button">do obejrzenia</div>
                <div className="button">zapowiedzi</div>
                <div className="button">teraz w kinach</div>
            </div>
            <Link to={'/'}>
            <div className="avatar">
                <img src={require(`../../assets/img/avatars/${props.avatar}.png`)} alt="widok awatara użytkownika"/>
                <p >{props.name}</p>
            </div>
            </Link>
            <Link to={'/'}>
                <div className="avatar logout">
                    <img src={require(`../../assets/img/log-out-2355227_640.png`)} alt="obrazek wylogowania"/>
                    <p>wyloguj</p>
                </div>
            </Link>

        </header>



        </>
    )
}