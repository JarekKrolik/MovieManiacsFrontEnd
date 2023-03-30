import React, {useState} from "react";
import {StreamingProviderLinks, StreamingAvailability} from 'types'
import  '../css/Streaming.css'

interface Props {
    el: string,
    streamingAvailability: StreamingAvailability | undefined,

}

export const StreamingLink = (props: Props) => {
    const {el, streamingAvailability} = props
    const [listOfLinks, setListOfLinks] = useState<StreamingProviderLinks[]>()
    const [listOfLinksOn, setListOfLinksOn] = useState(false)

    const handleStreamingLinks = (e: any) => {
        const provider = e.target.name as string

        // @ts-ignore
        const streamingLinks = streamingAvailability?.us[provider]
        setListOfLinksOn(prev => !prev)
        setListOfLinks(streamingLinks)


    }

    return (
        <div
        className={'streaming'}>
            <button className={'seeMore streaming'} name={el} onClick={handleStreamingLinks} key={el}>{el}</button>
            {listOfLinksOn && listOfLinks ? <div>
                {listOfLinks.length > 0 ? listOfLinks.map(el => {
                    return (
                        <div className="link" key={Math.random()*10}>
                            <p>type : {el.type}</p><p>quality : {el.quality}</p><a className={'seeMore link'} target={'_blank'} href={el.link}>streaming service</a>
                        </div>
                    )
                }) : <h3>no streaming available, sorry...</h3>}
            </div> : null}

        </div>

    )
}