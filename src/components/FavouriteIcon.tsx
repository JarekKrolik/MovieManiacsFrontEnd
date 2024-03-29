import React, {useContext, useEffect, useState} from "react";
import '../components/css/FavouriteIcon.css';
import {MovieFinder} from "../repository/MovieFinder";
import {UserDataContext} from "../contexts/UserDataContext";


interface Props {
    id: string,
    user: string,
    type: string,
    title: string,
    switchedOn: boolean,
    image: string
}


export const FavouriteIcon = (props: Props) => {
    const [switchOn, setSwitch] = useState(false)
    const {userData, setUserData} = useContext(UserDataContext)

    useEffect(() => {
        setSwitch(props.switchedOn)
    }, [props.switchedOn])

    const handleIconClick = async () => {

        if (!switchOn) {
            if (props.type === 'movie') {
                setUserData(({
                    ...userData,
                    favMovies: [...userData.favMovies, {
                        user: '',
                        movie_id: props.id,
                        image: props.image,
                        name: props.title,
                    }]
                }))
            }
            if (props.type === 'actor') {
                setUserData(({
                    ...userData,
                    favActors: [...userData.favActors,
                        {
                            user: '',
                            actor_id: props.id,
                            image: props.image,
                            name: props.title,

                        }]
                }))
            }
            const res = await MovieFinder.addToFavouriteList(props.id, props.user, props.type, props.title, props.image)
            if (res.response === 'ok') {

                setSwitch(true)

            } else {
                return
            }
        }

        if (switchOn) {

            if (props.type === 'actor') {
                const newArr = userData.favActors.filter(e => e.actor_id !== props.id)
                setUserData(({
                    ...userData,
                    favActors: newArr,
                }))
            }

            if (props.type === 'movie') {
                const newArr = userData.favMovies.filter(e => e.movie_id !== props.id)
                setUserData(({
                    ...userData,
                    favMovies: newArr,
                }))
            }

            const res = await MovieFinder.removeFromFavouriteList(props.id, props.user, props.type);
            if (res.response === 'ok') {
                setSwitch(false)
            } else {
                return
            }
        }

    }
    return (
        <div onClick={handleIconClick} className={switchOn ? 'icon on' : 'icon'}>
            <img src={require("../assets/img/star-1915449_640.png")} alt=""/>
        </div>
    )
}