import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import {NowInCinemasMovieEntity} from 'types';
import {UserDataContext} from "../../contexts/UserDataContext";
import {MovieFinder} from "../../repository/MovieFinder";
import "../css/NowInCinemas.css";
import {Spinner} from "../Spinner";
import {NowInCinemasElement} from "./NowInCinemasElement";
import {GoUpArrow} from "../GoUpArrow";
import {Switches} from "../LoginComponent";


interface Props {
    setSwitches: Dispatch<SetStateAction<Switches>>,
}

export const NowInCinemasComponent = (props: Props) => {
    const {userData} = useContext(UserDataContext)
    const [foundData, setFoundData] = useState<NowInCinemasMovieEntity[]>()
    const [numberOfDisplayedMovies, setNumberOfDisplayedMovies] = useState(5)
    const [filteredData, setFilteredData] = useState<NowInCinemasMovieEntity[]>()
    const [showMoreButton, setShowMoreButton] = useState(true)


    useEffect(() => {
        (async () => {
            if (!foundData) {
                const data = await MovieFinder.nowInCinemas() as NowInCinemasMovieEntity[]
                setFoundData(data)
            }
            const slicedArray = foundData?.slice(0, numberOfDisplayedMovies)
            setFilteredData(slicedArray)


        })()
    }, [foundData, numberOfDisplayedMovies])


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
            <h2>
                Now In cinemas:</h2>
            {filteredData?.length === 0 ? <h2>No data, try again later...</h2> : null}
            <ul className={'moviesList'}>
                {!filteredData ? <Spinner returnRoute={'/delay'}/> : filteredData.map(el => (
                    <NowInCinemasElement setSwitches={props.setSwitches} key={el.id} favList={userData.favMovies}
                                         fullTitle={el.fullTitle}
                                         genres={el.genres} year={el.year} stars={el.stars}
                                         releaseState={el.releaseState} errorMessage={""} image={el.image}
                                         id={el.id} contentRating={el.contentRating} directors={el.directors}
                                         plot={el.plot} runtimeStr={el.runtimeStr} title={el.title}
                                         description={el.description} resultType={el.resultType}/>
                ))}
            </ul>
            )
            <GoUpArrow/>
            {showMoreButton ?
                <button onClick={handleMoreMoviesDisplay} className={'goBack'}>see more...</button> : null}
            <button onClick={() => {
                if (props.setSwitches) {
                    props.setSwitches(prev => ({
                        ...prev,
                        searchComponent: true,
                        nowInCinemas: false,
                    }))
                }
            }} className={'goBack'}>close
            </button>
        </div>
    )
}