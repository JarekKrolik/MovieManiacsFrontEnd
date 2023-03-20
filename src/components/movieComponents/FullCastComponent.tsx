import React, {Dispatch, SetStateAction, useContext} from "react";
import {SingleMovieSpecific} from 'types'
import {UserDataContext} from "../../contexts/UserDataContext";
import {Switches} from "../LoginComponent";
import {AllDataSwitches} from "./AllDataComponent";


interface Props {
    offButton: Dispatch<SetStateAction<AllDataSwitches>>;
    foundData:SingleMovieSpecific,
    setSwitches: Dispatch<SetStateAction<Switches>>;
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
            whatToWatch:false,

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
                    <div className={'picture actor'}><img src={el.image} alt='actor or actress'/>
                    </div> : <div className={'picture'}><img
                        src={require('../../assets/img/vecteezy_icon-image-not-found-vector_.jpg')}
                        alt='actor or actress'/></div>}
                <div className="text actor">
                    {el.name ? <h2>{el.name}</h2> : null}
                    {el.asCharacter ? <h3>As: <span>{el.asCharacter}</span></h3> : null}
                    <button onClick={handleSeeMore} id={el.id} className="goBack actor movie">see more</button>
                    <button onClick={()=>{
                        props.offButton(prev=>({
                            ...prev,
                            fullCast:!prev.fullCast,
                        }))
                    }} className="return">hide full cast</button>
                </div>
            </li>)
        })}
    </ul> : <p>No data in IMDb database</p>) : null)
}