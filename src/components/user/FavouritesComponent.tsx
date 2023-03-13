import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import {FavouriteMoviesList, FavouriteActorsList} from 'types'
import "../css/Favourites.css"
import {UserDataContext} from "../../contexts/UserDataContext";
import {GoUpArrow} from "../GoUpArrow";

interface Props {
    setSwitches: Dispatch<SetStateAction<{ searchComponent: boolean; nowInCinemas: boolean; soonInCinemas: boolean; favourites: boolean; allDataComponent: boolean, }>>;

}

export const FavouritesComponent = (props: Props) => {
    const {setSwitches} = props
    const {obj, setUserData} = useContext(UserDataContext)
    const [favMovies, setFavMovies] = useState<FavouriteMoviesList[]>()
    const [favActors, setFavActors] = useState<FavouriteActorsList[]>()
    const [favVisible, setFavVisible] = useState({
        favMovies: true,
        favActors: false,
    })

    const handleSeeMore = (e: any) => {
        setSwitches({
            favourites: false,
            soonInCinemas: false,
            nowInCinemas: false,
            searchComponent: false,
            allDataComponent: true,

        })
        setUserData((prev: any) => ({
            ...prev,
            selectedItem: {
                id: e.target.id,
                type: e.target.datatype,
            }
        }))

    }

    useEffect(() => {
        setFavMovies(obj.favMovies)

    }, [obj])
    useEffect(() => {
        setFavActors(obj.favActors)

    }, [obj])

    return (
        <div className="favourites">
            <button onClick={() => {
                setFavVisible(prev => ({
                    ...prev,
                    favMovies: !prev.favMovies,
                }))
            }} className="goBack">{favVisible.favMovies ? 'hide movies' : 'movies'}</button>
            {favVisible.favMovies ?
                <div className="movies">
                    <h2>Your favourite movies list:</h2>
                    {favMovies ? <ul>
                        {favMovies.length > 0 ?
                            favMovies.map(el => {
                                return (
                                    <li key={el.movie_id}>
                                        <div className={'text'}>
                                            <h3>{el.name}</h3>
                                            <button className={'favBtn'} onClick={handleSeeMore} datatype={'movie'}
                                                    id={el.movie_id}>see more
                                            </button>
                                        </div>
                                        <div className="fav-picture">
                                            <img src={el.image} alt=""/>
                                        </div>

                                    </li>
                                )
                            }) : <h3>no favourites on your list...</h3>}
                    </ul> : <h3>no favourites on your list...</h3>}
                </div> : null}

            <button onClick={() => {
                setFavVisible(prev => ({
                    ...prev,
                    favActors: !prev.favActors,
                }))
            }} className="goBack">{favVisible.favActors ? 'hide actresses/actors' : 'actresses/actors'}</button>
            {favVisible.favActors ?
                <div className="actors movies">
                    <h2>Your favourite actors list:</h2>
                    {favActors ? <ul>
                        {favActors.length > 0 ?
                            favActors.map(el => {
                                return (
                                    <li key={el.actor_id}>

                                        <div>
                                            <h3>{el.name}</h3>
                                            <button onClick={handleSeeMore} datatype={'actor'} id={el.actor_id}>more
                                            </button>
                                        </div>

                                        <div className="fav-picture">
                                            <img src={el.image} alt=""/>
                                        </div>

                                    </li>
                                )
                            }) : <h3>no favourites on your list...</h3>}
                    </ul> : <h3>no favourites on your list...</h3>}
                </div> : null}

            <GoUpArrow/>

        </div>
    )
}