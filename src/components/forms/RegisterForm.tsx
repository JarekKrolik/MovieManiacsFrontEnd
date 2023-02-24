import React, {ChangeEventHandler, ReactHTMLElement, useContext, useState} from "react";
import '../css/RegisterForm.css'
import {apiUrl} from "../../config/api";
import {UserEntity} from 'types'
import {GoBackBtn} from "../GoBackBtn";
import {Navigate} from "react-router-dom";
import {LoginForm} from "./LoginForm";
import {Header} from "../Header";
import {Spinner} from "../Spinner";

export const FormAdd = ()=>{
    const[loggedIn,setLoggedIn]=useState(false)
    const[redirect,setRedirect]=useState(false)
    const[registerData,setRegisterData]=useState({
        name:'',
        email:'',
        password:'',
        passwordCheck:'',
    })

     const[errorMsg,setErrormsg] = useState({
         passwordCheck:false,
         responseErrorMessage:'',
         responseOk:false,
         spinnerOn:false,
     })

    const hadleErrorMessage =()=>{
        setErrormsg(prev=>({
            ...prev,
            responseErrorMessage: '',
        }))
    }

    const handleInputsChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setRegisterData(prev=>({
            ...prev,
            [e.target.name]:e.target.value,
        }))
    }
const handleLoggedIn = ()=>{
       setRedirect(true)

}

const handleNewUser = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
      if(registerData.password!==registerData.passwordCheck){
          setErrormsg((prev)=>({
              ...prev,
              passwordCheck: true,

          }));
      }else{
          setErrormsg(prev=>({
              ...prev,
              passwordCheck: false,
          }));
      }

if(registerData.password===registerData.passwordCheck){
    const newUser = {
        name:registerData.name,
        email:registerData.email,
        avatar:0,
        passwordhash:registerData.password,
    }  as UserEntity
    setErrormsg(prev=>({
        ...prev,
        passwordCheck: false,
        spinnerOn: true,
    }));
    (async()=>{

        const res =await fetch(`${apiUrl}/user`,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'

            },
            body:JSON.stringify(newUser)
        });
        const data = await res.json()

        if(!data.userVerified){
            setErrormsg(prev=>({
                ...prev,
                responseErrorMessage: 'użytkownik nie zweryfikowany',
                notVerified: true,
            }))
        }
        if(data.message){
            if(data.message.includes('Duplicate')){data.message="Użytkownik o tej nazwie już istnieje"}
            setErrormsg(prev=>({
                ...prev,
                responseErrorMessage: data.message,
                responseOk: false,
            }))
        }else{
            setLoggedIn(true)
            setRegisterData(prev=>({
               ...prev,
                passwordCheck:'',
                })
                )
            setErrormsg(prev=>({
                ...prev,
                responseOk: true,
                responseErrorMessage: '',
            }));

        }
    })()

}else{
    setErrormsg(prev=>({
        ...prev,
        passwordCheck: true,
    }));
    return
}


}

    return(
        <>
            <Header/>
        <div className={'formContainer'}>
            {errorMsg.spinnerOn?<Spinner returnRoute={'/'}/>:null}
        <form className={'register'} onSubmit={handleNewUser}>
            <label>Podaj login <input name={'name'} required onChange={handleInputsChange} min={3} max={10} value={registerData.name} type="text"/></label>
            <label>Podaj email <input name={'email'} required onChange={handleInputsChange} value={registerData.email} type="email"/></label>
            <label>Podaj hasło <input name={'password'} required onChange={handleInputsChange} min={6} max={36}  value={registerData.password} type="password"/></label>
            <label>Powtórz hasło <input name={'passwordCheck'}required  onChange={handleInputsChange} min={6} max={36} value={registerData.passwordCheck} type="password"/></label>{errorMsg.passwordCheck?<span className={'error'}>hasła nie są identyczne</span>:null}
            <button type={"submit"} >Zarejestruj</button>
            {!errorMsg.responseErrorMessage?null:<p onClick={hadleErrorMessage} className={'textInfo'}>{errorMsg.responseErrorMessage}</p>}
            {!errorMsg.responseOk?null:(!loggedIn?<p className={'textInfo'}>logowanie...</p>:<p onClick={handleLoggedIn} className={'textInfo'}>Na podany adres e-mail został wysłany kod weryfikacyjny. Proszę podać go przy pierwszym logowaniu. Nie zweryfikowane konta są usuwane po upływie 7 dni.</p>)}
            <GoBackBtn text={'strona główna'} path={'/'}/>
        </form>
            {redirect?<Navigate to={'/log'}/>:null}

        </div>
            </>
    )
}