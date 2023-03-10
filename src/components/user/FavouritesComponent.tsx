import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import {FavouriteMoviesList,FavouriteActorsList}from'types'
import"../css/Favourites.css"
import {Link} from "react-router-dom";
import {UserDataContext} from "../../contexts/UserDataContext";
import {GoUpArrow} from "../GoUpArrow";

interface Props {
    setSwitches?: Dispatch<SetStateAction<{ searchComponent: boolean; nowInCinemas: boolean; soonInCinemas: boolean;favourites:boolean }>>;

}

export const FavouritesComponent=(props:Props)=>{
const{setSwitches}=props
    const{obj,setUserData}=useContext(UserDataContext)
    const[favMovies,setFavMovies]= useState<FavouriteMoviesList[]>()
    const[favActors,setFavActors]= useState<FavouriteActorsList[]>()
    const[favVisible,setFavVisible]=useState({
        favMovies:true,
        favActors:false,
    })

    useEffect(()=>{
        setFavMovies(obj.favMovies)

    },[obj])
    useEffect(()=>{
        setFavActors(obj.favActors)

    },[obj])

    return(
        <div className="favourites">
            <button onClick={()=>{
                setFavVisible(prev=>({
                    ...prev,
                    favMovies: !prev.favMovies,
                }))
            }} className="goBack">{favVisible.favMovies?'ukryj filmy':'filmy'}</button>
            {favVisible.favMovies?
            <div className="movies">
                <h2>Your favourite movies list:</h2>
                { favMovies?<ul>
                    {favMovies.length>0?
                    favMovies.map(el=>{return(
                        <li key={el.movie_id}>
                            <Link to={'/allData'} state={{id:el.movie_id,listOfData:[],type:'movie'}}>
                            <h3>{el.name}</h3>
                            <div className="fav-picture">
                                <img src={el.image} alt=""/>
                            </div>
                            </Link>
                        </li>
                    )}):<h3>brak ulubionych na liście...</h3>}
                </ul>:<h3>brak ulubionych na liście...</h3>}
            </div>:null}

                <button onClick={()=>{
                    setFavVisible(prev=>({
                        ...prev,
                        favActors: !prev.favActors,
                    }))
                }} className="goBack">{favVisible.favActors?'ukryj aktorzy':'aktorki/aktorzy'}</button>
                {favVisible.favActors?
                    <div className="actors movies">
                        <h2>Your favourite actors list:</h2>
                        {favActors? <ul>
                            {favActors.length>0?
                            favActors.map(el=>{return(
                                <li key={el.actor_id}>
                                    <Link to={'/allData'} state={{id:el.actor_id,listOfData:[],type:'actor'}}>
                                    <h3>{el.name}</h3>
                                    <div className="fav-picture">
                                        <img src={el.image} alt=""/>
                                    </div>
                                    </Link>
                                </li>
                            )}):<h3>brak ulubionych na liście...</h3>}
                        </ul>:<h3>brak ulubionych na liście...</h3>}
                    </div>:null}

<GoUpArrow/>

        </div>
    )
}