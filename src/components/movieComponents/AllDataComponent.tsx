import React, {useContext, useEffect, useState} from "react";
import {Link, Navigate, useLocation} from "react-router-dom";
import {MovieFinder} from "../../repository/MovieFinder";
import {SingleMovieSpecific} from 'types'
import {Spinner} from "../Spinner";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Carousel} from 'react-responsive-carousel';
import '../css/AllDataComponent.css'
import {PreviousPage} from "../PreviousPage";
import {FavouriteIcon} from "../FavouriteIcon";
import {UserDataContext} from "../../contexts/UserDataContext";


export const AllDataComponent = () => {


    const location = useLocation();
    const{obj}=useContext(UserDataContext)
    const {id, listOfData, type} = location.state;
    const [badRequestRedirect, setBadRequestRedirect] = useState(false)
    const [switches, setSwitches] = useState({
        fullCast: false,
        trailer: false,
        photos: false,
    });
    const [foundData, setFoundData] = useState<SingleMovieSpecific>()
    const favActors = obj.favMovies.map(e=>e.movie_id)

    useEffect(() => {


        (async () => {
            const res = await MovieFinder.getOneMovieById(id) as SingleMovieSpecific
            if (res.errorMessage.includes('Invalid')) {
                setBadRequestRedirect(true)
            }

            setFoundData(res);
        })()


    }, [])


    return (
        <>

            <div className="allDataElementBox">
                {badRequestRedirect ? <Navigate to={'/allDataActor'} state={{id, listOfData}}/> : null}
                {!foundData ? <Spinner returnRoute={'/userMain'}/> : (
                    <>
                        <div className={'basicInfo'} style={{
                            backgroundImage: `url(${foundData.image})`
                        }}>
                            <div className="shade"></div>
                            {foundData.fullTitle ? <h2>Tytuł : <span>{foundData.fullTitle}</span></h2> :
                                <h2>Brak danych w bazie IMDb...</h2>}
                            {foundData.year ? <h3>Rok : <span>{foundData.year}</span></h3> : null}
                            {foundData.genres ? <h3>Gatunek : <span>{foundData.genres}</span></h3> : null}
                            {foundData.contentRating ? <h3>Rating : <span>{foundData.contentRating}</span></h3> : null}
                            {foundData.companies ?
                                <h3>Produkcja : <span>{foundData.companies}</span> - <span>{foundData.countries}</span>
                                </h3> : null}
                            {foundData.releaseDate ?
                                <h3>Data premiery : <span>{foundData.releaseDate}</span></h3> : null}
                            {foundData.writers ? <h3>Scenariusz : <span>{foundData.writers}</span></h3> : null}
                            {foundData.directors ? <h3>Reżyseria : <span>{foundData.directors}</span></h3> : null}
                            {foundData.awards ? <h3>Nagrody i nominacje : <span>{foundData.awards}</span></h3> : null}
                            {foundData.stars ? <h3>Występują : <span>{foundData.stars}</span></h3> : null}
                            {foundData.runtimeStr ? <h3>Czas trwania : <span>{foundData.runtimeStr}</span></h3> : null}
                            {foundData.stars ? <h3>Występują : <span>{foundData.stars}</span></h3> : null}
                            {foundData.boxOffice ? <div> {foundData.boxOffice.budget ?
                                <h3>Budżet : <span>{foundData.boxOffice.budget}</span></h3> : null}
                                {foundData.boxOffice.cumulativeWorldwideGross ?
                                    <h3>Zarobił : <span>{foundData.boxOffice.cumulativeWorldwideGross}</span>
                                    </h3> : null}</div> : null}

                            {foundData.plot ? <h3>Fabuła : <span>{foundData.plot}</span></h3> : null}
                            {foundData.ratings ? <h3>Oceny:
                                <div>{foundData.ratings.imDb ? <h3>ImDb:{foundData.ratings.imDb}</h3> : null}
                                    {foundData.ratings.filmAffinity ?
                                        <h3>filmAffinity:{foundData.ratings.filmAffinity}</h3> : null}
                                    {foundData.ratings.metacritic ?
                                        <h3>Metacritic:{foundData.ratings.metacritic}</h3> : null}
                                    {foundData.ratings.rottenTomatoes ?
                                        <h3>rottenTomatoes:{foundData.ratings.rottenTomatoes}</h3> : null}
                                    {foundData.ratings.theMovieDb ?
                                        <h3>theMovieDb:{foundData.ratings.theMovieDb}</h3> : null}</div>
                            </h3> : null}

                        </div>
                        <button name={'trailer'} className={'goBack'} onClick={() => {
                            setSwitches(prev => ({
                                ...prev,
                                trailer: !prev.trailer
                            }))
                        }}
                        >{switches.trailer ? 'ukryj trailer' : 'pokaż trailer'}</button>
                        {switches.trailer ? (foundData.trailer ? (foundData.trailer.linkEmbed ?
                            <div className="frameContainer">

                                <object
                                    type="video/mp4"
                                    data={foundData.trailer.linkEmbed}


                                    width="100%"
                                    height="100%"></object>

                            </div> : <p>Brak trailera w bazie IMDb</p>) : <p>Brak trailera w bazie IMDb</p>) : null}
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