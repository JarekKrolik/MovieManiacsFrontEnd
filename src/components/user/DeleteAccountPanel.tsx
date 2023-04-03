import React, {Dispatch, SetStateAction, useContext, useState} from "react";
import '../css/DeleteAccountPanel.css'
import {MovieFinder} from "../../repository/MovieFinder";
import {UserDataContext} from "../../contexts/UserDataContext";

interface Props {
    modalOff: Dispatch<SetStateAction<boolean>>;
}

export const DeleteAccountPanel = (props: Props) => {
    const {modalOff} = props
    const {userData,setUserData} = useContext(UserDataContext)
    const [responseMessage, setResponseMessage] = useState('')
    const handleDeleteAccount = async () => {
        const response = await MovieFinder.deleteUserAccount(userData.name, userData.id)
        setResponseMessage(response.message)
    }
    const handleGoodBye = ()=>{
        setUserData({
            ...userData,
            id:'',
            name:'',
        })
    }

    return (
        <div className="account_delete">
            {responseMessage ? <>
                <h2>{responseMessage}</h2>
                <button  onClick={handleGoodBye} className="goBack abort">ok</button>
            </> : <><h2>delete MovieManiac account</h2>
                <h2>Are you sure ?</h2>
                <div className="buttons">
                    <button onClick={handleDeleteAccount} className={'confirm'}>yes</button>
                    <button onClick={() => {
                        modalOff(prev => !prev)
                    }} className={'abort'}>no
                    </button>
                </div>
            </>}

        </div>
    )
}