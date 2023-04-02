import React, {Dispatch, SetStateAction} from "react";
import {Carousel} from "react-responsive-carousel";
import {SingleMovieSpecific} from 'types'
import {AllDataSwitches} from "./AllDataComponent";

interface Props {
    offButton: Dispatch<SetStateAction<AllDataSwitches>>;
    foundData: SingleMovieSpecific,
    posters: boolean,
}

export const ImagesComponent = (props: Props) => {
    const {foundData, posters} = props

    return (
        !posters ? <> <Carousel showArrows={true} emulateTouch={true} useKeyboardArrows={true} showThumbs={false}
                                dynamicHeight={true} infiniteLoop={true} className={'main-slide'}>
            {foundData.images.items.map(e => {
                return (
                    <div key={e.title}>
                        <img loading={'lazy'} src={e.image} alt={'movie pictures'}/>
                        <p className="legend">{e.title}</p>

                    </div>
                )
            })}
        </Carousel>
            <button onClick={() => {
                props.offButton(prev => ({
                    ...prev,
                    photos: !prev.photos,
                }))
            }} className="return">hide pictures
            </button>
        </> : <> <h2 className={'poster'}>Posters:</h2>
            <button onClick={() => {
                props.offButton(prev => ({
                    ...prev,
                    posters: !prev.posters,
                }))
            }} className="return">hide posters
            </button>
            {foundData.posters.posters.length !== 0 ?
                <Carousel showArrows={true} emulateTouch={true} useKeyboardArrows={true}
                          dynamicHeight={true} infiniteLoop={true} className={'main-slide'}>
                    {foundData.posters.posters.map(e => {
                        return (
                            <div key={e.id}>
                                <img loading={'lazy'} src={e.link} alt={'posters'}/>
                            </div>
                        )
                    })}
                </Carousel> : <p>No pictures in IMDb</p>}
            <h2 className={'poster'}>backdrops :</h2>
            {foundData.posters.backdrops.length !== 0 ?
                <Carousel showArrows={true} emulateTouch={true} useKeyboardArrows={true}
                          dynamicHeight={true} infiniteLoop={true} className={'main-slide'}>
                    {foundData.posters.backdrops.map(e => {
                        return (
                            <div key={e.id}>
                                <img loading={'lazy'} src={e.link} alt={'posters backdrops'}/>
                            </div>
                        )
                    })}

                </Carousel> : <p>No pictures in IMDb</p>}
        </>
    )
}