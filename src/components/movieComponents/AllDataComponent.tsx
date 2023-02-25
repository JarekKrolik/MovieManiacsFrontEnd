import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {MovieFinder} from "../../repository/MovieFinder";
import {SingleMovieSpecific} from'types'
import {Spinner} from "../Spinner";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import '../css/AllDataComponent.css'

export const AllDataComponent = ()=>{


const location=useLocation();
const{id,listOfData,type}= location.state;
const[switches,setSwitches]=useState({
    fullCast:false,
    trailer:false,
    photos:false,
});
const[foundData,setFoundData]=useState<SingleMovieSpecific>()




    useEffect(()=>{

            (async()=>{
                const res = await MovieFinder.getOneMovieById(id) as SingleMovieSpecific
                console.log(res);
                setFoundData(res);
            })()



    },[])



    return(
<>

        <div className="allDataElementBox">
            {!foundData?<Spinner returnRoute={'/userMain'}/>:(
<>
                <div className={'basicInfo'} style={{
                    backgroundImage:`url(${foundData.image})`
                }}>
                    <div className="shade"></div>
                    {foundData.fullTitle?<h2>Tytuł : <span>{foundData.fullTitle}</span></h2>:null}
                    {foundData.year?<h3>Rok : <span>{foundData.year}</span></h3>:null}
                    {foundData.genres?<h3>Gatunek : <span>{foundData.genres}</span></h3>:null}
                    {foundData.contentRating?<h3>Rating : <span>{foundData.contentRating}</span></h3>:null}
                    {foundData.companies?<h3>Produkcja : <span>{foundData.companies}</span> - <span>{foundData.countries}</span></h3>:null}
                    {foundData.releaseDate?<h3>Data premiery : <span>{foundData.releaseDate}</span></h3>:null}
                    {foundData.writers?<h3>Scenariusz : <span>{foundData.writers}</span></h3>:null}
                    {foundData.directors?<h3>Reżyseria : <span>{foundData.directors}</span></h3>:null}
                    {foundData.awards?<h3>Nagrody i nominacje : <span>{foundData.awards}</span></h3>:null}
                    {foundData.stars?<h3>Występują : <span>{foundData.stars}</span></h3>:null}
                    {foundData.runtimeStr?<h3>Czas trwania : <span>{foundData.runtimeStr}</span></h3>:null}
                    {foundData.stars?<h3>Występują : <span>{foundData.stars}</span></h3>:null}
                    {foundData.boxOffice.budget?<h3>Budżet : <span>{foundData.boxOffice.budget}</span></h3>:null}
                    {foundData.boxOffice.cumulativeWorldwideGross?<h3>Zarobił : <span>{foundData.boxOffice.cumulativeWorldwideGross}</span></h3>:null}
                    {foundData.plot?<h3>Fabuła : <span>{foundData.plot}</span></h3>:null}
                    <h3>Oceny:</h3>
                    {foundData.ratings.imDb?<h3>ImDb:{foundData.ratings.imDb}</h3>:null}
                    {foundData.ratings.filmAffinity?<h3>filmAffinity:{foundData.ratings.filmAffinity}</h3>:null}
                    {foundData.ratings.metacritic?<h3>Metacritic:{foundData.ratings.metacritic}</h3>:null}
                    {foundData.ratings.rottenTomatoes?<h3>rottenTomatoes:{foundData.ratings.rottenTomatoes}</h3>:null}
                    {foundData.ratings.theMovieDb?<h3>theMovieDb:{foundData.ratings.theMovieDb}</h3>:null}
                </div>
    <button name={'trailer'} className={'goBack'} onClick={()=>{
        setSwitches(prev=>({
            ...prev,
            trailer: !prev.trailer
        }))
    }}
    >{switches.trailer?'ukryj trailer':'pokaż trailer'}</button>
                {switches.trailer?(foundData.trailer.linkEmbed?<div className="frameContainer">

            <object
                type="video/mp4"
                data={foundData.trailer.linkEmbed}

                width="100%"
                height="100%"></object>

        </div>:null):null}
    <button  className={'goBack'} onClick={()=>{
        setSwitches(prev=>({
            ...prev,
            photos: !prev.photos,
        }))
    }}>{switches.photos?'ukryj zdjęcia':'pokaż zdjęcia'}</button>
                {switches.photos?(foundData.images?<Carousel showArrows={true} emulateTouch={true} useKeyboardArrows={true} dynamicHeight={true} infiniteLoop={true}  className={'main-slide'}>
        {foundData.images.items.map(e=>{return(
            <div key={e.title}>
                <img loading={'lazy'} src={e.image} />
                <p className="legend">{e.title}</p>
            </div>
        )})}
    </Carousel>:null):null}
<button className={'goBack'} onClick={()=>{
    setSwitches((prev)=>({
        ...prev,
        fullCast: !prev.fullCast,
    }))
}} >pełna obsada</button>
    {switches.fullCast?<h2>test</h2>:null}


</>)}   <Link className={'goBack'} to={'/userMain'} state={{returnData:listOfData}}>powrót</Link>
        </div>

                </>
    )



}