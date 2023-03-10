import React, {useState} from "react";
import {YoutubeTrailer, SingleMovieSpecific} from 'types'

interface Props {
    youTubeTrailer: YoutubeTrailer,
    foundData: SingleMovieSpecific,
}

export const TrailerComponent = (props: Props) => {
    const {youTubeTrailer, foundData} = props
    const [whichTrailer, setWhichTrailer] = useState(true)


    return (
        <>
            {whichTrailer ? youTubeTrailer.videoUrl ? <div className={'youtubeContainer'}>
                <iframe src={`https://www.youtube.com/embed/${youTubeTrailer.videoId}?autoplay=1`}
                        title="YouTube video player" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen


                ></iframe>
            </div> : <p>Brak trailera YouTube...</p> : null}
            {!whichTrailer ? foundData.trailer? <div className="frameContainer">
                <object
                    type="video/mp4"
                    data={foundData.trailer.linkEmbed}
                    width="100%"
                    height="100%"></object>

            </div> : <p>Brak trailera w bazie IMDb...</p> : null

            }
            <button onClick={() => {
                setWhichTrailer(prev => !prev)
            }} className={'goBack'}>{whichTrailer ? 'trailer IMDb' : 'trailer YouTube'}</button>
        </>
    )
}







