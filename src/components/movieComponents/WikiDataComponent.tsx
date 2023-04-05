import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {SingleMovieSpecific} from 'types';
import '../css/WikiDataComponent.css';
import {AllDataSwitches} from "./AllDataComponent";

interface Props {
    foundData: SingleMovieSpecific,
    setSwitches: Dispatch<SetStateAction<AllDataSwitches>>,
}


export const WikiDataComponent = (props: Props) => {
    const [backGroundImage, setBackgroundImage] = useState<string>()
    const {foundData, setSwitches} = props
    useEffect(() => {
        const random = Math.floor(Math.random() * foundData.images.items.length)
        const backPic = foundData.images.items[random].image
        if (backPic) {
            setBackgroundImage(backPic)
        } else {
            setBackgroundImage(foundData.image)
        }
    }, [foundData.image, foundData.images.items])

    return (
        foundData.wikipedia.plotFull ?
            <div className={'wikiData'} style={{
                backgroundImage: `url(${backGroundImage})`
            }}>
                <button onClick={() => {
                    setSwitches(prev => ({
                        ...prev,
                        wiki: false,
                    }))
                }} className="return">hide wiki
                </button>
                <div className="shade"></div>

                <h2>More information about the movie</h2>
                <p>{foundData.wikipedia.plotFull.plainText ? foundData.wikipedia.plotFull.plainText : 'sorry, no data...'}</p>

            </div> : null
    )
}