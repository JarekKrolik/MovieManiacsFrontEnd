import React, {useContext, useState} from "react";
import {MovieListEntity}from 'types'
import '../css/MovieListElement.css'

import {Link, Navigate} from "react-router-dom";

interface Props extends MovieListEntity {
    listOfData:MovieListEntity[];
}

export const MovieListElement = (props:Props)=>{
    const{id,description,image,resultType,title}= props;


    return (
        <li className={'element'}  id={id}>
        <h3>Tytuł : <span>{title}</span></h3>
        <p>Krótki opis : <span>{description}</span></p>
        <p>{resultType}</p>
        <div className="picture">
            {image?<img src={image} alt="plakat z filmu"/>:<img src={require('../../assets/img/vecteezy_icon-image-not-found-vector_.jpg')} alt="symbol braku zdjęcia"/>}
        </div>

        <Link  to={'/allData'} state={{id:id,listOfData:props.listOfData,type:'movie'}} className={'seeMore'}>zobacz więcej</Link>


    </li>


    )
}