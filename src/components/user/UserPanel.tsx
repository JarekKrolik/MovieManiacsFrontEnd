import React, {useContext, useState} from "react";
import {Navigate} from "react-router-dom";
import '../css/UserPanel.css'
import {apiUrl} from "../../config/api";
import {UserDataContext} from "../../contexts/UserDataContext";
import {GoBackBtn} from "../GoBackBtn";
import {AvatarComponent} from "./AvatarComponent";
import {MovieFinder} from "../../repository/MovieFinder";
import {DeleteAccountPanel} from "./DeleteAccountPanel";


export const UserPanel = () => {
    const {userData, setUserData} = useContext(UserDataContext)
    const [avatar, setAvatar] = useState(0)
    const [redirect, setRedirect] = useState(false)
    const [showDeleteAccountConfirmation, setShowDeleteAccountConfirmation] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showError, setShowError] = useState({
        display: false,
        errorMessage: '',
    })
    const [newPassword, setNewPassword] = useState({
        password: '',
        confirmPassword: '',
    })
    const avatarsArr = [0, 1, 2, 3, 4, 5, 6]

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAvatar(Number(e.target.value))
    }
    const handlePasswordChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'password') {
            setNewPassword(prev => ({
                ...prev,
                password: e.target.value
            }))
        }
        if (e.target.name === 'confirmPassword') {
            setNewPassword(prev => ({
                ...prev,
                confirmPassword: e.target.value
            }))
        }
    }

    const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (newPassword.password === newPassword.confirmPassword) {
            const data = await MovieFinder.changeUserPassword(userData.id, newPassword.password)

            setShowError({
                display: true,
                errorMessage: data.message
            })


        } else {
            setShowError(({
                display: true,
                errorMessage: 'passwords are not the same !'
            }))
        }
    }
    const handleDeleteAccountPanel = () => {
        setShowDeleteAccountConfirmation(prev=>!prev)
    }
    const handleAvatarSelect = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setUserData({
                ...userData,
                avatar: avatar,
            });
            setRedirect(true)
            const res = await (fetch(`${apiUrl}/user/${userData.id}`, {

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

    const date = new Date(userData.date)


    return (
        <>
            {userData.id ? null : <Navigate to={'/'}/>}
            (
            <div className="userPanel">
                {showDeleteAccountConfirmation ? <DeleteAccountPanel modalOff={setShowDeleteAccountConfirmation}/> : null}
                {showError.display ? <p onClick={() => {
                    setShowError({
                        display: false,
                        errorMessage: '',
                    })
                    setShowNewPassword(false)
                }} className="textInfo">{showError.errorMessage}</p> : null}
                <div className="text">
                    <h3>User : {userData.name}</h3>
                    <p>MovieManiac account created at : <br/>{date.toLocaleDateString()}</p>
                </div>
                <div className="form">
                    <form className={'form'} onSubmit={handleAvatarSelect}>
                        {avatarsArr.map((el, index) => {
                            return (<AvatarComponent key={index} countOfAvatars={index}
                                                     handleRadioChange={handleRadioChange}/>)
                        })}

                        <button>choose your avatar</button>
                    </form>
                </div>
                {redirect ? <Navigate to={'/userMain'}/> : null}
                {showNewPassword ? <form onSubmit={handlePasswordChange} className={'register loginForm'}>
                    <label className={'loginLabels'}>new password <input onChange={handlePasswordChangeValue}
                                                                         name={'password'} required={true}
                                                                         type={'password'}/></label>
                    <label className={'loginLabels'}>repeat new password <input onChange={handlePasswordChangeValue}
                                                                                name={'confirmPassword'} required={true}
                                                                                type={'password'}/></label>
                    <button>send</button>
                </form> : null}
                <button onClick={() => {
                    setShowNewPassword(prev => !prev)
                }} className="goBack">{showNewPassword ? 'close' : 'change password'}</button>
                <button onClick={handleDeleteAccountPanel} className={'goBack'}>delete account</button>

                <GoBackBtn text={'go back'} path={'/userMain'}/>
            </div>
        </>

    )
}