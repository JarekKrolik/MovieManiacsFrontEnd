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
    setSwitches:Dispatch<SetStateAction<{ searchComponent: boolean; nowInCinemas: boolean; soonInCinemas: boolean;favourites:boolean;allDataComponent:boolean, }>>,}


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
                            allDataComponent:false,
                        }))
                    }} className="button">search engine</div>
                    <div onClick={()=>{
                        props.setSwitches(({
                            soonInCinemas:false,
                            nowInCinemas:false,
                            searchComponent:false,
                            favourites:true,
                            allDataComponent:false,
                        }))}} className="button">favourites</div>
                    <div className="button">to watch</div>
                    <div onClick={()=>{
                        props.setSwitches(({
                            soonInCinemas:true,
                            nowInCinemas:false,
                            searchComponent:false,
                            favourites:false,
                            allDataComponent:false,
                        }))
                    }} className={'button'} >soon in cinemas</div>
                    <div onClick={()=>{
                        props.setSwitches(({
                            soonInCinemas:false,
                            nowInCinemas:true,
                            searchComponent:false,
                            favourites:false,
                            allDataComponent:false,
                        }))
                    }} className={'button'}>now in cinemas</div>
                </div>
                <div className="links">
                    <Link to={'/userPanel'}>
                        <div className="avatar">
                            <img src={require(`../../assets/img/avatars/${props.avatar}.png`)}
                                 alt="user avatar"/>
                            <p>{props.name}</p>
                        </div>
                    </Link>
                    <Link to={'/'}>
                        <div className="avatar logout">
                            <img src={require(`../../assets/img/log-out-2355227_640.png`)} alt="logout icon"/>
                            <p>log out</p>
                        </div>
                    </Link>
                </div>
            </header>
        </>
    )
}