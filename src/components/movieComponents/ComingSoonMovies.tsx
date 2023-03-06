import React, {useContext, useEffect, useState} from "react";
import {NowInCinemasMovieEntity} from 'types'
import {UserDataContext} from "../../contexts/UserDataContext";
import {MovieFinder} from "../../repository/MovieFinder";
import {PreviousPage} from "../PreviousPage";
import "../css/NowInCinemas.css"
import {Spinner} from "../Spinner";
import {NowInCinemasElement} from "./NowInCinemasElement";
import {BackArrow} from "./BackArrow";
import {GoUpArrow} from "../GoUpArrow";


export const ComingSoonMovies = () => {
    const {obj} = useContext(UserDataContext);
    const [foundData, setFoundData] = useState<NowInCinemasMovieEntity[]>()

    useEffect(() => {
        (async () => {
            const data = await MovieFinder.getComingSoonMovies() as NowInCinemasMovieEntity[]
            setFoundData(data)

        })()
    }, [])

    return (
        <div className={'fav'}>
            <h2>Wkrótce w kinach :</h2>
            <ul className={'moviesList'}>
                {!foundData ? <Spinner returnRoute={'/delay'}/> : foundData.map(el => (
                    <NowInCinemasElement key={el.id} favList={obj.favMovies} listOfData={[]} fullTitle={el.fullTitle}
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