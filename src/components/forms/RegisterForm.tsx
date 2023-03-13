import React, {useState} from "react";
import '../css/RegisterForm.css'
import {apiUrl} from "../../config/api";
import {UserEntity} from 'types'
import {GoBackBtn} from "../GoBackBtn";
import {Navigate} from "react-router-dom";
import {Header} from "../Header";
import {Spinner} from "../Spinner";

export const FormAdd = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        password: '',
        passwordCheck: '',
    })

    const [errorMsg, setErrormsg] = useState({
        passwordCheck: false,
        responseErrorMessage: '',
        responseOk: false,
        spinnerOn: false,
    })

    const hadleErrorMessage = () => {
        setErrormsg(prev => ({
            ...prev,
            responseErrorMessage: '',
        }))
    }

    const handleInputsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegisterData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }
    const handleLoggedIn = () => {
        setRedirect(true)

    }

    const handleNewUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (registerData.password !== registerData.passwordCheck) {
            setErrormsg((prev) => ({
                ...prev,
                passwordCheck: true,

            }));
        } else {
            setErrormsg(prev => ({
                ...prev,
                passwordCheck: false,
            }));
        }

        if (registerData.password === registerData.passwordCheck) {
            const newUser = {
                name: registerData.name,
                email: registerData.email,
                avatar: 0,
                passwordhash: registerData.password,
            } as UserEntity
            setErrormsg(prev => ({
                ...prev,
                passwordCheck: false,
                spinnerOn: true,
            }));
            (async () => {

                const res = await fetch(`${apiUrl}/user`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'

                    },
                    body: JSON.stringify(newUser)
                });
                const data = await res.json()

                if (!data.userVerified) {
                    setErrormsg(prev => ({
                        ...prev,
                        responseErrorMessage: 'użytkownik nie zweryfikowany',
                        notVerified: true,
                    }))
                }
                if (data.message) {
                    if (data.message.includes('Duplicate')) {
                        data.message = "Użytkownik o tej nazwie już istnieje"
                    }
                    setErrormsg(prev => ({
                        ...prev,
                        responseErrorMessage: data.message,
                        responseOk: false,
                    }))
                } else {
                    setLoggedIn(true)
                    setRegisterData(prev => ({
                            ...prev,
                            passwordCheck: '',
                        })
                    )
                    setErrormsg(prev => ({
                        ...prev,
                        responseOk: true,
                        responseErrorMessage: '',
                    }));

                }
            })()

        } else {
            setErrormsg(prev => ({
                ...prev,
                passwordCheck: true,
            }));
            return
        }


    }

    return (
        <>
            <Header/>
            <div className={'formContainer'}>
                {errorMsg.spinnerOn ? <Spinner returnRoute={'/'}/> : null}
                <form className={'register'} onSubmit={handleNewUser}>
                    <label>login <input name={'name'} required onChange={handleInputsChange} min={3} max={10}
                                        value={registerData.name} type="text"/></label>
                    <label>e-mail <input name={'email'} required onChange={handleInputsChange}
                                         value={registerData.email} type="email"/></label>
                    <label>password<input name={'password'} required onChange={handleInputsChange} min={6} max={36}
                                          value={registerData.password} type="password"/></label>
                    <label>repeat password<input name={'passwordCheck'} required onChange={handleInputsChange} min={6}
                                                 max={36} value={registerData.passwordCheck}
                                                 type="password"/></label>{errorMsg.passwordCheck ?
                    <span className={'error'}>hasła nie są identyczne</span> : null}
                    <button type={"submit"}>register</button>
                    {!errorMsg.responseErrorMessage ? null :
                        <p onClick={hadleErrorMessage} className={'textInfo'}>{errorMsg.responseErrorMessage}</p>}
                    {!errorMsg.responseOk ? null : (!loggedIn ? <p className={'textInfo'}>logging...</p> :
                        <p onClick={handleLoggedIn} className={'textInfo'}>Verification code was sent on your e-mail
                            address . Please enter the code when logging in for the first time. Unverified accounts will
                            be deleted after 7 days.</p>)}
                    <GoBackBtn text={'main page'} path={'/'}/>
                </form>
                {redirect ? <Navigate to={'/log'}/> : null}

            </div>
        </>
    )
}