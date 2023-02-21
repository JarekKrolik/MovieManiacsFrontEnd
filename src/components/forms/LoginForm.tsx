import React, {useContext, useState} from "react";
import {UserContext} from "../../contexts/userContext";
import {apiUrl} from "../../config/api";
import {UserEntity} from 'types'
import {Navigate} from "react-router-dom";
import {GoBackBtn} from "../GoBackBtn";
import {Spinner} from "../Spinner";
import {Header} from "../Header";

interface Props {
    password:string;
    login:string;
}

export const LoginForm=(props:Props)=>{
    const {id,setId}=useContext(UserContext)
    const [loginData,setLoginData]=useState({
        userName:props.login,
        password:props.password,
        verificationCode:0,
        loggedIn:false,
        errorMessage:'',
        notVerified:false,
        spinnerOn:false,
    })
    const handleVerificationCode =async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setLoginData(prev=>({
            ...prev,
            spinnerOn: true,
        }))
        const res= await fetch(`${apiUrl}/verify/${loginData.userName}`,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'

            },
            body:JSON.stringify({code:loginData.verificationCode})

        });
        const data = await res.json();
        if(data.verificationOk){

            setLoginData(prev=>({
                ...prev,
                errorMessage: 'kod weryfikacyjny prawidłowy',
                notVerified: false,
                spinnerOn: false,

            }))

            }else{
            setLoginData(prev=>({
                ...prev,
                errorMessage: 'błędny kod weryfikacyjny !',
                notVerified: true,
            }))

        }


    }
    const handleInputData = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setLoginData(prev=>({
                ...prev,
        [e.target.name]:e.target.value,
            }

        ))
    }

    const handleErrorMessage = ()=>{
        setLoginData(prev=>({
            ...prev,
            errorMessage: '',
        }))
    }

    const handleForm =  (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        setLoginData(prev=>({
            ...prev,
            spinnerOn: true,
        }));

        (async ()=>{
            const res =  await fetch(`${apiUrl}/user/${loginData.userName}`,{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json'

                },
                body:JSON.stringify({pass:loginData.password})
            })

            const data = await res.json()
            console.log(data)

            if(!data){
                setLoginData(prev=>({
                    ...prev,
                    errorMessage: 'błędna nazwa użytkownika lub hasło',
                    notVerified: false,
                }));
                return
            }

            if(data.userNotVerified){
                setLoginData(prev=>({
                    ...prev,
                    errorMessage: 'konto użytkownika nie zweryfikowane',
                    notVerified: true,
                }))

            }

            if(data.message){
                setLoginData(prev=>({
                    ...prev,
                    errorMessage: data.message,

                }))
            }

            if(data.id){
                setId(data.id)
                setLoginData(prev=>({
                    ...prev,
                    errorMessage: '',
                    notVerified: false,
                    loggedIn: true,
                    spinnerOn: false,
                }))
            }

        })()
    }

    return(<>
            <Header/>
        <div className="formContainer">
            {loginData.spinnerOn?<Spinner/>:null}
            <form onSubmit={handleForm} className='register loginForm'>
                <label className={'loginLabels'}>
                    nazwa użytkownika <input onChange={handleInputData} name={'userName'} value={loginData.userName} required type="text"/>
                </label>
                <label className={'loginLabels'}>
                   hasło <input onChange={handleInputData} required name={'password'} value={loginData.password} type="password"/>
                </label>


                <button>zaloguj</button>
                <GoBackBtn text={'strona główna'}/>
            </form>


        </div>
            {loginData.errorMessage?<p onClick={handleErrorMessage} className={'textInfo'}>{loginData.errorMessage}</p>:null}
            {loginData.notVerified?(
                <form className={'register'} onSubmit={handleVerificationCode}>
                    <label className={'loginLabels'}>kod weryfikacyjny <input onChange={handleInputData} required value={loginData.verificationCode} name={'verificationCode'} type="number"/></label>
                    <button>zapisz</button>
                </form>
            ):null}
            {!loginData.loggedIn?null:<Navigate to={'/userMain'}/>}

        </>
    )
}