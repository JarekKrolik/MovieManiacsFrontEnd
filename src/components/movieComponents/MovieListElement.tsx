import React, {useContext, useEffect, useState} from "react";
import {MovieListEntity}from 'types'
import '../css/MovieListElement.css'

import {Link, Navigate} from "react-router-dom";
import {FavouriteIcon} from "../FavouriteIcon";
import {UserDataContext} from "../../contexts/UserDataContext";
import{FavouriteMoviesList} from 'types'

interface Props extends MovieListEntity {
    listOfData:MovieListEntity[];
    favList:FavouriteMoviesList[]|undefined
}

export const MovieListElement = (props:Props)=>{
    const {obj} = useContext(UserDataContext)
    const{id,description,image,resultType,title,favList}= props;

const list = favList?.map(e=>e.movie_id)


    return (
        <li className={'element'}  id={id}>
            <FavouriteIcon  switchedOn={list?list.includes(id):false}  id={id} user={obj.name} type={'movie'} image={image} title={title}/>
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