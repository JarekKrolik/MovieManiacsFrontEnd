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
import {OthersCastComponent} from "./OthersCastComponent";

interface Props {
    setSwitches: Dispatch<SetStateAction<{ searchComponent: boolean; nowInCinemas: boolean; soonInCinemas: boolean; favourites: boolean; allDataComponent: boolean, }>>;
    id: string,
    type: string,
}

export const AllDataComponent = (props: Props) => {

    const [switches, setSwitches] = useState({
        fullCast: false,
        trailer: false,
        photos: false,
        posters: false,
        similars: false,
        wiki: false,
        others: false,
    });
    const [foundData, setFoundData] = useState<SingleMovieSpecific>()
    const [youTubeTrailer, setYouTubeTrailer] = useState<YoutubeTrailer>()
    const {setUserData, userData} = useContext(UserDataContext)


    useEffect(() => {
        (async () => {
            const res = await MovieFinder.getOneMovieById(props.id) as SingleMovieSpecific;
            const youTubeTrailerRes = await MovieFinder.getYouTubeTrailer(props.id) as YoutubeTrailer;
            if (res.errorMessage.includes('Invalid')) {
                setUserData(({
                    ...userData,
                    selectedItem: {
                        ...userData.selectedItem,
                        type: 'actor'
                    }
                }))
            }

            if (youTubeTrailerRes.errorMessage) {
                setYouTubeTrailer(undefined)
            }
            setYouTubeTrailer(youTubeTrailerRes)
            setFoundData(res)
        })()
    }, [props.id, setUserData, userData])

    return (
        <>
            <BasicMovieInfo foundData={foundData}/>
            <div className="allDataElementBox">
                {!foundData ? <Spinner returnRoute={'/userMain'}/> : (
                    <>
                        {switches.wiki ?
                            foundData.wikipedia ?
                                <WikiDataComponent setSwitches={setSwitches} foundData={foundData}/> : null : null}
                        <button name={'wiki'} className={'goBack'} onClick={() => {
                            setSwitches(prev => ({
                                ...prev,
                                wiki: !prev.wiki
                            }))
                        }}
                        >{switches.wiki ? 'hide wikipedia' : 'show wikipedia'}</button>

                        {switches.trailer ?
                            youTubeTrailer ?
                                <TrailerComponent foundData={foundData} youTubeTrailer={youTubeTrailer}/> : null : null}
                        <button name={'trailer'} className={'goBack'} onClick={() => {
                            setSwitches(prev => ({
                                ...prev,
                                trailer: !prev.trailer
                            }))
                        }}
                        >{switches.trailer ? 'hide trailers' : 'show trailers'}</button>
                        {switches.photos ? (foundData.images ? <ImagesComponent posters={false} foundData={foundData}/>
                            : <p>no photos in IMDb database</p>) : null}
                        <button className={'goBack'} onClick={() => {
                            setSwitches(prev => ({
                                ...prev,
                                photos: !prev.photos,
                            }))
                        }}>{switches.photos ? 'hide pictures' : 'show pictures'}</button>
                        {switches.posters ? (foundData.posters ? <ImagesComponent posters={true} foundData={foundData}/>
                            : <p>brak zdjęć w bazie IMDb</p>) : null}
                        <button className={'goBack'} onClick={() => {
                            setSwitches(prev => ({
                                ...prev,
                                posters: !prev.posters,
                            }))
                        }}>{switches.posters ? 'hide posters' : 'show posters'}</button>
                        {switches.fullCast ? <FullCastComponent offButton={setSwitches} setSwitches={props.setSwitches}
                                                                foundData={foundData}/> : null}
                        <button className={'goBack'} onClick={() => {
                            setSwitches((prev) => ({
                                ...prev,
                                fullCast: !prev.fullCast,
                            }))
                        }}>{switches.fullCast ? 'hide full cast' : 'full cast'}
                        </button>

                        {switches.others ? <OthersCastComponent setSwitches={props.setSwitches} offButton={setSwitches}
                                                                foundData={foundData}/> : null}
                        <button className={'goBack'} onClick={() => {
                            setSwitches((prev) => ({
                                ...prev,
                                others: !prev.others,
                            }))
                        }}>{switches.fullCast ? 'hide full cast others' : 'full cast others'}
                        </button>


                        {switches.similars ? <SimilarsComponent offButton={setSwitches} setSwitches={props.setSwitches}
                                                                foundData={foundData}/> : null}
                        <button className={'goBack'} onClick={() => {
                            setSwitches((prev) => ({
                                ...prev,
                                similars: !prev.similars,
                            }))
                        }}>{switches.similars ? 'hide similar movies' : 'similar movies '}
                        </button>
                    </>)}

                <button onClick={() => {
                    props.setSwitches(prev => ({
                            ...prev,
                            allDataComponent: false,
                            searchComponent: true,
                        })
                    )
                }} className="goBack">close
                </button>
                <GoUpArrow/>
            </div>
        </>
    )


}