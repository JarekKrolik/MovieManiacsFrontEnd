import React, {useState} from "react";
import '../css/RegisterForm.css';
import {UserEntity} from 'types';
import {Header} from "../Header";
import {RegisterForm} from "./RegisterForm";
import {saveUserToDatabase} from "../../utils/getUser";

export const FormAdd = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        password: '',
        passwordCheck: '',
    })

    const [errorMsg, setErrorMsg] = useState({
        passwordCheck: false,
        responseErrorMessage: '',
        responseOk: false,
        spinnerOn: false,
    })

    const handleErrorMessage = () => {
        setErrorMsg(prev => ({
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
        e.preventDefault()
        if (registerData.password !== registerData.passwordCheck) {
            setErrorMsg((prev) => ({
                ...prev,
                passwordCheck: true,

            }));
        } else {
            setErrorMsg(prev => ({
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
            setErrorMsg(prev => ({
                ...prev,
                passwordCheck: false,
                spinnerOn: false,
            }));
            (async () => {

                const data = await saveUserToDatabase(newUser)

                if (!data.userVerified) {
                    setErrorMsg(prev => ({
                        ...prev,
                        responseErrorMessage: 'user not verified',
                        notVerified: true,
                    }))
                }
                if (data.message) {
                    if (data.message.includes('Duplicate')) {
                        data.message = "this user name is unavailable, please choose another one"
                    }
                    setErrorMsg(prev => ({
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
                    setErrorMsg(prev => ({
                        ...prev,
                        responseOk: true,
                        responseErrorMessage: '',
                    }));

                }
            })()

        } else {
            setErrorMsg(prev => ({
                ...prev,
                passwordCheck: true,
            }));
            return
        }
    }

    return (
        <>
            <Header/>
            <RegisterForm
                redirect={redirect}
                handleLoggedIn={handleLoggedIn}
                loggedIn={loggedIn}
                handleErrorMessage={handleErrorMessage}
                errorMsg={errorMsg} handleNewUser={handleNewUser}
                handleInputsChange={handleInputsChange}
                registerData={registerData}/>
        </>
    )
}