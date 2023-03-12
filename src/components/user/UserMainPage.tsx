import React, {useContext, useEffect, useState} from "react";
import {UserEntity, MovieListEntity, FavouriteMoviesList, FavouriteActorsList} from 'types'
import {useLocation} from "react-router-dom";
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
import {MoviesListComponent} from "../movieComponents/MoviesListComponent";
import {AllDataComponent} from "../movieComponents/AllDataComponent";
import {AllDataComponentActor} from "../movieComponents/AllDataComponentActor";


export const UserMainPage = () => {

    const {obj, setUserData} = useContext(UserDataContext)
    const [user, setUser] = useState<UserEntity>();
    const [returnData, setReturnData] = useState<MovieListEntity[]>()
    const [type, setType] = useState('')
    const location = useLocation();
    const [listOfFavMovies, setListOfFavMovies] = useState<FavouriteMoviesList[]>()
    const [listOfFavActors, setListOfFavActors] = useState<FavouriteActorsList[]>()
    const [switches, setSwitches] = useState({
        searchComponent: true,
        nowInCinemas: false,
        soonInCinemas: false,
        favourites: false,
        allDataComponent: false,
    })

    // useEffect(() => {
    //     if (location.state) {
    //
    //         const {returnData, type} = location.state;
    //         setType(type)
    //         setReturnData(returnData)
    //     } else {
    //         setReturnData(undefined)
    //     }
    //
    //
    // }, [])

    useEffect(() => {
        if (!obj.name) {

            (async () => {

                try {
                    const data = await getUser(obj.id) as UserEntity[]
                    const favList = await MovieFinder.getFavouritesMoviesList(data[0].name) as unknown as FavouriteMoviesList[]
                    const favActorsList = await MovieFinder.getFavouritesActorsList((data[0].name)) as unknown as FavouriteActorsList[]
                    const downloadedUser = data[0] as UserEntity
                    setUser(downloadedUser);
                    setUserData({
                        ...obj,
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
            name: obj.name,
            email: obj.email,
            avatar: obj.avatar,
            date: obj.date,
            isverified: true,
            id: obj.id,
            passwordhash: '',

        });

    }, []);

    return (
        <>
            {obj.id ? null : <Navigate to={'/'}/>}
            {user ? <UserHeader setSwitches={setSwitches} name={obj.name} avatar={obj.avatar} email={obj.email}
                                date={obj.date} id={obj.id}/> :
                <Spinner returnRoute={'/'}/>}
            {switches.searchComponent ?
                <SearchComponent setSwitches={setSwitches} type={type} returnData={returnData} favList={listOfFavMovies}
                                 favActorsList={listOfFavActors}/> : null}
            {switches.nowInCinemas ? <NowInCinemasComponent setSwitches={setSwitches}/> : null}
            {switches.soonInCinemas ? <ComingSoonMovies setSwitches={setSwitches}/> : null}
            {switches.favourites ? <FavouritesComponent setSwitches={setSwitches}/> : null}
            {switches.allDataComponent ?
                obj.selectedItem.type === 'movie' ?
                    <AllDataComponent id={obj.selectedItem.id} type={obj.selectedItem.type}
                                      setSwitches={setSwitches}/> :
                    <AllDataComponentActor setSwitches={setSwitches} id={obj.selectedItem.id}
                                           type={obj.selectedItem.type}/> : null}
        </>
    )
}


