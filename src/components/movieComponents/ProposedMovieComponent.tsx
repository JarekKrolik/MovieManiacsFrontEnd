import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import {ProposedMovie} from "./WhatToWatchComponent";
import '../css/ProposedMovieComponent.css';
import {GoUpArrow} from "../GoUpArrow";
import {Switches} from "../LoginComponent";
import {UserDataContext} from "../../contexts/UserDataContext";
import {MovieFinder} from "../../repository/MovieFinder";
import {Spinner} from "../Spinner";
import {StreamingAvailability} from 'types';
import {StreamingLink} from "./StreamingProviders";


interface Props {
    seeMore: boolean,
    id?: string,
    offButton?: Dispatch<SetStateAction<{
        fullCast: boolean,
        trailer: boolean,
        photos: boolean,
        posters: boolean,
        similars: boolean,
        wiki: boolean,
        others: boolean,
        comments: boolean,
        streamingProviders: boolean,
    }>>
    movie: ProposedMovie,
    setSwitches?: Dispatch<SetStateAction<Switches>>
}

export const ProposedMovieComponent = (props: Props) => {
    const {movie, setSwitches} = props
    const {userData, setUserData} = useContext(UserDataContext)
    const [streamingPanelSwitch, setStreamingPanelSwitch] = useState(false)
    const [streamingProvidersList, setStreamingProvidersList] = useState<string[] | null>(null)
    const [streamingAvailability, setStreamingAvailability] = useState<StreamingAvailability>()

    const streamingPlatforms = async () => {
        if (streamingPanelSwitch) {
            setStreamingPanelSwitch(false)
        }
        if (!streamingPanelSwitch) {
            setStreamingPanelSwitch(true)
            await whereToWatchHandler()
        }
    }

    const whereToWatchHandler = async () => {
        setStreamingProvidersList(null)
        const tempArray = []
        const streaming = await MovieFinder.whereToWatch(movie.title, movie.id, 'en', 'us') as StreamingAvailability
        if (streaming?.us) {
            setStreamingAvailability(streaming)
            for (const [key] of Object.entries(streaming.us)) {

                tempArray.push(key)
                setStreamingProvidersList(tempArray)
            }
        } else {
            setStreamingProvidersList(['no streaming data available'])

        }


    }

    useEffect(() => {
        (async () => {
            await whereToWatchHandler()

        })()
    }, [movie.id])

    return (
        <div className="proposed">
            <h2>{movie.title}</h2>
            <h2>imdB rating : {movie.imDbRating}</h2>
            <div className="picture">
                <img src={movie.image} alt=""/>
            </div>
            {streamingPanelSwitch ? <div>
                <h2>streaming available on:</h2>

                {streamingProvidersList ?
                    streamingProvidersList.length > 0 ? streamingProvidersList.map(el => {
                        return (

                            <StreamingLink key={Math.random() * 10} streamingAvailability={streamingAvailability}
                                           el={el}/>
                        )
                    }) : <h2>sorry, no streaming available for this movie...</h2> :
                    <Spinner returnRoute={'/userMain'}/>}
            </div> : null}
            <button className={'seeMore'}
                    onClick={streamingPlatforms}>{!streamingPanelSwitch ? 'where to watch ?' : 'close streaming services'}</button>
            <GoUpArrow/>
            {setSwitches && props.seeMore ? <button id={movie.id} onClick={(e: any) => {
                setSwitches(prev => ({
                    ...prev,
                    allDataComponent: true,
                }));
                setUserData(({
                    ...userData,
                    selectedItem: {
                        id: e.target.id,
                        type: 'movie',
                    }
                }))
            }} className="seeMore">see more
            </button> : null}
        </div>
    )
}