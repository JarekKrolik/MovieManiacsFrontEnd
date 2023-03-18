import React, {Dispatch, SetStateAction, useContext} from "react";
import {SingleActorSpecific} from 'types'
import '../css/MostKnownFor.css'
import {FavouriteIcon} from "../FavouriteIcon";
import {UserDataContext} from "../../contexts/UserDataContext";
import {Switches} from "../LoginComponent";

interface Props {
    offButton: Dispatch<SetStateAction<{
        starredIn: boolean,
        mostKnownFor: boolean,
    }>>,
    foundData: SingleActorSpecific,
    setSwitches: Dispatch<SetStateAction<Switches>>;
}

export const MostKnownFor = (props: Props) => {
    const {userData, setUserData} = useContext(UserDataContext)
    const {foundData} = props
    const favList = userData.favMovies
    const list = favList?.map(e => e.movie_id)

    const handleSeeMore = (e: any) => {

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
                id: e.target.id,
                type: 'movie',
            }
        }))

    }

    return (
        <div className="starredIn most-known-for">
            <ul>{foundData.knownFor.map(el => {
                return (<li key={el.id} className={'element'} id={el.id}>
                    <FavouriteIcon switchedOn={list ? list.includes(el.id) : false} id={el.id} user={userData.name}
                                   type={'movie'} image={el.image} title={el.fullTitle}/>
                    <h3>Title : <span>{el.fullTitle}</span></h3>

                    <p>Year : <span>{el.year}</span></p>
                    <p>Starred as : <span>{el.role}</span></p>
                    <div className="picture">
                        {el.image ? <img src={el.image} alt="movie poster"/> :
                            <img src={require('../../assets/img/vecteezy_icon-image-not-found-vector_.jpg')}
                                 alt="symbol braku zdjęcia"/>}
                    </div>

                    <button id={el.id} onClick={handleSeeMore} className="seeMore">see more</button>

                </li>)
            })}
            </ul>
            <button onClick={() => {
                props.offButton(prev => ({
                    ...prev,
                    mostKnownFor: !prev.mostKnownFor,
                }))
            }} className="return">hide known for
            </button>
        </div>
    )
}