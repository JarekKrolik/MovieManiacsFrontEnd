import React from "react";
import {Spinner} from "../Spinner";
import {GoBackBtn} from "../GoBackBtn";
import {Navigate} from "react-router-dom";

interface Props {
    errorMsg: { passwordCheck: boolean; responseErrorMessage: string; responseOk: boolean; spinnerOn: boolean; },
    handleNewUser: (e: React.FormEvent<HTMLFormElement>) => void,
    handleInputsChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    registerData: { name: string; email: string; password: string; passwordCheck: string; },
    handleErrorMessage: () => void,
    loggedIn: boolean,
    handleLoggedIn: () => void,
    redirect: boolean,
}

export const RegisterForm = (props: Props) => {
    const {
        errorMsg,
        handleNewUser,
        handleInputsChange,
        registerData,
        handleErrorMessage,
        loggedIn,
        handleLoggedIn,
        redirect
    } = props


    return (
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
                <span className={'error'}>passwords are not the same</span> : null}
                <button type={"submit"}>register</button>
                {!errorMsg.responseErrorMessage ? null :
                    <p onClick={handleErrorMessage} className={'textInfo'}>{errorMsg.responseErrorMessage}</p>}
                {!errorMsg.responseOk ? null : (!loggedIn ? <p className={'textInfo'}>logging...</p> :
                    <p onClick={handleLoggedIn} className={'textInfo'}>Verification code was sent on your e-mail
                        address . Please enter the code when logging in for the first time. Unverified accounts will
                        be deleted after 7 days.</p>)}
                <GoBackBtn text={'main page'} path={'/'}/>
            </form>
            {redirect ? <Navigate to={'/log'}/> : null}

        </div>
    )
}