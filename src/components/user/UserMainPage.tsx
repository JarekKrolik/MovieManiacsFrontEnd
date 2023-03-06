import React, {useContext, useEffect, useState} from "react";
import {UserEntity, MovieListEntity, FavouriteMoviesList,FavouriteActorsList} from 'types'
import {Link, useLocation} from "react-router-dom";
import {UserHeader} from "./UserHeader";
import {Spinner} from "../Spinner";
import {GoBackBtn} from "../GoBackBtn";
import {SearchComponent} from "./SearchComponent";
import {getUser} from "../../utils/getUser";
import {Navigate} from "react-router-dom";
import {UserDataContext} from "../../contexts/UserDataContext";
import {MovieFinder} from "../../repository/MovieFinder";
import {GoUpArrow} from "../GoUpArrow";

export const UserMainPage = () => {

    const {obj, setUserData} = useContext(UserDataContext)
    const [user, setUser] = useState<UserEntity>();
    const [returnData, setReturnData] = useState<MovieListEntity[]>()
    const [type, setType] = useState('')
    const location = useLocation();
    const[listOfFavMovies,setListOfFavMovies]=useState<FavouriteMoviesList[]>()
    const[listOfFavActors,setListOfFavActors]=useState<FavouriteActorsList[]>()

    useEffect(() => {
        if (location.state) {

            const {returnData, type} = location.state;
            setType(type)
            setReturnData(returnData)
        } else {
            setReturnData(undefined)
        }


    }, [])




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
                        favMovies:favList,
                        favActors:favActorsList,

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
            {user ? <UserHeader name={obj.name} avatar={obj.avatar} email={obj.email} date={obj.date} id={obj.id}/> :
                <Spinner returnRoute={'/'}/>}
            <SearchComponent type={type} returnData={returnData} favList={listOfFavMovies} favActorsList={listOfFavActors}/>
            <GoBackBtn text={'odśwież'} path={'/'}/>
        </>
    )
}


