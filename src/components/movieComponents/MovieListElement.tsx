import React, {Dispatch, SetStateAction, useContext} from "react";
import {MovieListEntity} from 'types'
import '../css/MovieListElement.css'
import {FavouriteIcon} from "../FavouriteIcon";
import {UserDataContext} from "../../contexts/UserDataContext";
import {FavouriteMoviesList} from 'types'

interface Props extends MovieListEntity {
    setSwitches: Dispatch<SetStateAction<{ searchComponent: boolean; nowInCinemas: boolean; soonInCinemas: boolean; favourites: boolean;allDataComponent:boolean, }>>;
    listOfData: MovieListEntity[];
    favList: FavouriteMoviesList[] | undefined;
}

export const MovieListElement = (props: Props) => {
    const {userData,setUserData} = useContext(UserDataContext)
    const {id, description, image, resultType, title, favList} = props;

    const list = favList?.map(e => e.movie_id)

    const handleSeeMore = ()=>{
        props.setSwitches({
            favourites:false,
            soonInCinemas:false,
            nowInCinemas:false,
            searchComponent:false,
            allDataComponent:true,

        })
        setUserData(({
            ...userData,
            selectedItem:{
                id:id,
                type:'movie',
            }
        }))

    }


    return (
        <li className={'element'} id={id}>
            <FavouriteIcon switchedOn={list ? list.includes(id) : false} id={id} user={userData.name} type={'movie'}
                           image={image} title={title}/>
            <h3>Tytuł : <span>{title}</span></h3>

            <p>Krótki opis : <span>{description}</span></p>
            <p>{resultType}</p>
            <div className="picture">
                {image ? <img src={image} alt="plakat z filmu"/> :
                    <img src={require('../../assets/img/vecteezy_icon-image-not-found-vector_.jpg')}
                         alt="symbol braku zdjęcia"/>}
            </div>
            <button onClick={handleSeeMore} className="seeMore">zobacz więcej</button>

        </li>


    )
}