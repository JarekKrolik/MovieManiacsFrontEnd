import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import {SingleMovieSpecific} from 'types';
import {UserDataContext} from "../../contexts/UserDataContext";
import {Switches} from "../LoginComponent";
import {AllDataSwitches} from "./AllDataComponent";


interface Props {
    offButton: Dispatch<SetStateAction<AllDataSwitches>>,
    foundData: SingleMovieSpecific,
    setSwitches: Dispatch<SetStateAction<Switches>>,
}

interface Cast {

    asCharacter: string,
    id: string,
    image: string,
    name: string,

}

export const FullCastComponent = (props: Props) => {
    const {setUserData, userData} = useContext(UserDataContext)
    const [numberOfShownCast, setNumberOfShownCast] = useState(10)
    const [listOfCast, setListOfCast] = useState<Cast[]>()
    const handleShowMoreCast = () => {
        setNumberOfShownCast(prev => prev + 5)
    }
    const handleSeeMore = (e: any) => {

        props.setSwitches({
            favourites: false,
            soonInCinemas: false,
            nowInCinemas: false,
            searchComponent: false,
            allDataComponent: true,
            whatToWatch: false,

        })
        setUserData(({
            ...userData,
            selectedItem: {
                id: e.target.id,
                type: 'actor',
            }
        }))

    }
    const {foundData} = props
    useEffect(() => {
        const temporaryCastArr = foundData.fullCast.actors.slice(0, numberOfShownCast)
        setListOfCast(temporaryCastArr)


    }, [numberOfShownCast])
    return (foundData.fullCast ? (foundData.fullCast.actors ? <ul className={'cast'}>
        {listOfCast?.map(el => {
            return (<li key={el.id}>
                {el.image ?
                    <div className={'picture actor'}><img src={el.image} alt='actor or actress'/>
                    </div> : <div className={'picture'}><img
                        src={require('../../assets/img/vecteezy_icon-image-not-found-vector_.jpg')}
                        alt='actor or actress'/></div>}
                <div className="text actor">
                    {el.name ? <h2>{el.name}</h2> : null}
                    {el.asCharacter ? <h3>As: <span>{el.asCharacter}</span></h3> : null}
                    <button onClick={handleSeeMore} id={el.id} className="goBack actor movie">see more</button>
                    <button onClick={() => {
                        props.offButton(prev => ({
                            ...prev,
                            fullCast: !prev.fullCast,
                        }))
                    }} className="return">hide full cast
                    </button>
                </div>
            </li>)
        })}
        {foundData.fullCast.actors.length === listOfCast?.length ? null :
            <button className="seeMore cast" onClick={handleShowMoreCast}>more cast members</button>}
    </ul> : <p>No data in IMDb database</p>) : <p>sorry, no data...</p>)
}