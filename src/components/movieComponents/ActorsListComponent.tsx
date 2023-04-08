import React, {Dispatch, SetStateAction, useContext} from "react";
import '../css/MovieListElement.css';
import {ActorsListEntity, FavouriteActorsList} from 'types';
import {UserDataContext} from "../../contexts/UserDataContext";
import {FavouriteIcon} from "../FavouriteIcon";
import {Switches} from "../LoginComponent";

interface Props extends ActorsListEntity {
    listOfData: ActorsListEntity[],
    favList: FavouriteActorsList[] | undefined,
    setSwitches: Dispatch<SetStateAction<Switches>>,
}

export const ActorsListComponent = (props: Props) => {
    const {userData, setUserData} = useContext(UserDataContext)
    const {id, description, image, title, favList} = props
    const list = favList?.map(e => e.actor_id)

    const handleSeeMore = () => {
        props.setSwitches({
            favourites: false,
            soonInCinemas: false,
            nowInCinemas: false,
            searchComponent: false,
            allDataComponent: true,
            whatToWatch: false,

        })
        setUserData(({
            ...userData,
            selectedItem: {
                id: id,
                type: 'actor',
            }
        }))

    }


    return (<li className={'element'} id={id}>
        <FavouriteIcon image={image} switchedOn={list ? list.includes(id) : false} id={id} user={userData.name}
                       type={'actor'} title={title}/>
        <h3>Name : <span>{title}</span></h3>
        <p>short description : <span>{description}</span></p>
        <div className="picture">
            {image ? (<img src={image} alt="actor"/>) : (
                <img src={require('../../assets/img/vecteezy_icon-image-not-found-vector_.jpg')}
                     alt="actor"/>)}
        </div>
        <button onClick={handleSeeMore} className="seeMore">see more</button>
    </li>)
}