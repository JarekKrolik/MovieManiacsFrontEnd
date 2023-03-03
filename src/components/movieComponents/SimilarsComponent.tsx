import React from "react";
import {SingleMovieSpecific,MovieListEntity}from 'types'
import {Link} from "react-router-dom";

interface Props {
    foundData:SingleMovieSpecific,
    listOfData:MovieListEntity[]
}
export const SimilarsComponent = (props:Props)=>{
const{foundData,listOfData}=props


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
                    <Link  to={'/allData'} state={{id:el.id,listOfData:listOfData,type:'movie'}} className={'seeMore'}>zobacz więcej</Link>
                </div>
            </li>)
        })}
    </ul> : <p>Brak danych w bazie IMDb</p>)
}

