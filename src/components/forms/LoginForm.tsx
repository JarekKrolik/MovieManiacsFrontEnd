import React, {useContext, useState} from "react";
import {apiUrl} from "../../config/api";
import {Navigate} from "react-router-dom";
import {GoBackBtn} from "../GoBackBtn";
import {Header} from "../Header";
import {UserDataContext} from "../../contexts/UserDataContext";

interface Props {
    password: string;
    login: string;
}

export const LoginForm = (props: Props) => {
    const {setUserData,userData} = useContext(UserDataContext)
    const [showPasswordReset, setShowPasswordReset] = useState(false)
    const [reset, setReset] = useState({
        email: '',
        user: '',
    })
    const [loginData, setLoginData] = useState({
        userName: props.login,
        password: props.password,
        verificationCode: 0,
        loggedIn: false,
        errorMessage: '',
        notVerified: false,
        spinnerOn: false,
    })
    const handleVerificationCode = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await fetch(`${apiUrl}/verify/${loginData.userName}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({code: loginData.verificationCode})

        });
        const data = await res.json();
        if (data.verificationOk) {

            setLoginData(prev => ({
                ...prev,
                errorMessage: 'verification code correct.',
                notVerified: false,


            }))

        } else {
            setLoginData(prev => ({
                ...prev,
                errorMessage: 'wrong verification number !',
                notVerified: true,
            }))

        }


    }
    const handleInputData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData(prev => ({
                ...prev,
                [e.target.name]: e.target.value,
            }

        ))
    }

    const handleErrorMessage = () => {
        setLoginData(prev => ({
            ...prev,
            errorMessage: '',
        }))
    }

    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const res = await fetch(`${apiUrl}/verify/reset`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({
                user: reset.user,
                email: reset.email,
            })

        });
        const data = await res.json()
        if (data.response) {
            setLoginData(prev => ({
                ...prev,
                errorMessage: data.response
            }));
        }
        if (data.message) {
            setLoginData(prev => ({
                ...prev,
                errorMessage: 'try again later...'
            }));
        }


    }

    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        (async () => {
            const res = await fetch(`${apiUrl}/user/${loginData.userName}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'

                },
                body: JSON.stringify({pass: loginData.password})
            })

            const data = await res.json()


            if (!data) {
                setLoginData(prev => ({
                    ...prev,
                    errorMessage: 'wrong user name or password',
                    notVerified: false,
                }));
                return
            }

            if (data.userNotVerified) {
                setLoginData(prev => ({
                    ...prev,
                    errorMessage: 'user account not verified',
                    notVerified: true,
                }))

            }

            if (data.message) {
                setLoginData(prev => ({
                    ...prev,
                    errorMessage: data.message,

                }))
            }

            if (data.id) {
                setUserData({
                    ...userData,
                    id: data.id,
                })
                setLoginData(prev => ({
                    ...prev,
                    errorMessage: '',
                    notVerified: false,
                    loggedIn: true,
                }))
            }

        })()
    }

    return (<>
            <Header/>
            <div className="formContainer">
                {showPasswordReset ? <form className={'register loginForm'} onSubmit={handleResetPassword}>
                    <h3 className={'loginForm'}>Recover password</h3>
                    <label className={'loginLabels'}>user name<input value={reset.user} onChange={(e) => {
                        setReset((prev) => ({
                            ...prev,
                            user: e.target.value,
                        }))
                    }} type="text"/></label>
                    <label className={'loginLabels'}>your e-mail <input value={reset.email} onChange={(e) => {
                        setReset(prev => ({
                            ...prev,
                            email: e.target.value,
                        }))
                    }} type="email"/></label>
                    <button className={'goBack'}>send</button>
                </form> : null}
                {!showPasswordReset ? <form onSubmit={handleForm} className='register loginForm'>
                    <label className={'loginLabels'}>
                        user name <input onChange={handleInputData} name={'userName'} value={loginData.userName}
                                         required type="text"/>
                    </label>
                    <label className={'loginLabels'}>
                        password <input onChange={handleInputData} required name={'password'} value={loginData.password}
                                        type="password"/>
                    </label>


                    <button>log in</button>
                    <GoBackBtn text={'main paige'} path={'/'}/>
                </form> : null}
                <p onClick={() => {
                    setShowPasswordReset(prev => !prev)
                }} className={'reset-password'}>{!showPasswordReset ? 'recover your password' : 'go back'}</p>
            </div>
            {loginData.errorMessage ?
                <p onClick={handleErrorMessage} className={'textInfo'}>{loginData.errorMessage}</p> : null}
            {loginData.notVerified ? (
                <form className={'register'} onSubmit={handleVerificationCode}>
                    <label className={'loginLabels'}>verification code <input onChange={handleInputData} required
                                                                              value={loginData.verificationCode}
                                                                              name={'verificationCode'} type="number"/></label>
                    <button>send</button>
                </form>
            ) : null}
            {!loginData.loggedIn ? null : <Navigate to={'/userMain'}/>}

        </>
    )
}