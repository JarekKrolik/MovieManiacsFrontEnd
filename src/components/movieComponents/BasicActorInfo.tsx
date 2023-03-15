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
                {foundData.birthDate ? <h3>Birth date : <span>{foundData.birthDate}</span></h3> : null}
                {foundData.deathDate ? <h3>Death date : <span>{foundData.deathDate}</span></h3> : null}
                {foundData.height ? <h3>Height : <span>{foundData.height}</span></h3> : null}
                {foundData.awards ? <h3>Awards : <span>{foundData.awards}</span></h3> : null}
                {foundData.summary ? <h3>Summary : <span>{foundData.summary}</span></h3> : null}

            </div>
            <div className="picture actor">
                <img src={foundData.image} alt="actor or actress"/>
            </div>
        </div>
    )
}