import React from "react";
import {ProposedMovie} from "./WhatToWatchComponent";
import '../css/ProposedMovieComponent.css'
interface Props{
    movie:ProposedMovie;
}

export const ProposedMovieComponent = (props:Props)=>{
    const {movie}=props

    return(
        <div className="proposed">
            <h2>{movie.title}</h2>
            <h2>imdB rating : {movie.imDbRating}</h2>
            <div className="picture">
                <img src={movie.image} alt=""/>
            </div>
            <button className="seeMore">see more</button>
        </div>
    )
}