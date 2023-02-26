import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {MovieFinder} from "../../repository/MovieFinder";
import {SingleActorSpecific} from'types'
import {Spinner} from "../Spinner";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import '../css/AllDataComponent.css'
import {PreviousPage} from "../PreviousPage";



export const AllDataComponentActor = ()=>{


const location=useLocation();
const{id,listOfData,type}= location.state;
const[switches,setSwitches]=useState({
    starredIn:false,

});
const[foundData,setFoundData]=useState<SingleActorSpecific>()




    useEffect(()=>{

            (async()=>{

                const res = await MovieFinder.findActorById(id) as unknown as SingleActorSpecific
                setFoundData(res);
            })()



    },[])



    return(

        <div className="allDataElementBox">
            {!foundData?<Spinner returnRoute={'/userMain'}/>:(<>
                <div className="basicInfo actor">
                    <div className="text actor">
                    {foundData.name?<h2>{foundData.name}</h2>:null}
                    {foundData.birthDate?<h3>Data urodzenia : <span>{foundData.birthDate}</span></h3>:null}
                    {foundData.deathDate?<h3>Data śmierci : <span>{foundData.deathDate}</span></h3>:null}
                    {foundData.height?<h3>Wzrost : <span>{foundData.height}</span></h3>:null}
                        {foundData.awards?<h3>Nagrody : <span>{foundData.awards}</span></h3>:null}
                        {foundData.summary?<h3>Opis : <span>{foundData.summary}</span></h3>:null}

                    </div>
                    <div className="picture actor">
                        <img src={foundData.image} alt="zdjęcie aktora lub aktorki"/>
                    </div>
                </div>
                    <button onClick={()=>{
                        setSwitches(prev=>({
                            ...prev,
                            starredIn: !prev.starredIn,
                        }))
                    }} className={'goBack actor'}>role</button>
                    {switches.starredIn?<div className={'starredIn'}>
                        {foundData.castMovies?(foundData.castMovies.map(el=>{
                            return(<div key={el.id+Math.random()} className={'roles'}>
                            {el.title?<h3>Tytuł : <span>{el.title}</span></h3>:null}
                            {el.role?<h3>Rola : <span>{el.role}</span></h3>:null}
                            {el.year?<h3>Rok : <span>{el.year}</span></h3>:null}
                            {el.description?<h3>Opis : <span>{el.description}</span></h3>:null}
                                    <Link className={'goBack actor'} to={'/allData'} state={{id:el.id,listOfData:listOfData,type}}>zobacz</Link>
                                </div>
                            )
                        })):<p>Brak danych...</p>}
                    </div>:null}

                </>
                )}
            <PreviousPage/>
            <Link to={'/userMain'} className={'goBack'} state={{
                  returnData:listOfData,type:'actor'
                    }}>powrót do wyszukiwarki</Link>
              </div>
           )}