import React, {useContext, useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import '../css/UserPanel.css';
import {UserDataContext} from "../../contexts/UserDataContext";
import {GoBackBtn} from "../GoBackBtn";
import {AvatarComponent} from "./AvatarComponent";
import {MovieFinder} from "../../repository/MovieFinder";
import {DeleteAccountPanel} from "./DeleteAccountPanel";

export const UserPanel = () => {
    const {userData, setUserData} = useContext(UserDataContext)
    const [backGroundImage, setBackgroundImage] = useState('')
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

    useEffect(() => {
        randomBackground()
    }, [])

    const randomBackground = () => {
        if (userData.favMovies.length > 0) {
            const random = Math.floor(Math.random() * userData.favMovies.length)
            const backPic = userData.favMovies[random].image
            setBackgroundImage(backPic)
        } else {
            setBackgroundImage('../../assets/img/cinema-strip-2713352_640.jpg')
        }
    }

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
        setShowDeleteAccountConfirmation(prev => !prev)
    }
    const handleAvatarSelect = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setUserData({
                ...userData,
                avatar: avatar,
            });
            setRedirect(true)
            await MovieFinder.changeUserAvatar(userData.id, avatar)
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
                {showDeleteAccountConfirmation ?
                    <DeleteAccountPanel modalOff={setShowDeleteAccountConfirmation}/> : null}
                {showError.display ? <p onClick={() => {
                    setShowError({
                        display: false,
                        errorMessage: '',
                    })
                    setShowNewPassword(false)
                }} className="textInfo">{showError.errorMessage}</p> : null}
                <div style={{
                    backgroundImage: `url(${backGroundImage})`
                }} className="text_user">
                    <div className="shade"></div>
                    <h3>User : {userData.name}</h3>
                    <div className="avatar">
                        <img src={require(`../../assets/img/avatars/${userData.avatar}.png`)}
                             alt="user avatar"/>
                    </div>
                    <p>e-mail : {userData.email}</p>
                    <p>MovieManiac account created at : <br/>{date.toLocaleDateString()}</p>

                </div>
                <div className="form">
                    <form className={'form'} onSubmit={handleAvatarSelect}>
                        {avatarsArr.map((el, index) => {
                            return (<AvatarComponent key={index} countOfAvatars={index}
                                                     handleRadioChange={handleRadioChange}/>)
                        })}

                        <button className={'seeMore'}>choose your avatar</button>
                    </form>
                </div>
                <div className="btns">
                    {redirect ? <Navigate to={'/userMain'}/> : null}
                    {showNewPassword ? <form onSubmit={handlePasswordChange} className={'register loginForm userPanel'}>
                        <label className={'loginLabels'}>new password <input onChange={handlePasswordChangeValue}
                                                                             name={'password'} required={true}
                                                                             type={'password'}/></label>
                        <label className={'loginLabels'}>repeat new password <input onChange={handlePasswordChangeValue}
                                                                                    name={'confirmPassword'}
                                                                                    required={true}
                                                                                    type={'password'}/></label>
                        <button>send</button>
                    </form> : null}
                    {userData.name === 'TestUser' ? null : <button onClick={() => {
                        setShowNewPassword(prev => !prev)
                    }} className="goBack">{showNewPassword ? 'abort password change' : 'change password'}</button>}
                    {userData.name === 'TestUser' ? null :
                        <button onClick={handleDeleteAccountPanel} className={'goBack'}>delete account</button>}
                    <GoBackBtn text={'exit user panel'} path={'/userMain'}/>
                </div>
            </div>
        </>
    )
}