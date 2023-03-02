import React from "react";
import {YoutubeTrailer,SingleMovieSpecific} from 'types'

interface Props {
    youTubeTrailer:YoutubeTrailer|undefined,
    foundData:SingleMovieSpecific,
}


export const TrailerComponent = (props:Props)=>{
    const{youTubeTrailer,foundData}=props



    return(

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
    )
}