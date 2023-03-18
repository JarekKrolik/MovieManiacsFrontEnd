import React, {useContext, useEffect, useState} from "react";
import {UserEntity, MovieListEntity, FavouriteMoviesList, FavouriteActorsList} from 'types'
import {UserHeader} from "./UserHeader";
import {Spinner} from "../Spinner";
import {SearchComponent} from "./SearchComponent";
import {getUser} from "../../utils/getUser";
import {Navigate} from "react-router-dom";
import {UserDataContext} from "../../contexts/UserDataContext";
import {MovieFinder} from "../../repository/MovieFinder";
import {ComingSoonMovies} from "../movieComponents/ComingSoonMovies";
import {NowInCinemasComponent} from "../movieComponents/NowInCinemasComponent";
import {FavouritesComponent} from "./FavouritesComponent";
import {AllDataComponent} from "../movieComponents/AllDataComponent";
import {AllDataComponentActor} from "../movieComponents/AllDataComponentActor";
import {WhatToWatchComponent} from "../movieComponents/WhatToWatchComponent";


export const UserMainPage = () => {

    const {userData, setUserData} = useContext(UserDataContext)
    const [user, setUser] = useState<UserEntity>();
    // const [returnData] = useState<MovieListEntity[]>()
    const [type] = useState('')
    const [listOfFavMovies, setListOfFavMovies] = useState<FavouriteMoviesList[]>()
    const [listOfFavActors, setListOfFavActors] = useState<FavouriteActorsList[]>()
    const [switches, setSwitches] = useState({
        searchComponent: true,
        nowInCinemas: false,
        soonInCinemas: false,
        favourites: false,
        allDataComponent: false,
        whatToWatch:false
    })



    useEffect(() => {
        if (!userData.name) {

            (async () => {

                try {
                    const data = await getUser(userData.id) as UserEntity[]
                    const favList = await MovieFinder.getFavouritesMoviesList(data[0].name) as unknown as FavouriteMoviesList[]
                    const favActorsList = await MovieFinder.getFavouritesActorsList((data[0].name)) as unknown as FavouriteActorsList[]
                    const downloadedUser = data[0] as UserEntity
                    setUser(downloadedUser);
                    setUserData({
                        ...userData,
                        name: downloadedUser.name,
                        avatar: downloadedUser.avatar,
                        date: downloadedUser.date,
                        email: downloadedUser.email,
                        favMovies: favList,
                        favActors: favActorsList,
                        searchList: [],
                        selectedItem: {
                            id: '',
                            type: '',
                        }

                    })
                    setListOfFavMovies(favList)
                    setListOfFavActors(favActorsList)


                } catch (e) {
                    console.log(e)
                }

            })()
        } else setUser({
            name: userData.name,
            email: userData.email,
            avatar: userData.avatar,
            date: userData.date,
            isverified: true,
            id: userData.id,
            passwordhash: '',

        });

    }, [setUserData,userData]);

    return (
        <>
            {userData.id ? null : <Navigate to={'/'}/>}
            {user ? <UserHeader setSwitches={setSwitches} name={userData.name} avatar={userData.avatar} email={userData.email}
                                date={userData.date} id={userData.id}/> :
                <Spinner returnRoute={'/'}/>}
            {switches.searchComponent ?
                <SearchComponent setSwitches={setSwitches} type={type}  favList={listOfFavMovies}
                                 favActorsList={listOfFavActors}/> : null}
            {switches.nowInCinemas ? <NowInCinemasComponent setSwitches={setSwitches}/> : null}
            {switches.soonInCinemas ? <ComingSoonMovies setSwitches={setSwitches}/> : null}
            {switches.favourites ? <FavouritesComponent setSwitches={setSwitches}/> : null}
            {switches.whatToWatch?<WhatToWatchComponent setSwitches={setSwitches}/>:null}
            {switches.allDataComponent ?
                userData.selectedItem.type === 'movie' ?
                    <AllDataComponent id={userData.selectedItem.id} type={userData.selectedItem.type}
                                      setSwitches={setSwitches}/> :
                    <AllDataComponentActor setSwitches={setSwitches} id={userData.selectedItem.id}
                                           type={userData.selectedItem.type}/> : null}
        </>
    )
}


