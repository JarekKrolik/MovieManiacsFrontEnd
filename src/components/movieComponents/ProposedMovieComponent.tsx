import React, {Dispatch, SetStateAction, useContext} from "react";
import {ProposedMovie} from "./WhatToWatchComponent";
import '../css/ProposedMovieComponent.css'
import {GoUpArrow} from "../GoUpArrow";
import {Switches} from "../LoginComponent";
import {UserDataContext} from "../../contexts/UserDataContext";
import {deflateRaw} from "zlib";
import {MovieFinder} from "../../repository/MovieFinder";



interface Props {
    movie: ProposedMovie;
    setSwitches: Dispatch<SetStateAction<Switches>>;
}

export const ProposedMovieComponent = (props: Props) => {
    const {movie, setSwitches} = props
    const {userData, setUserData} = useContext(UserDataContext)

    const whereToWatchHandler = async () => {
        const test = await MovieFinder.whereToWatch(movie.title,movie.id,'en','us')
        for (const [key, value] of Object.entries(test.us)) {
            console.log(`${key}: ${value}`);
        }
        console.log(test.us.prime)
    }

    return (
        <div className="proposed">
            <h2>{movie.title}</h2>
            <h2>imdB rating : {movie.imDbRating}</h2>
            <div className="picture">
                <img src={movie.image} alt=""/>
            </div>
            <button onClick={whereToWatchHandler}>where to watch ?</button>
            <GoUpArrow/>
            <button id={movie.id} onClick={(e: any) => {
                setSwitches(prev => ({
                    ...prev,
                    allDataComponent: true,
                }));
                setUserData(({
                    ...userData,
                    selectedItem: {
                        id: e.target.id,
                        type: 'movie',
                    }
                }))
            }} className="seeMore">see more
            </button>
        </div>
    )
}