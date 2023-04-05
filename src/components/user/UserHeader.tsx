import React, {Dispatch, SetStateAction, useContext} from "react";
import '../css/UserHeader.css';
import {Link} from "react-router-dom";
import {Switches} from "../LoginComponent";
import {UserDataContext} from "../../contexts/UserDataContext";

interface Props {
    id: string,
    name: string,
    avatar: number,
    date: string,
    email: string,
    setSwitches: Dispatch<SetStateAction<Switches>>,
}

export const UserHeader = (props: Props) => {
    const {setUserData, userData} = useContext(UserDataContext)
    const logOut = () => {
        setUserData({
            ...userData,
            name: '',
            id: '',

        })
    }

    return (
        <>
            <header className="userHeader">
                <div className="buttons">
                    <div onClick={() => {
                        props.setSwitches(({
                            favourites: false,
                            soonInCinemas: false,
                            nowInCinemas: false,
                            searchComponent: true,
                            allDataComponent: false,
                            whatToWatch: false,
                        }))
                    }} className="button">search engine
                    </div>
                    <div onClick={() => {
                        props.setSwitches(({
                            soonInCinemas: false,
                            nowInCinemas: false,
                            searchComponent: false,
                            favourites: true,
                            allDataComponent: false,
                            whatToWatch: false,
                        }))
                    }} className="button">favourites
                    </div>
                    <div onClick={() => {
                        props.setSwitches(({
                            soonInCinemas: false,
                            nowInCinemas: false,
                            searchComponent: false,
                            favourites: false,
                            allDataComponent: false,
                            whatToWatch: true,
                        }))
                    }} className="button">what to watch ?
                    </div>
                    <div onClick={() => {
                        props.setSwitches(({
                            soonInCinemas: true,
                            nowInCinemas: false,
                            searchComponent: false,
                            favourites: false,
                            allDataComponent: false,
                            whatToWatch: false,
                        }))
                    }} className={'button'}>soon in cinemas
                    </div>
                    <div onClick={() => {
                        props.setSwitches(({
                            soonInCinemas: false,
                            nowInCinemas: true,
                            searchComponent: false,
                            favourites: false,
                            allDataComponent: false,
                            whatToWatch: false,
                        }))
                    }} className={'button'}>now in cinemas
                    </div>
                </div>
                <div className="links">
                    <Link to={'/userPanel'}>
                        <div className="avatar">
                            <img src={require(`../../assets/img/avatars/${props.avatar}.png`)}
                                 alt="user avatar"/>
                            <p>{props.name}</p>
                        </div>
                    </Link>

                    <div onClick={logOut} className="avatar logout">
                        <img src={require(`../../assets/img/log-out-2355227_640.png`)} alt="logout icon"/>
                        <p>log out</p>
                    </div>

                </div>
            </header>
        </>
    )
}