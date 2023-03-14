import React, {useContext,useState} from "react";
import {Navigate} from "react-router-dom";
import '../css/UserPanel.css'
import {apiUrl} from "../../config/api";
import {UserDataContext} from "../../contexts/UserDataContext";
import {GoBackBtn} from "../GoBackBtn";
import {AvatarComponent} from "./AvatarComponent";


export const UserPanel = () => {
    const {userData, setUserData} = useContext(UserDataContext)
    const [avatar, setAvatar] = useState(0)
    const [redirect, setRedirect] = useState(false)
    const[showNewPassword,setShowNewPassword]=useState(false)
    const[showError,setShowError]=useState({
        display:false,
        errorMessage:'',
    })
    const[newPassword,setNewPassword]=useState({
        password:'',
        confirmPassword:'',
    })
    const avatarsArr = [0, 1, 2, 3, 4, 5, 6]

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAvatar(Number(e.target.value))
    }
    const handlePasswordChangeValue = (e: React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.name==='password'){
            setNewPassword(prev=>({
                ...prev,
                password: e.target.value
            }))
        }
        if(e.target.name==='confirmPassword'){
            setNewPassword(prev=>({
                ...prev,
                confirmPassword: e.target.value
            }))
        }
    }

    const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(newPassword.password===newPassword.confirmPassword){
            const res = await fetch(`${apiUrl}/user/change_password/${userData.id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'

                },
                body: JSON.stringify({password: newPassword.password})
            })

            const data = await res.json()

            setShowError({
                display: true,
                errorMessage: data.message
            })


        }else{
            setShowError(({
                display: true,
                errorMessage: 'hasła nie są takie same !'
            }))
        }
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
                {showError.display?<p onClick={()=>{
                    setShowError({
                        display: false,
                        errorMessage: '',
                    })
                    setShowNewPassword(false)
                }} className="textInfo">{showError.errorMessage}</p>:null}
                <div className="text">
                    <h3>Użytkownik : {userData.name}</h3>
                    <p>Data założenia konta na MovieManiac : <br/>{date.toLocaleDateString()}</p>
                </div>
                <div className="form">
                    <form className={'form'} onSubmit={handleAvatarSelect}>
                        {avatarsArr.map((el, index) => {
                            return (<AvatarComponent key={index} countOfAvatars={index} handleRadioChange={handleRadioChange}/>)
                        })}

                        <button>wybierz swój avatar</button>
                    </form>
                </div>
                {redirect ? <Navigate to={'/userMain'}/> : null}
                {showNewPassword?<form onSubmit={handlePasswordChange} className={'register loginForm'}>
                    <label  className={'loginLabels'}>podaj nowe hasło <input onChange={handlePasswordChangeValue} name={'password'} required={true}  type={'password'}/></label>
                    <label className={'loginLabels'}>powtórz hasło <input onChange={handlePasswordChangeValue} name={'confirmPassword'} required={true} type={'password'}/></label>
                    <button>wyślij</button>
                </form>:null}
                <button onClick={()=>{
                    setShowNewPassword(prev=>!prev)
                }} className="goBack">{showNewPassword?'zamknij':'zmień hasło'}</button>

                <GoBackBtn text={'powrót'} path={'/userMain'}/>


            </div>
        </>

    )
}