import React, {Dispatch, SetStateAction, useContext} from "react";
import {SingleMovieSpecific} from 'types'
import {UserDataContext} from "../../contexts/UserDataContext";


interface Props {
    foundData:SingleMovieSpecific,
    setSwitches: Dispatch<SetStateAction<{ searchComponent: boolean; nowInCinemas: boolean; soonInCinemas: boolean; favourites: boolean;allDataComponent:boolean, }>>;
}

export const FullCastComponent = (props:Props)=>{
const{setUserData,userData}=useContext(UserDataContext)
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
                type:'actor',
            }
        }))

    }
    const{foundData}=props

    return (foundData.fullCast ? (foundData.fullCast.actors ? <ul className={'cast'}>
        {foundData.fullCast.actors.map(el => {
            return (<li key={el.id}>
                {el.image ?
                    <div className={'picture actor'}><img src={el.image} alt='zdjęcie aktora'/>
                    </div> : <div className={'picture'}><img
                        src={require('../../assets/img/vecteezy_icon-image-not-found-vector_.jpg')}
                        alt='zdjęcie aktora'/></div>}
                <div className="text actor">
                    {el.name ? <h2>{el.name}</h2> : null}
                    {el.asCharacter ? <h3>Jako: <span>{el.asCharacter}</span></h3> : null}
                    <button onClick={handleSeeMore} id={el.id} className="goBack actor movie">zobacz więcej</button>
                </div>
            </li>)
        })}
    </ul> : <p>Brak danych w bazie IMDb</p>) : null)
}