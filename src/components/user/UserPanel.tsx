import React, {useContext, useEffect, useState} from "react";
import {Link, Navigate} from "react-router-dom";
import '../css/UserPanel.css'
import {Spinner} from "../Spinner";
import {apiUrl} from "../../config/api";
import {UserDataContext} from "../../contexts/UserDataContext";
import {GoBackBtn} from "../GoBackBtn";
import {AvatarComponent} from "./AvatarComponent";


export const UserPanel = () => {
    const {obj, setUserData} = useContext(UserDataContext)
    const [avatar, setAvatar] = useState(0)
    const [redirect, setRedirect] = useState(false)
    const avatarsArr = [0, 1, 2, 3, 4, 5, 6]

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAvatar(Number(e.target.value))

    }

    const handleAvatarSelect = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setUserData({
                ...obj,
                avatar: avatar,
            });
            setRedirect(true)
            const res = await (fetch(`${apiUrl}/user/${obj.id}`, {

                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({avatar})
            }));
            return await res.json()
        } catch (e) {
            console.log(e)
        }

    }

    const date = new Date(obj.date)


    return (
        <>
            {obj.id ? null : <Navigate to={'/'}/>}
            (
            <div className="userPanel">
                <div className="text">
                    <h3>Użytkownik : {obj.name}</h3>
                    <p>Data założenia konta na MovieManiac : <br/>{date.toLocaleDateString()}</p>
                </div>
                <div className="form">
                    <form className={'form'} onSubmit={handleAvatarSelect}>
                        {avatarsArr.map((el, index) => {
                            return (<AvatarComponent countOfAvatars={index} handleRadioChange={handleRadioChange}/>)
                        })}

                        <button>wybierz swój avatar</button>
                    </form>
                </div>
                {redirect ? <Navigate to={'/userMain'}/> : null}

                <GoBackBtn text={'powrót'} path={'/userMain'}/>


            </div>
        </>

    )
}