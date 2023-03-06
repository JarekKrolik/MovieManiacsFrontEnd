import React, {useContext, useEffect, useState} from "react";
import {NowInCinemasMovieEntity} from 'types'
import {UserDataContext} from "../../contexts/UserDataContext";
import {MovieFinder} from "../../repository/MovieFinder";
import {PreviousPage} from "../PreviousPage";
import "../css/NowInCinemas.css"
import {Spinner} from "../Spinner";
import {NowInCinemasElement} from "./NowInCinemasElement";
import {GoUpArrow} from "../GoUpArrow";
import {GoBackBtn} from "../GoBackBtn";
import {BackArrow} from "./BackArrow";


export const NowInCinemasComponent = () => {
    const {obj, setUserData} = useContext(UserDataContext);
    const [foundData, setFoundData] = useState<NowInCinemasMovieEntity[]>()

    useEffect(() => {
        (async () => {
            const data = await MovieFinder.nowInCinemas() as NowInCinemasMovieEntity[]
            setFoundData(data)

        })()
    }, [])

    return (
        <div className={'fav'}>
            <h2>Teraz w kinach:</h2>
            <ul className={'moviesList'}>
                {!foundData ? <Spinner returnRoute={'/delay'}/> : foundData.map(el => (
                    <NowInCinemasElement favList={obj.favMovies} listOfData={[]} fullTitle={el.fullTitle}
                                         genres={el.genres} year={el.year} stars={el.stars}
                                         releaseState={el.releaseState} errorMessage={""} image={el.image}
                                         id={el.id} contentRating={el.contentRating} directors={el.directors}
                                         plot={el.plot} runtimeStr={el.runtimeStr} title={el.title}
                                         description={el.description} resultType={el.resultType}/>
                ))}
            </ul>
            )
            <GoUpArrow/>
            <BackArrow/>
            <PreviousPage/>
        </div>
    )
}