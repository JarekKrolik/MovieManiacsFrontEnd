import React, {useContext, useState} from "react";
import {SingleActorSpecific, ActorsListEntity, FavouriteActorsList, FavouriteMoviesList} from 'types'
import {Link} from "react-router-dom";
import '../css/MostKnownFor.css'
import {FavouriteIcon} from "../FavouriteIcon";
import {UserDataContext} from "../../contexts/UserDataContext";


interface Props {
    foundData: SingleActorSpecific,
    listOfData: ActorsListEntity,
}

export const MostKnownFor = (props: Props) => {
    const {obj} = useContext(UserDataContext)
    const {foundData} = props
    const favList = obj.favMovies
    const list = favList?.map(e => e.movie_id)
    return (
        <div className="starredIn most-known-for">
            <ul>{foundData.knownFor.map(el => {
                return (<li key={el.id} className={'element'} id={el.id}>
                    <FavouriteIcon switchedOn={list ? list.includes(el.id) : false} id={el.id} user={obj.name}
                                   type={'movie'} image={el.image} title={el.fullTitle}/>
                    <h3>Tytuł : <span>{el.fullTitle}</span></h3>

                    <p>Rok : <span>{el.year}</span></p>
                    <p>Rola : <span>{el.role}</span></p>
                    <div className="picture">
                        {el.image ? <img src={el.image} alt="plakat z filmu"/> :
                            <img src={require('../../assets/img/vecteezy_icon-image-not-found-vector_.jpg')}
                                 alt="symbol braku zdjęcia"/>}
                    </div>

                    <Link to={'/allData'} state={{id: el.id, listOfData: props.listOfData, type: 'movie'}}
                          className={'seeMore'}>zobacz więcej</Link>


                </li>)
            })}


            </ul>

        </div>
    )
}