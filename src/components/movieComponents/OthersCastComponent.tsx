import React, {Dispatch, SetStateAction, useContext, useState} from "react";
import {SingleMovieSpecific} from 'types';
import '../css/OthersCastComponents.css'
import {UserDataContext} from "../../contexts/UserDataContext";
import {Switches} from "../LoginComponent";


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
    setSwitches: Dispatch<SetStateAction<Switches>>;
}

export const OthersCastComponent = (props: Props) => {
    const {setUserData, userData} = useContext(UserDataContext)
    const {foundData} = props
    const [listOfOthers, setListOfOthers] = useState(foundData.fullCast.others)
    const handleInputFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        setListOfOthers(foundData.fullCast.others.filter(el => el.job.toUpperCase().includes(e.target.value.toUpperCase())))
    }

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
                type: 'actor',
            }
        }))

    }

    return (
        <div className="others">

            <form className={'register actor'}>
                <label>search by job : <input onChange={handleInputFilter} type="text"/></label>
            </form>
            {listOfOthers ? <ul>{listOfOthers.map(el => {
                return (
                    <li key={Math.floor(Math.random()*1000)+el.job}>
                        <h2>{el.job}</h2>
                        <div>{el.items.map(el => {
                            return (<div>
                                <h3>{el.description}</h3>
                                <h4>{el.name}</h4>
                                <button id={el.id} onClick={handleSeeMore} className={'others btn'}>see more</button>
                            </div>)
                        })}</div>
                    </li>
                )
            })}</ul> : <h2>Sorry no data...</h2>}
            <button onClick={() => {
                props.offButton(prev => ({
                    ...prev,
                    others: !prev.others,
                }))
            }} className="return">hide others cast
            </button>
        </div>
    )
}