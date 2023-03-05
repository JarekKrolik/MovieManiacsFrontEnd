import React, {useContext, useEffect, useState} from "react";
import {Link, Navigate, useLocation} from "react-router-dom";
import {MovieFinder} from "../../repository/MovieFinder";
import {SingleMovieSpecific, YoutubeTrailer} from 'types'
import {Spinner} from "../Spinner";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Carousel} from 'react-responsive-carousel';
import '../css/AllDataComponent.css'
import {PreviousPage} from "../PreviousPage";
import {UserDataContext} from "../../contexts/UserDataContext";
import {BasicMovieInfo} from "./BasicMovieInfo";
import {TrailerComponent} from "./TrailerComponent";
import {ImagesComponent} from "./ImagesComponent";
import {FullCastComponent} from "./FullCastComponent";
import {SimilarsComponent} from "./SimilarsComponent";
import {WikiDataComponent} from "./WikiDataComponent";


export const AllDataComponent = () => {


    const location = useLocation();
    const {id, listOfData, type} = location.state;
    const [badRequestRedirect, setBadRequestRedirect] = useState(false)
    const [switches, setSwitches] = useState({
        fullCast: false,
        trailer: false,
        photos: false,
        posters: false,
        similars: false,
        wiki:false,
    });
    const [foundData, setFoundData] = useState<SingleMovieSpecific>()
    const [youTubeTrailer, setYouTubeTrailer] = useState<YoutubeTrailer>()


    useEffect(() => {


        (async () => {
            const res = await MovieFinder.getOneMovieById(id) as SingleMovieSpecific;
            const youTubeTrailerRes = await MovieFinder.getYouTubeTrailer(id) as YoutubeTrailer;
            if (res.errorMessage.includes('Invalid')) {
                setBadRequestRedirect(true)
            }

            if(youTubeTrailerRes.errorMessage){
                setYouTubeTrailer(undefined)
            }
            setYouTubeTrailer(youTubeTrailerRes)
            setFoundData(res)
            console.log(res)
        })()


    }, [id])


    return (
        <>
            <BasicMovieInfo foundData={foundData}/>
            <div className="allDataElementBox">
                {badRequestRedirect ? <Navigate to={'/allDataActor'} state={{id, listOfData}}/> : null}
                {!foundData ? <Spinner returnRoute={'/userMain'}/> : (
                    <>
                        {switches.wiki ?
                            foundData.wikipedia?<WikiDataComponent offButtonHandle={setSwitches} foundData={foundData}/>:null : null}
                        <button name={'wiki'} className={'goBack'} onClick={() => {
                            setSwitches(prev => ({
                                ...prev,
                                wiki: !prev.wiki
                            }))
                        }}
                        >{switches.wiki ? 'ukryj wikipedia' : 'pokaż wikipedia'}</button>

                        {switches.trailer ?
                            youTubeTrailer?<TrailerComponent foundData={foundData} youTubeTrailer={youTubeTrailer}/>:null : null}
                        <button name={'trailer'} className={'goBack'} onClick={() => {
                            setSwitches(prev => ({
                                ...prev,
                                trailer: !prev.trailer
                            }))
                        }}
                        >{switches.trailer ? 'ukryj trailery' : 'pokaż trailery'}</button>
                        {switches.photos ? (foundData.images ? <ImagesComponent posters={false} foundData={foundData}/>
                            : <p>brak zdjęć w bazie IMDb</p>) : null}
                        <button className={'goBack'} onClick={() => {
                            setSwitches(prev => ({
                                ...prev,
                                photos: !prev.photos,
                            }))
                        }}>{switches.photos ? 'ukryj zdjęcia' : 'pokaż zdjęcia'}</button>
                        {switches.posters ? (foundData.posters ? <ImagesComponent posters={true} foundData={foundData}/>
                            : <p>brak zdjęć w bazie IMDb</p>) : null}
                        <button className={'goBack'} onClick={() => {
                            setSwitches(prev => ({
                                ...prev,
                                posters: !prev.posters,
                            }))
                        }}>{switches.posters ? 'ukryj postery' : 'pokaż postery'}</button>
                        {switches.fullCast ? <FullCastComponent foundData={foundData} listOfData={listOfData}/> : null}
                        <button className={'goBack'} onClick={() => {
                            setSwitches((prev) => ({
                                ...prev,
                                fullCast: !prev.fullCast,
                            }))
                        }}>{switches.fullCast ? 'ukryj obsadę' : 'pełna obsada'}
                        </button>
                        {switches.similars ? <SimilarsComponent listOfData={listOfData} foundData={foundData}/> : null}
                        <button className={'goBack'} onClick={() => {
                            setSwitches((prev) => ({
                                ...prev,
                                similars: !prev.similars,
                            }))
                        }}>{switches.similars ? 'ukryj podobne' : 'podobne filmy'}
                        </button>


                    </>)}
                <PreviousPage/>
                <Link className={'goBack'} to={'/userMain'} state={{returnData: listOfData, type}}>strona główna</Link>
            </div>

        </>
    )


}