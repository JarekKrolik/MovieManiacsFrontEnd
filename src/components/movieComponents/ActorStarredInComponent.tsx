import React, {Dispatch, SetStateAction, useContext} from "react";
import{SingleActorSpecific,ActorsListEntity}from'types'
import {UserDataContext} from "../../contexts/UserDataContext";

interface StarredIn {
    id:string,
    year:string,
    title:string,
    role:string,
    description:string,
}

interface Props{
    foundData:SingleActorSpecific,
    listOfData:ActorsListEntity[],
    type:string,
    unFilteredData:StarredIn[]|null|undefined,
    handleFilterData:(e: React.ChangeEvent<HTMLInputElement>)=>void,
    setSwitches: Dispatch<SetStateAction<{ searchComponent: boolean; nowInCinemas: boolean; soonInCinemas: boolean; favourites: boolean;allDataComponent:boolean, }>>;
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
            {foundData.castMovies?<form className={'register actor'}><label>filtruj wyniki po tytule <input onChange={handleFilterData} type="text"/></label></form>:null}
            {unFilteredData ? (unFilteredData.map(el => {
                return (<div key={el.id + Math.random()} className={'roles'}>
                        {el.title ? <h3>Tytuł : <span>{el.title}</span></h3> : null}
                        {el.role ? <h3>Rola : <span>{el.role}</span></h3> : null}
                        {el.year ? <h3>Rok : <span>{el.year}</span></h3> : null}
                        {el.description ? <h3>Opis : <span>{el.description}</span></h3> : null}
                        <button onClick={handleSeeMore} id={el.id} className={'goBack actor'}>zobacz więcej</button>
                    </div>
                )
            })) : <p>Brak danych...</p>}
        </div>
    )
}