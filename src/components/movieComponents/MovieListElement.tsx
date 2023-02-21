import React from "react";
import {MovieListEntity}from 'types'
import '../css/MovieListElement..css'


export const MovieListElement = (props:MovieListEntity)=>{
    const{id,description,image,resultType,title}= props


    return (
        <li className={'element'} id={id}>
            <h3>Tytuł : <span>{title}</span></h3>
            <p>Krótki opis : <span>{description}</span></p>
            <p>{resultType}</p>
            <div className="picture">
                <img src={image} alt="plakat z filmu"/>
            </div>
        </li>
    )
}