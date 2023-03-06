import React, {useContext} from "react";
import {Spinner} from "../Spinner";
import {MovieListElement} from "./MovieListElement";
import{MovieListEntity,NowInCinemasMovieEntity}from'types'
import {UserDataContext} from "../../contexts/UserDataContext";
interface Props{
    foundData:MovieListEntity[]|NowInCinemasMovieEntity[]|undefined,

}

export const MoviesListComponent=(props:Props)=>{
    const {obj} = useContext(UserDataContext);
    const{foundData}=props
    return(
        <ul className={'moviesList'}>
            {!foundData ? <Spinner returnRoute={'/delay'}/> : foundData.map(el => (
                <MovieListElement listOfData={foundData} key={el.id} id={el.id} description={el.description}
                                  image={el.image} title={el.title} resultType={el.resultType}
                                  favList={obj.favMovies} errorMessage={""}/>
            ))}
        </ul>
    )
}