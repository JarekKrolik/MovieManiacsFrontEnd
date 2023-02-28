import React, {useContext, useEffect, useState} from "react";
import '../components/css/FavouriteIcon.css'
import {MovieFinder} from "../repository/MovieFinder";
import {UserDataContext} from "../contexts/UserDataContext";

interface Props {
    id: string,
    user: string,
    type: string,
    title: string,
    switchedOn: boolean,
}


export const FavouriteIcon = (props: Props) => {
    const [switchOn, setSwitch] = useState(false)
    const {obj, setUserData} = useContext(UserDataContext)

    useEffect(() => {
        setSwitch(props.switchedOn)
    }, [])

    const handleIconClick = async () => {


        if (!switchOn) {
            setSwitch(true)
            setUserData((prev: any) => ({
                ...prev,
                favMovies: [...prev.favMovies, {user: '', movie_id: props.id}]
            }));
            await MovieFinder.addToFavouriteList(props.id, props.user, props.type, props.title);


        }
        if (switchOn) {
            setSwitch(false)
            const newArr = obj.favMovies.filter(e => e.movie_id !== props.id)
            setUserData((prev: any) => ({
                ...prev,
                favMovies: newArr,
            }));
             await MovieFinder.removeFromFavouriteList(props.id, props.user, props.type)

        }


    }

    return (
        <div onClick={handleIconClick} className={switchOn ? 'icon on' : 'icon'}>


            <img src={require("../assets/img/star-1915449_640.png")} alt=""/>

        </div>
    )
}