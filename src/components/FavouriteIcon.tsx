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
    image: string
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
            if (props.type === 'movie') {
                setUserData((prev: any) => ({
                    ...prev,
                    favMovies: [...prev.favMovies, {
                        user: '',
                        movie_id: props.id,
                        image: props.image,
                        name: props.title,
                    }]
                }));
            }
            if (props.type === 'actor') {
                setUserData((prev: any) => ({
                    ...prev,
                    favActors: [...prev.favActors,
                        {
                            user: '',
                            actor_id: props.id,
                            image: props.image,
                            name:props.title,

                        }]
                }));
            }
        }
        await MovieFinder.addToFavouriteList(props.id, props.user, props.type, props.title, props.image);

        if (switchOn) {

                setSwitch(false)
            if(props.type==='actor'){
                const newArr = obj.favActors.filter(e => e.actor_id !== props.id)
                setUserData((prev: any) => ({
                    ...prev,
                    favActors: newArr,
                }))}
                await MovieFinder.removeFromFavouriteList(props.id, props.user, props.type)

        }


    }

    return (
        <div onClick={handleIconClick} className={switchOn ? 'icon on' : 'icon'}>


            <img src={require("../assets/img/star-1915449_640.png")} alt=""/>

        </div>
    )
}