import React, {ChangeEventHandler, ReactHTMLElement, useContext, useState} from "react";
import {UserContext} from "../../contexts/userContext";
import '../css/RegisterForm.css'
import {apiUrl} from "../../config/api";
import {UserEntity} from 'types'

export const FormAdd = ()=>{
    const{id,setId}=useContext(UserContext)
    const[loggedIn,setLoggedIn]=useState(false)
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
     })
    const handleInputsChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setRegisterData(prev=>({
            ...prev,
            [e.target.name]:e.target.value,
        }))
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
        console.log(data)
        if(data.message){
            if(data.message.includes('Duplicate')){data.message="Użytkownik o tej nazwie już istnieje"}
            setErrormsg(prev=>({
                ...prev,
                responseErrorMessage: data.message,
                responseOk: false,
            }))
        }else{
            setId(data.id)
            setLoggedIn(true)
            setRegisterData({
                name:'',
                email:'',
                password:'',
                passwordCheck:'',
                }
                )
            setErrormsg(prev=>({
                ...prev,
                responseOk: true,
                responseErrorMessage: '',
            }))
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
        <div className={'formContainer'}>
        <form className={'register'} onSubmit={handleNewUser}>
            <label>Podaj login <input name={'name'} required onChange={handleInputsChange} min={3} max={36} value={registerData.name} type="text"/></label>
            <label>Podaj email <input name={'email'} required onChange={handleInputsChange} value={registerData.email} type="email"/></label>
            <label>Podaj hasło <input name={'password'} required onChange={handleInputsChange} min={6} max={36}  value={registerData.password} type="password"/></label>
            <label>Powtórz hasło <input name={'passwordCheck'}required  onChange={handleInputsChange} min={6} max={36} value={registerData.passwordCheck} type="password"/></label>{errorMsg.passwordCheck?<span>hasła nie są identyczne</span>:null}
            <button type={"submit"} >Zarejestruj</button>
            {!errorMsg.responseErrorMessage?null:<p>{errorMsg.responseErrorMessage}</p>}
            {!errorMsg.responseOk?null:(!loggedIn?<p>logowanie...</p>:<p>użytkownik zarejestrowany</p>)}
        </form>
        </div>
    )
}