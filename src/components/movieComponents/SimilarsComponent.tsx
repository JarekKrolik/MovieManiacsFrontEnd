import React, {Dispatch, SetStateAction, useContext} from "react";
import {SingleMovieSpecific} from 'types'
import {UserDataContext} from "../../contexts/UserDataContext";

interface Props {
    offButton: Dispatch<SetStateAction<{
        fullCast: boolean;
        trailer: boolean;
        photos: boolean;
        posters: boolean;
        similars: boolean;
        wiki: boolean;
        others: boolean;
    }>>;
    foundData: SingleMovieSpecific,
    setSwitches: Dispatch<SetStateAction<{
        searchComponent: boolean;
        nowInCinemas: boolean;
        soonInCinemas: boolean;
        favourites: boolean;
        allDataComponent: boolean,
    }>>;
}

export const SimilarsComponent = (props: Props) => {
    const {foundData} = props
    const {setUserData, userData} = useContext(UserDataContext)
    const handleSeeMore = (e: any) => {
        window.scrollTo(0, 0)
        const id = e.target.id
        props.setSwitches({
            favourites: false,
            soonInCinemas: false,
            nowInCinemas: false,
            searchComponent: false,
            allDataComponent: true,

        })
        setUserData(({
            ...userData,
            selectedItem: {
                id: id,
                type: 'movie',
            }
        }))

    }

    return (foundData.similars ? <ul className={'similars picture actor'}>
        {foundData.similars.map(el => {
            return (<li key={el.id}>
                {el.image ?
                    <div className={'picture actor'}><img src={el.image} alt='zdjęcie aktora'/>
                    </div> : <div className={'picture'}><img
                        src={require('../../assets/img/vecteezy_icon-image-not-found-vector_.jpg')}
                        alt='zdjęcie aktora'/></div>}
                <div className="text actor similars">
                    {el.title ? <h2>{el.title}{}</h2> : null}
                    {el.imDbRating ? <h3>IMDb rating: <span>{el.imDbRating}</span></h3> : null}
                    <button onClick={handleSeeMore} id={el.id} className="seeMore">see more</button>
                    <button onClick={()=>{
                        props.offButton(prev=>({
                            ...prev,
                            similars:!prev.similars,
                        }))
                    }} className="return">hide similar movies</button>
                </div>
            </li>)
        })}
    </ul> : <p>No data in IMDb database</p>)
}

