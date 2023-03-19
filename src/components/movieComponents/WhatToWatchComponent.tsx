import React, {Dispatch, SetStateAction, useContext, useState} from "react";
import {Switches} from "../LoginComponent";
import '../css/WhatToWatch.css'
import {UserDataContext} from "../../contexts/UserDataContext";
import {MovieFinder} from "../../repository/MovieFinder";
import {Spinner} from "../Spinner";
import {ProposedMovieComponent} from "./ProposedMovieComponent";

interface Props {
    setSwitches: Dispatch<SetStateAction<Switches>>,
}

export interface ProposedMovie {
    id: string;
    imDbRating: string;
    image: string;
    title: string;
}

export const WhatToWatchComponent = (props: Props) => {
    const {userData} = useContext(UserDataContext)
    const [proposedMovie, setProposedMovie] = useState<ProposedMovie>()
    const [displayMovie, setDisplayMovie] = useState(false)
    const [favListEmpty, setFavListEmpty] = useState(false)
    const answers = ['Based on your favorites list, i think you should like this one ! ', 'Ok, how about this one ?', 'How about this one?', 'This one is really cool !', 'Something for you !', 'Perfect choice for you !']
    const selectMovie = async () => {

        if (userData.favMovies.length > 0) {
            const randomFavMovie = userData.favMovies[Math.floor(Math.random() * userData.favMovies.length)]
            const OneOfFavouriteMovies = await MovieFinder.getOneMovieById(randomFavMovie.movie_id);
            const whatToWatch = OneOfFavouriteMovies.similars[Math.floor(Math.random() * OneOfFavouriteMovies.similars.length)];
            if (userData.favMovies.filter(el => el.movie_id === whatToWatch.id).length > 0||Math.floor(Number(whatToWatch.imDbRating))<6 ){
                await handleFindMovie()
            } else {
                setProposedMovie(whatToWatch)
            }
        } else {
            setFavListEmpty(true)
        }
    }

    const handleFindMovie = async () => {
        setDisplayMovie(true)
        await selectMovie();
    }


    return (
        <div className="whatToWatch">
            {!displayMovie ? <h2>Can't decide what to watch tonight ?</h2> : null}
            {!favListEmpty ?
                <>
                    {displayMovie ? <h2>{answers[Math.floor(Math.random() * answers.length)]}</h2> : null}
                    {displayMovie ? proposedMovie ? <ProposedMovieComponent setSwitches={props.setSwitches} movie={proposedMovie}/> :
                        <Spinner returnRoute={'/'}/> : null}
                    <button onClick={handleFindMovie}
                            className="goBack">{!displayMovie ? 'propose something...' : 'want something else?'}</button>
                </> : <h2>Your favorite list is empty, i dont know what you like... <br/>
                    add some movies to your list.</h2>}


            <button onClick={() => {
                props.setSwitches(prev => ({
                        ...prev,
                        whatToWatch: false,
                        searchComponent: true,
                    })
                )
            }} className="goBack">close
            </button>

        </div>
    )
}