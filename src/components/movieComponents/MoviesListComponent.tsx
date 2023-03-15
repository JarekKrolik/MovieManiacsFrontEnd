import React, {Dispatch, SetStateAction, useContext} from "react";
import {Spinner} from "../Spinner";
import {MovieListElement} from "./MovieListElement";
import{MovieListEntity,NowInCinemasMovieEntity}from'types'
import {UserDataContext} from "../../contexts/UserDataContext";
interface Props{
    foundData:MovieListEntity[]|NowInCinemasMovieEntity[]|undefined,
    setSwitches: Dispatch<SetStateAction<{ searchComponent: boolean; nowInCinemas: boolean; soonInCinemas: boolean; favourites: boolean;allDataComponent:boolean, }>>
}

export const MoviesListComponent=(props:Props)=>{
    const {userData} = useContext(UserDataContext);
    const{foundData}=props



    return(
        <ul className={'moviesList'}>
            {!foundData ? <Spinner returnRoute={'/delay'}/> : foundData.map(el => (
                <MovieListElement  setSwitches={props.setSwitches} listOfData={foundData} key={el.id} id={el.id} description={el.description}
                                  image={el.image} title={el.title} resultType={el.resultType}
                                  favList={userData.favMovies} errorMessage={""}/>
            ))}
        </ul>
    )
}