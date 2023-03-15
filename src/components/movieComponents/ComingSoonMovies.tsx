import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import {NowInCinemasMovieEntity} from 'types'
import {UserDataContext} from "../../contexts/UserDataContext";
import {MovieFinder} from "../../repository/MovieFinder";
import "../css/NowInCinemas.css"
import {Spinner} from "../Spinner";
import {NowInCinemasElement} from "./NowInCinemasElement";
import {GoUpArrow} from "../GoUpArrow";

interface Props {
    setSwitches: Dispatch<SetStateAction<{ searchComponent: boolean; nowInCinemas: boolean; soonInCinemas: boolean;favourites:boolean;allDataComponent:boolean, }>>,
}

export const ComingSoonMovies = (props: Props) => {
    const {userData} = useContext(UserDataContext);
    const [foundData, setFoundData] = useState<NowInCinemasMovieEntity[]>()
    const [filteredData, setFilteredData] = useState<NowInCinemasMovieEntity[]>()
    const [numberOfDisplayedMovies, setNumberOfDisplayedMovies] = useState(5)
    const [showMoreButton, setShowMoreButton] = useState(true)

    useEffect(() => {
        (async () => {
            if (!foundData) {
                const data = await MovieFinder.getComingSoonMovies() as NowInCinemasMovieEntity[];
                setFoundData(data)
            }

            const slicedArray = foundData?.slice(0, numberOfDisplayedMovies)
            setFilteredData(slicedArray)
        })()
    }, [numberOfDisplayedMovies, foundData])

    const handleMoreMoviesDisplay = () => {
        if (filteredData && filteredData.length >= filteredData?.length + numberOfDisplayedMovies) {
            setShowMoreButton(false)
        }
        setNumberOfDisplayedMovies(prev => prev + 5)
        const slicedArray = foundData?.slice(0, numberOfDisplayedMovies)
        setFilteredData(slicedArray)

    }


    return (
        <div className={'fav'}>
            <h2>Soon in cinemas :</h2>
            {filteredData?.length === 0 ? <h2>Try again later...</h2> : null}
            <ul className={'moviesList'}>
                {!filteredData ? <Spinner returnRoute={'/delay'}/> : filteredData.map(el => (
                    <NowInCinemasElement setSwitches={props.setSwitches} key={el.id} favList={userData.favMovies}  fullTitle={el.fullTitle}
                                         genres={el.genres} year={el.year} stars={el.stars}
                                         releaseState={el.releaseState} errorMessage={""} image={el.image}
                                         id={el.id} contentRating={el.contentRating} directors={el.directors}
                                         plot={el.plot} runtimeStr={el.runtimeStr} title={el.title}
                                         description={el.description} resultType={el.resultType}/>
                ))}
            </ul>
            )
            <GoUpArrow/>
            {showMoreButton ? <button onClick={handleMoreMoviesDisplay} className={'goBack'}>see more...</button> : null}
            <button onClick={() => {
                if (props.setSwitches) {
                    props.setSwitches(prev => ({
                        ...prev,
                        soonInCinemas: false,
                        searchComponent: true,
                        nowInCinemas: false,
                    }))
                }
            }} className={'goBack'}>close
            </button>

        </div>
    )
}