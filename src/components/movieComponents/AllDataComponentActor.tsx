import React, {useEffect, useState} from "react";
import {Link, Navigate, useLocation} from "react-router-dom";
import {MovieFinder} from "../../repository/MovieFinder";
import {SingleActorSpecific} from 'types'
import {Spinner} from "../Spinner";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Carousel} from 'react-responsive-carousel';
import '../css/AllDataComponent.css'
import {PreviousPage} from "../PreviousPage";
import {BasicActorInfo} from "./BasicActorInfo";
import {ActorStarredInComponent} from "./ActorStarredInComponent";
import {MostKnownFor} from "./MostKnownFor";
import {GoUpArrow} from "../GoUpArrow";
import {BackArrow} from "./BackArrow";

interface StarredIn {
    id: string,
    year: string,
    title: string,
    role: string,
    description: string,
}

export const AllDataComponentActor = () => {
    const [unFilteredData, setUnFilteredData] = useState<StarredIn[] | null>()
    const [badRequestRedirect, setBadRequestRedirect] = useState(false)
    const [filter, setFilter] = useState('')
    const location = useLocation();
    const {id, listOfData, type} = location.state;
    const [switches, setSwitches] = useState({
        starredIn: false,
        mostKnownFor: false

    });
    const [foundData, setFoundData] = useState<SingleActorSpecific>()

    const handleFilterData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value.toUpperCase())
        if (foundData) {

            if (!filter) {
                setUnFilteredData(foundData.castMovies)
            }
            const dataFiltered = foundData.castMovies.filter(el => {
                return el.title.toUpperCase().includes(filter)
            });
            setUnFilteredData(dataFiltered)
        }


    }

    useEffect(() => {

        (async () => {

            const res = await MovieFinder.findActorById(id) as unknown as SingleActorSpecific
            if (res.errorMessage.includes('Invalid')) {
                setBadRequestRedirect(true)
            }
            setFoundData(res);
            setUnFilteredData(res.castMovies)
        })()


    }, [])


    return (

        <div className="allDataElementBox">
            {badRequestRedirect ? <Navigate to={'/allData'} state={{id, listOfData}}/> : null}
            {!foundData ? <Spinner returnRoute={'/userMain'}/> : (<>
                    <BasicActorInfo foundData={foundData}/>
                    <button onClick={() => {
                        setSwitches(prev => ({
                            ...prev,
                            starredIn: !prev.starredIn,
                        }))
                    }} className={'goBack actor roles'}>role
                    </button>
                    {switches.starredIn ? <ActorStarredInComponent unFilteredData={unFilteredData} foundData={foundData}
                                                                   handleFilterData={handleFilterData}
                                                                   listOfData={listOfData} type={type}/> : null}
                    <button onClick={() => {
                        setSwitches(prev => ({
                            ...prev,
                            mostKnownFor: !prev.mostKnownFor,
                        }))
                    }} className={'goBack actor roles'}>najbardziej znane role
                    </button>
                    {switches.mostKnownFor ? <MostKnownFor foundData={foundData} listOfData={listOfData}/> : null}
                </>
            )}

            <GoUpArrow/>
            <BackArrow/>
            <Link to={'/userMain'} className={'goBack'} state={{
                returnData: listOfData, type: 'actor'
            }}>strona główna</Link>
        </div>
    )
}