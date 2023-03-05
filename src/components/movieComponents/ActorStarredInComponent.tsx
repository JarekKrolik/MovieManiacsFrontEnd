import React from "react";
import{SingleActorSpecific,ActorsListEntity}from'types'
import {Link} from "react-router-dom";

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
}


export const ActorStarredInComponent = (props:Props)=>{
    const{foundData,listOfData,type,handleFilterData,unFilteredData}=props

    return(
        <div className={'starredIn'}>
            {foundData.castMovies?<form className={'register actor'}><label>filtruj wyniki po tytule <input onChange={handleFilterData} type="text"/></label></form>:null}
            {unFilteredData ? (unFilteredData.map(el => {
                return (<div key={el.id + Math.random()} className={'roles'}>
                        {el.title ? <h3>Tytuł : <span>{el.title}</span></h3> : null}
                        {el.role ? <h3>Rola : <span>{el.role}</span></h3> : null}
                        {el.year ? <h3>Rok : <span>{el.year}</span></h3> : null}
                        {el.description ? <h3>Opis : <span>{el.description}</span></h3> : null}
                        <Link className={'goBack actor'} to={'/allData'}
                              state={{id: el.id, listOfData: listOfData, type}}>pokaż więcej</Link>
                    </div>
                )
            })) : <p>Brak danych...</p>}
        </div>
    )
}