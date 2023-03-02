import React from "react";
import {SingleMovieSpecific,MovieListEntity,ActorsListEntity} from 'types'
import {Link} from "react-router-dom";

interface Props {
    foundData:SingleMovieSpecific,
    listOfData:MovieListEntity[],
}

export const FullCastComponent = (props:Props)=>{
    const{foundData,listOfData}=props

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
                    <Link className={'goBack actor'} state={{id: el.id, listOfData: listOfData}}
                          to={'/allDataActor'}>zobacz więcej</Link>
                </div>
            </li>)
        })}
    </ul> : <p>Brak danych w bazie IMDb</p>) : null)
}