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


export const AllDataComponent = () => {


    const location = useLocation();
    const {obj} = useContext(UserDataContext)
    const {id, listOfData, type} = location.state;
    const [badRequestRedirect, setBadRequestRedirect] = useState(false)
    const [switches, setSwitches] = useState({
        fullCast: false,
        trailer: false,
        photos: false,
        posters: false,
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
            if (youTubeTrailerRes.videoUrl) {
                setYouTubeTrailer(youTubeTrailerRes)
            }
            console.log(res, youTubeTrailerRes)
            setFoundData(res)
        })()


    }, [])


    return (
        <>
            <BasicMovieInfo foundData={foundData}  />
            <div className="allDataElementBox">
                {badRequestRedirect ? <Navigate to={'/allDataActor'} state={{id, listOfData}}/> : null}
                {!foundData ? <Spinner returnRoute={'/userMain'}/> : (
                    <>
                        <button name={'trailer'} className={'goBack'} onClick={() => {
                            setSwitches(prev => ({
                                ...prev,
                                trailer: !prev.trailer
                            }))
                        }}
                        >{switches.trailer ? 'ukryj trailer' : 'pokaż trailer'}</button>
                        {switches.trailer ? (
                            youTubeTrailer ? <div className={'youtubeContainer'}>
                                <iframe src={`https://www.youtube.com/embed/${youTubeTrailer.videoId}`}
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen></iframe>
                            </div> : foundData.trailer ? (foundData.trailer.linkEmbed ?
                                <div className="frameContainer">
                                    <object
                                        type="video/mp4"
                                        data={foundData.trailer.linkEmbed}
                                        width="100%"
                                        height="100%"></object>

                                </div> : <p>Brak trailera w bazie IMDb</p>) : <p>Brak trailera w bazie IMDb</p>
                        ) : null}
                        <button className={'goBack'} onClick={() => {
                            setSwitches(prev => ({
                                ...prev,
                                photos: !prev.photos,
                            }))
                        }}>{switches.photos ? 'ukryj zdjęcia' : 'pokaż zdjęcia'}</button>
                        {switches.photos ? (foundData.images ?
                            <Carousel showArrows={true} emulateTouch={true} useKeyboardArrows={true}
                                      dynamicHeight={true} infiniteLoop={true} className={'main-slide'}>
                                {foundData.images.items.map(e => {
                                    return (
                                        <div key={e.title}>
                                            <img loading={'lazy'} src={e.image}/>
                                            <p className="legend">{e.title}</p>
                                        </div>
                                    )
                                })}
                            </Carousel> : <p>brak zdjęć w bazie IMDb</p>) : null}
                        <button className={'goBack'} onClick={() => {
                            setSwitches(prev => ({
                                ...prev,
                                posters: !prev.posters,
                            }))
                        }}>{switches.posters ? 'ukryj postery' : 'pokaż postery'}</button>
                        {switches.posters ? (foundData.posters ? <>
                            <h2 className={'poster'}>Przednie postery:</h2>
                            {foundData.posters.posters.length !== 0 ?
                                <Carousel showArrows={true} emulateTouch={true} useKeyboardArrows={true}
                                          dynamicHeight={true} infiniteLoop={true} className={'main-slide'}>
                                    {foundData.posters.posters.map(e => {
                                        return (
                                            <div key={e.id}>
                                                <img loading={'lazy'} src={e.link}/>
                                            </div>
                                        )
                                    })}
                                </Carousel> : <p>Brak w bazie IMDb</p>}
                            <h2 className={'poster'}>okładki:</h2>
                            {foundData.posters.backdrops.length !== 0 ?
                                <Carousel showArrows={true} emulateTouch={true} useKeyboardArrows={true}
                                          dynamicHeight={true} infiniteLoop={true} className={'main-slide'}>
                                    {foundData.posters.backdrops.map(e => {
                                        return (
                                            <div key={e.id}>
                                                <img loading={'lazy'} src={e.link}/>
                                            </div>
                                        )
                                    })}
                                </Carousel> : <p>Brak w bazie IMDb</p>}
                        </> : <p>brak zdjęć w bazie IMDb</p>) : null}
                        <button className={'goBack'} onClick={() => {
                            setSwitches((prev) => ({
                                ...prev,
                                fullCast: !prev.fullCast,
                            }))
                        }}>pełna obsada
                        </button>
                        {switches.fullCast ? (foundData.fullCast ? (foundData.fullCast.actors ? <ul className={'cast'}>
                            {foundData.fullCast.actors.map(el => {
                                return (<li key={el.id}>
                                    {el.image ?
                                        <div className={'picture actor'}><img src={el.image} alt='zdjęcie aktora'/>
                                        </div> : <div className={'picture'}><img
                                            src={require('../../assets/img/vecteezy_icon-image-not-found-vector_.jpg')}
                                            alt='zdjęcie aktora'/></div>}
                                    <div className="text actor">
                                        {el.name ? <h2>{el.name}</h2> : null}
                                        {el.asCharacter ? <h3>Jako: <span>{el.asCharacter}</span></h3> : null}
                                        <Link className={'goBack actor'} state={{id: el.id, listOfData: listOfData}}
                                              to={'/allDataActor'}>zobacz więcej</Link>
                                    </div>
                                </li>)
                            })}
                        </ul> : <p>Brak danych w bazie IMDb</p>) : null) : null}
                    </>)}
                <PreviousPage/>
                <Link className={'goBack'} to={'/userMain'} state={{returnData: listOfData, type}}>strona główna</Link>
            </div>

        </>
    )


}