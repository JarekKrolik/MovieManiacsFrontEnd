import React, {Dispatch, SetStateAction, useContext} from "react";
import {FavouriteIcon} from "../FavouriteIcon";
import {UserDataContext} from "../../contexts/UserDataContext";
import {NowInCinemasMovieEntity, FavouriteMoviesList} from 'types'

interface Props extends NowInCinemasMovieEntity {
    favList: FavouriteMoviesList[] | undefined;
    setSwitches: Dispatch<SetStateAction<{ searchComponent: boolean; nowInCinemas: boolean; soonInCinemas: boolean; favourites: boolean; allDataComponent: boolean, }>>,

}

export const NowInCinemasElement = (props: Props) => {
    const {setUserData} = useContext(UserDataContext)
    const handleSeeMore = (e: any) => {
        props.setSwitches({
            favourites: false,
            soonInCinemas: false,
            nowInCinemas: false,
            searchComponent: false,
            allDataComponent: true,

        })
        setUserData( ({
            ...userData,
            selectedItem: {
                id: e.target.id,
                type: 'movie',
            }
        }))

    }

    const {userData} = useContext(UserDataContext)
    const {favList} = props;
    const list = favList?.map(e => e.movie_id)

    return (
        <li className={'element in-cinema'} id={props.id}>
            <FavouriteIcon switchedOn={list ? list.includes(props.id) : false} id={props.id} user={userData.name}
                           type={'movie'} image={props.image} title={props.fullTitle}/>
            {props.fullTitle ? <h3>Title : <span>{props.fullTitle}</span></h3> : null}
            {props.releaseState ? <h3>Release date : <span>{props.releaseState}</span></h3> : null}
            {props.stars ? <h3>Stars : <span>{props.stars}</span></h3> : null}
            {props.directors ? <h3>Directors : <span>{props.directors}</span></h3> : null}
            <div className="picture">
                {props.image ? <img src={props.image} alt="poster from movie"/> :
                    <img src={require('../../assets/img/vecteezy_icon-image-not-found-vector_.jpg')}
                         alt="poster from movie"/>}
            </div>
            <button onClick={handleSeeMore} id={props.id} className="seeMore">see more</button>
        </li>


    )
}