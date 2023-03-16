import React, {Dispatch, SetStateAction, useState} from "react";
import {YoutubeTrailer, SingleMovieSpecific} from 'types'

interface Props {
    offButton: Dispatch<SetStateAction<{
        fullCast: boolean;
        trailer: boolean;
        photos: boolean;
        posters: boolean;
        similars: boolean;
        wiki: boolean;
        others: boolean;
    }>>;
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
            </div> : <p>No trailer available on YouTube...</p> : null}
            {!whichTrailer ? foundData.trailer? <div className="frameContainer">
                <object
                    aria-label="Alternative Text"
                    type="video/mp4"
                    data={`${foundData.trailer.linkEmbed}?autoplay=true`}
                    width="100%"
                    height="100%"
                >No trailer available...</object>

            </div> : <p>No trailer available on IMDb...</p> : null

            }
            <button onClick={() => {
                setWhichTrailer(prev => !prev)
            }} className={'goBack'}>{whichTrailer ? 'trailer IMDb' : 'trailer YouTube'}</button>
            <button onClick={()=>{
                props.offButton(prev=>({
                    ...prev,
                    trailer:!prev.trailer,
                }))
            }} className="return">hide trailers</button>
        </>
    )
}







