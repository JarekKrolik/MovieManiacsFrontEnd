import React, {Dispatch, SetStateAction, useContext} from "react";
import {SingleActorSpecific} from 'types'
import '../css/MostKnownFor.css'
import {FavouriteIcon} from "../FavouriteIcon";
import {UserDataContext} from "../../contexts/UserDataContext";
import {UserData}from 'types'


interface Props {
    foundData: SingleActorSpecific,
    setSwitches: Dispatch<SetStateAction<{ searchComponent: boolean; nowInCinemas: boolean; soonInCinemas: boolean; favourites: boolean;allDataComponent:boolean, }>>;
}

export const MostKnownFor = (props: Props) => {
    const {userData,setUserData} = useContext(UserDataContext)
    const {foundData} = props
    const favList = userData.favMovies
    const list = favList?.map(e => e.movie_id)

    const handleSeeMore = (e:any)=>{

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
                id:e.target.id,
                type:'movie',
            }
        }))

    }

    return (
        <div className="starredIn most-known-for">
            <ul>{foundData.knownFor.map(el => {
                return (<li key={el.id} className={'element'} id={el.id}>
                    <FavouriteIcon switchedOn={list ? list.includes(el.id) : false} id={el.id} user={userData.name}
                                   type={'movie'} image={el.image} title={el.fullTitle}/>
                    <h3>Tytuł : <span>{el.fullTitle}</span></h3>

                    <p>Rok : <span>{el.year}</span></p>
                    <p>Rola : <span>{el.role}</span></p>
                    <div className="picture">
                        {el.image ? <img src={el.image} alt="plakat z filmu"/> :
                            <img src={require('../../assets/img/vecteezy_icon-image-not-found-vector_.jpg')}
                                 alt="symbol braku zdjęcia"/>}
                    </div>

                    <button id={el.id} onClick={handleSeeMore} className="seeMore">zobacz więcej</button>

                </li>)
            })}


            </ul>

        </div>
    )
}