import React, {Dispatch, SetStateAction, useContext} from "react";
import {MovieListEntity} from 'types'
import '../css/MovieListElement.css'
import {FavouriteIcon} from "../FavouriteIcon";
import {UserDataContext} from "../../contexts/UserDataContext";
import {FavouriteMoviesList} from 'types'
import {Switches} from "../LoginComponent";

interface Props extends MovieListEntity {
    setSwitches: Dispatch<SetStateAction<Switches>>;
    listOfData: MovieListEntity[];
    favList: FavouriteMoviesList[] | undefined;
}

export const MovieListElement = (props: Props) => {
    const {userData, setUserData} = useContext(UserDataContext)
    const {id, description, image, resultType, title, favList} = props;
    const list = favList?.map(e => e.movie_id)

    const handleSeeMore = () => {
        props.setSwitches({
            favourites: false,
            soonInCinemas: false,
            nowInCinemas: false,
            searchComponent: false,
            allDataComponent: true,
            whatToWatch:false,

        })
        setUserData(({
            ...userData,
            selectedItem: {
                id: id,
                type: 'movie',
            }
        }))

    }

    return (
        <li className={'element'} id={id}>
            <FavouriteIcon switchedOn={list ? list.includes(id) : false} id={id} user={userData.name} type={'movie'}
                           image={image} title={title}/>
            <h3>Title : <span>{title}</span></h3>

            <p>Description : <span>{description}</span></p>
            <p>{resultType}</p>
            <div className="picture">
                {image ? <img src={image} alt="plakat z filmu"/> :
                    <img src={require('../../assets/img/vecteezy_icon-image-not-found-vector_.jpg')}
                         alt=""/>}
            </div>
            <button onClick={handleSeeMore} className="seeMore">see more</button>

        </li>
    )
}