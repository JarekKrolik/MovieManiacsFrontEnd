import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import {FavouriteIcon} from "../FavouriteIcon";
import {UserDataContext} from "../../contexts/UserDataContext";
import{NowInCinemasMovieEntity,FavouriteMoviesList} from 'types'

interface Props extends NowInCinemasMovieEntity {
    listOfData:NowInCinemasMovieEntity[];
    favList:FavouriteMoviesList[]|undefined;

}

export const NowInCinemasElement = (props:Props)=>{
    const {obj} = useContext(UserDataContext)
    const{favList}= props;
    const list = favList?.map(e=>e.movie_id)

    return (
        <li className={'element'}  id={props.id}>
            <FavouriteIcon  switchedOn={list?list.includes(props.id):false}  id={props.id} user={obj.name} type={'movie'} image={props.image} title={props.fullTitle}/>
            {props.fullTitle?<h3>Tytuł : <span>{props.fullTitle}</span></h3>:null}
            {props.releaseState?<h3>Premiera : <span>{props.releaseState}</span></h3>:null}
            {props.stars?<h3>Występują : <span>{props.stars}</span></h3>:null}
            {props.directors?<h3>Reżyseria : <span>{props.directors}</span></h3>:null}
            <div className="picture">
                {props.image?<img loading={'lazy'} src={props.image} alt="plakat z filmu"/>:<img src={require('../../assets/img/vecteezy_icon-image-not-found-vector_.jpg')} alt="symbol braku zdjęcia"/>}
            </div>

            <Link  to={'/allData'} state={{id:props.id,listOfData:[],type:'movie'}} className={'seeMore'}>zobacz więcej</Link>


        </li>


    )
}