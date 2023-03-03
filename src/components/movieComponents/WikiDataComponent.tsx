import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {SingleMovieSpecific} from 'types'
import '../css/WikiDataComponent.css'
interface Props {
    foundData: SingleMovieSpecific,
    offButtonHandle:Dispatch<SetStateAction<{ fullCast: boolean; trailer: boolean; photos: boolean; posters: boolean; similars: boolean; wiki: boolean; }>>,}


export const WikiDataComponent = (props:Props)=>{
    const[backGroundImage,setBackgroundImage] = useState<string>()
    const{foundData,offButtonHandle}=props
    useEffect(()=>{
        const random = Math.floor(Math.random()*foundData.images.items.length)
        const backPic = foundData.images.items[random].image;
        if(backPic){setBackgroundImage(backPic)}else {setBackgroundImage(foundData.image)}
    },[])

    return(
        foundData.wikipedia.plotFull?
<div className={'wikiData'} style={{
    backgroundImage:`url(${backGroundImage})`
}}>
    <button onClick={()=>{
        offButtonHandle(prev=>({
            ...prev,
            wiki:false,
        }))
    }} className="return">ukryj wiki</button>
    <div className="shade"></div>

    <h2>Więcej informacji o filmie</h2>
    <p>{foundData.wikipedia.plotFull.plainText?foundData.wikipedia.plotFull.plainText:'niestety brak danych...'}</p>



</div>:null
    )
}