import React, {useContext} from "react";
import {SingleMovieSpecific} from 'types'
import {UserDataContext} from "../../contexts/UserDataContext";
import {FavouriteIcon} from "../FavouriteIcon";

interface Props {
    foundData: SingleMovieSpecific | undefined
}

export const BasicMovieInfo = (props: Props) => {
    const {userData} = useContext(UserDataContext)
    const favList = userData.favMovies
    const list = favList?.map(e => e.movie_id)
    const {foundData} = props
    return (
        foundData ?
            <div className={'basicInfo'} style={{
                backgroundImage: `url(${foundData.image})`
            }}>
                <div className="shade"></div>
                <FavouriteIcon id={foundData.id} user={userData.name} type={'movie'} title={foundData.fullTitle} switchedOn={list?list.includes(foundData.id):false} image={foundData.image}/>
                {foundData.fullTitle ? <h2>Title : <span>{foundData.fullTitle}</span></h2> :
                    <h2>No data in IMDb...</h2>}
                {foundData.year ? <h3>Year : <span>{foundData.year}</span></h3> : null}
                {foundData.genres ? <h3>Genre : <span>{foundData.genres}</span></h3> : null}
                {foundData.contentRating ? <h3>Rating : <span>{foundData.contentRating}</span></h3> : null}
                {foundData.companies ?
                    <h3>Production companies : <span>{foundData.companies}</span> - <span>{foundData.countries}</span>
                    </h3> : null}
                {foundData.releaseDate ?
                    <h3>Release date : <span>{foundData.releaseDate}</span></h3> : null}
                {foundData.writers ? <h3>Writers : <span>{foundData.writers}</span></h3> : null}
                {foundData.directors ? <h3>Directors : <span>{foundData.directors}</span></h3> : null}
                {foundData.awards ? <h3>Awards and nominations : <span>{foundData.awards}</span></h3> : null}
                {foundData.stars ? <h3>Stars : <span>{foundData.stars}</span></h3> : null}
                {foundData.runtimeStr ? <h3>Runtime : <span>{foundData.runtimeStr}</span></h3> : null}
                {foundData.boxOffice ? <div> {foundData.boxOffice.budget ?
                    <h3>Budget : <span>{foundData.boxOffice.budget}</span></h3> : null}
                    {foundData.boxOffice.cumulativeWorldwideGross ?
                        <h3>Worldwide gross : <span>{foundData.boxOffice.cumulativeWorldwideGross}</span>
                        </h3> : null}</div> : null}

                {foundData.plot ? <h3>Plot : <span>{foundData.plot}</span></h3> : null}
                {foundData.ratings ? <h3>Ratings:
                    <div>{foundData.ratings.imDb ? <h3>ImDb: {foundData.ratings.imDb}</h3> : null}
                        {foundData.ratings.filmAffinity ?
                            <h3>filmAffinity: {foundData.ratings.filmAffinity}</h3> : null}
                        {foundData.ratings.metacritic ?
                            <h3>Metacritic: {foundData.ratings.metacritic}</h3> : null}
                        {foundData.ratings.rottenTomatoes ?
                            <h3>rottenTomatoes: {foundData.ratings.rottenTomatoes}</h3> : null}
                        {foundData.ratings.theMovieDb ?
                            <h3>theMovieDb: {foundData.ratings.theMovieDb}</h3> : null}</div>
                </h3> : null}

            </div> : null
    )
}