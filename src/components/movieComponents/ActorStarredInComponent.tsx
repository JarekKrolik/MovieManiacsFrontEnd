import React, {Dispatch, SetStateAction, useContext} from "react";
import{SingleActorSpecific}from'types'
import {UserDataContext} from "../../contexts/UserDataContext";
import {Switches} from "../LoginComponent";

interface StarredIn {
    id:string,
    year:string,
    title:string,
    role:string,
    description:string,
}

interface Props{
    offButton:Dispatch<SetStateAction<{
        starredIn: boolean,
        mostKnownFor: boolean,
    }>>,

foundData:SingleActorSpecific,
    type:string,
    unFilteredData:StarredIn[]|null|undefined,
    handleFilterData:(e: React.ChangeEvent<HTMLInputElement>)=>void,
    setSwitches: Dispatch<SetStateAction<Switches>>;
}


export const ActorStarredInComponent = (props:Props)=>{
    const{foundData,handleFilterData,unFilteredData}=props
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
                type:'movie',
            }
        }))

    }
    return(
        <div className={'starredIn'}>
            {foundData.castMovies?<form className={'register actor'}><label>search by title <input onChange={handleFilterData} type="text"/></label></form>:null}
            {unFilteredData ? (unFilteredData.map(el => {
                return (<div key={el.id + Math.random()} className={'roles'}>
                        {el.title ? <h3>Title : <span>{el.title}</span></h3> : null}
                        {el.role ? <h3>Role : <span>{el.role}</span></h3> : null}
                        {el.year ? <h3>Year : <span>{el.year}</span></h3> : null}
                        {el.description ? <h3>Description : <span>{el.description}</span></h3> : null}
                        <button onClick={handleSeeMore} id={el.id} className={'goBack actor'}>see more</button>
                        <button onClick={()=>{
                            props.offButton(prev=>({
                                ...prev,
                                starredIn:!prev.starredIn,
                            }))
                        }} className="return">hide roles</button>
                    </div>
                )
            })) : <p>No data...</p>}
        </div>
    )
}