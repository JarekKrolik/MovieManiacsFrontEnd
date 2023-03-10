import React, {Dispatch, SetStateAction} from "react";
import {UserEntity} from 'types'
import '../css/UserHeader.css'
import {Link} from "react-router-dom";

interface Props {
    id: string,
    name: string,
    avatar: number,
    date: string,
    email: string,
    setSwitches:Dispatch<SetStateAction<{ searchComponent: boolean; nowInCinemas: boolean; soonInCinemas: boolean;favourites:boolean }>>,}


export const UserHeader = (props: Props) => {


    return (
        <>
            <header className="userHeader">
                <div className="buttons">
                    <div onClick={()=>{
                        props.setSwitches(({
                            favourites:false,
                            soonInCinemas:false,
                            nowInCinemas:false,
                            searchComponent:true,
                        }))
                    }} className="button">wyszukiwarka</div>
                    <div onClick={()=>{
                        props.setSwitches(({
                            soonInCinemas:false,
                            nowInCinemas:false,
                            searchComponent:false,
                            favourites:true,
                        }))}} className="button">ulubione</div>
                    <div className="button">do obejrzenia</div>
                    <div onClick={()=>{
                        props.setSwitches(({
                            soonInCinemas:true,
                            nowInCinemas:false,
                            searchComponent:false,
                            favourites:false,
                        }))
                    }} className={'button'} >wkrótce w kinach</div>
                    <div onClick={()=>{
                        props.setSwitches(({
                            soonInCinemas:false,
                            nowInCinemas:true,
                            searchComponent:false,
                            favourites:false,
                        }))
                    }} className={'button'}>teraz w kinach</div>
                </div>
                <div className="links">
                    <Link to={'/userPanel'}>
                        <div className="avatar">
                            <img src={require(`../../assets/img/avatars/${props.avatar}.png`)}
                                 alt="widok awatara użytkownika"/>
                            <p>{props.name}</p>
                        </div>
                    </Link>
                    <Link to={'/'}>
                        <div className="avatar logout">
                            <img src={require(`../../assets/img/log-out-2355227_640.png`)} alt="obrazek wylogowania"/>
                            <p>wyloguj</p>
                        </div>
                    </Link>
                </div>
            </header>
        </>
    )
}