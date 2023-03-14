import React, {useContext} from "react";
import{SingleActorSpecific}from'types'
import {UserDataContext} from "../../contexts/UserDataContext";
import {FavouriteIcon} from "../FavouriteIcon";

interface Props{
    foundData:SingleActorSpecific,
}

export const BasicActorInfo = (props:Props)=>{
    const{foundData}=props
    const {userData} = useContext(UserDataContext)
    const favList = userData.favActors
    const list = favList?.map(e => e.actor_id)


    return(
        <div className="basicInfo actor">
            <FavouriteIcon id={foundData.id} user={userData.name} type={'actor'} title={foundData.name} switchedOn={list?list.includes(foundData.id):false} image={foundData.image}/>
            <div className="text actor">
                {foundData.name ? <h2>{foundData.name}</h2> : null}
                {foundData.birthDate ? <h3>Data urodzenia : <span>{foundData.birthDate}</span></h3> : null}
                {foundData.deathDate ? <h3>Data śmierci : <span>{foundData.deathDate}</span></h3> : null}
                {foundData.height ? <h3>Wzrost : <span>{foundData.height}</span></h3> : null}
                {foundData.awards ? <h3>Nagrody : <span>{foundData.awards}</span></h3> : null}
                {foundData.summary ? <h3>Opis : <span>{foundData.summary}</span></h3> : null}

            </div>
            <div className="picture actor">
                <img src={foundData.image} alt="zdjęcie aktora lub aktorki"/>
            </div>
        </div>
    )
}