import React from "react";
import {Carousel} from "react-responsive-carousel";
import{SingleMovieSpecific}from'types'
interface Props{
    foundData:SingleMovieSpecific,
    posters:boolean,
}

export const ImagesComponent = (props:Props)=>{
    const{foundData,posters}=props

    return(
        !posters?<Carousel showArrows={true} emulateTouch={true} useKeyboardArrows={true}
                  dynamicHeight={true} infiniteLoop={true} className={'main-slide'}>
            {foundData.images.items.map(e => {
                return (
                    <div key={e.title}>
                        <img loading={'lazy'} src={e.image}/>
                        <p className="legend">{e.title}</p>
                    </div>
                )
            })}
        </Carousel>:<> <h2 className={'poster'}>Przednie postery:</h2>
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
        </>
    )
}