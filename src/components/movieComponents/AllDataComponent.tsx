import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import {MovieFinder} from "../../repository/MovieFinder";
import {SingleMovieSpecific, YoutubeTrailer} from 'types'
import {Spinner} from "../Spinner";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import '../css/AllDataComponent.css'
import {BasicMovieInfo} from "./BasicMovieInfo";
import {TrailerComponent} from "./TrailerComponent";
import {ImagesComponent} from "./ImagesComponent";
import {FullCastComponent} from "./FullCastComponent";
import {SimilarsComponent} from "./SimilarsComponent";
import {WikiDataComponent} from "./WikiDataComponent";
import {GoUpArrow} from "../GoUpArrow";
import {UserDataContext} from "../../contexts/UserDataContext";

interface Props {
    setSwitches: Dispatch<SetStateAction<{ searchComponent: boolean; nowInCinemas: boolean; soonInCinemas: boolean; favourites: boolean;allDataComponent:boolean, }>>;
    id:string,
    type:string,

}

export const AllDataComponent = (props:Props) => {

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
    const {setUserData,userData}=useContext(UserDataContext)


    useEffect(() => {


        (async () => {
            const res = await MovieFinder.getOneMovieById(props.id) as SingleMovieSpecific;
            const youTubeTrailerRes = await MovieFinder.getYouTubeTrailer(props.id) as YoutubeTrailer;
            if (res.errorMessage.includes('Invalid')) {
                setUserData(({
                    ...userData,
                    selectedItem:{
                        ...userData.selectedItem,
                        type:'actor'
                    }
                }))
            }

            if(youTubeTrailerRes.errorMessage){
                setYouTubeTrailer(undefined)
            }
            setYouTubeTrailer(youTubeTrailerRes)
            setFoundData(res)
        })()


    }, [props.id,setUserData])


    return (
        <>
            <BasicMovieInfo foundData={foundData}/>
            <div className="allDataElementBox">
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
                        {switches.fullCast ? <FullCastComponent setSwitches={props.setSwitches} foundData={foundData}/> : null}
                        <button className={'goBack'} onClick={() => {
                            setSwitches((prev) => ({
                                ...prev,
                                fullCast: !prev.fullCast,
                            }))
                        }}>{switches.fullCast ? 'ukryj obsadę' : 'pełna obsada'}
                        </button>
                        {switches.similars ? <SimilarsComponent setSwitches={props.setSwitches} foundData={foundData}/> : null}
                        <button className={'goBack'} onClick={() => {
                            setSwitches((prev) => ({
                                ...prev,
                                similars: !prev.similars,
                            }))
                        }}>{switches.similars ? 'ukryj podobne' : 'podobne filmy'}
                        </button>


                    </>)}

                <button onClick={()=>{
                    props.setSwitches(prev=>({
                        ...prev,
                        allDataComponent:false,
                        searchComponent:true,
                        })
                    )
                }} className="goBack">zamknij</button>
                <GoUpArrow/>

            </div>

        </>
    )


}