import React, {useEffect, useState} from "react";
import '../css/AllDataComponent.css'
import {Link, useLocation} from "react-router-dom";
import {MovieFinder} from "../../repository/MovieFinder";
import {SingleMovieSpecific} from'types'
import {Spinner} from "../Spinner";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export const AllDataComponent = ()=>{
const location=useLocation();
const{id,listOfData,type}= location.state;
const[typeOfData,setTypeOfData]=useState('');
const[foundData,setFoundData]=useState<SingleMovieSpecific>()

useEffect(()=>{setTypeOfData(type)},[type])



    useEffect(()=>{
        if(type==='movie'){
            (async()=>{
                const res = await MovieFinder.getOneMovieById(id) as SingleMovieSpecific
                console.log(res);
                setFoundData(res);
console.log(res.images)
            })()
        }


    },[id])



    return(

        <div className="allDataElementBox">
            {!foundData?<Spinner returnRoute={'/userMain'}/>:(
                <>
                <div className={'basicInfo'}>
                <h2>Tytuł : {foundData.fullTitle}</h2>
                <h3>Rok : {foundData.year}</h3>
                <h3>Gatunek : {foundData.genres}</h3>
                <h3>Kraj produkcji : {foundData.companies}</h3>
                <h3>Data premiery : {foundData.releaseDate}</h3>
                <h3>Scenariusz : {foundData.writers}</h3>
                <h3>Reżyseria : {foundData.directors}</h3>
                    <h3>Nagrody i nominacje : {foundData.awards}</h3>
                    <h3>Występują : {foundData.stars}</h3>
                    <h3>Czas trwania : {foundData.runtimeStr}</h3>


                </div>
                   <Carousel autoPlay={true}  >
                       {/*{foundData.images.items.map(e=>{return (  <div>*/}
                       {/*    <img src={e.image} />*/}
                       {/*    <p className="legend">{e.title}</p>*/}
                       {/*</div>)})}*/}
                        <div>
                            <img src={'https://pixabay.com/pl/photos/zebra-ko%c5%84ski-w-paski-zwierz%c4%99-7757193/'} />
                            <p className="legend">Legend 1</p>
                        </div>
                        <div>
                            <img src={'https://pixabay.com/pl/photos/zebra-ko%c5%84ski-w-paski-zwierz%c4%99-7757193/'} />
                            <p className="legend">Legend 2</p>
                        </div>
                        <div>
                            <img src={'https://pixabay.com/pl/photos/zebra-ko%c5%84ski-w-paski-zwierz%c4%99-7757193/'} />
                            <p className="legend">Legend 3</p>
                        </div>
                    </Carousel>

                </>
            )}


            <Link className={'seeMore'} to={'/userMain'} state={{returnData:listOfData}}>powrót</Link>
        </div>
    )



}