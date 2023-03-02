import React from "react";
import {SingleMovieSpecific}from 'types'

interface Props {
    foundData:SingleMovieSpecific,
}
export const SimilarsComponent = (props:Props)=>{
const{foundData}=props


    return (foundData.similars ?  <ul className={'similars picture actor'}>
        {foundData.similars.map(el => {
            return (<li key={el.id}>
                {el.image ?
                    <div className={'picture actor'}><img src={el.image} alt='zdjęcie aktora'/>
                    </div> : <div className={'picture'}><img
                        src={require('../../assets/img/vecteezy_icon-image-not-found-vector_.jpg')}
                        alt='zdjęcie aktora'/></div>}
                <div className="text actor similars">
                    {el.title ? <h2>{el.title}{}</h2> : null}
                    {el.imDbRating ? <h3>Ocena IMDb: <span>{el.imDbRating}</span></h3> : null}
                </div>
            </li>)
        })}
    </ul> : <p>Brak danych w bazie IMDb</p>)
}

