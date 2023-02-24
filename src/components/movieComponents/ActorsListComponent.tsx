import React from "react";
import '../css/MovieListElement.css'
import {ActorsListEntity} from 'types'
import {Link} from "react-router-dom";

interface Props extends ActorsListEntity {
    listOfData:ActorsListEntity[];
}

export const ActorsListComponent=(props:Props)=>{
const {id,description,image,title} = props

    return (  <li className={'element'} id={id}>
        <h3>Imię i Nazwisko : <span>{title}</span></h3>
        <p>Krótki opis : <span>{description}</span></p>
        <div className="picture">
            {image?(<img src={image} alt="plakat z filmu"/>):(<img src={require('../../assets/img/vecteezy_icon-image-not-found-vector_.jpg')} alt="symbol braku zdjęcia"/>)}
        </div>
        <Link  to={'/allData'} state={{id:id,listOfData:props.listOfData,type:'actor'}} className={'seeMore'}>zobacz więcej</Link>
    </li>)
}