import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import {MovieFinder} from "../../repository/MovieFinder";
import {SingleActorSpecific} from 'types'
import {Spinner} from "../Spinner";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import '../css/AllDataComponent.css'
import {BasicActorInfo} from "./BasicActorInfo";
import {ActorStarredInComponent} from "./ActorStarredInComponent";
import {MostKnownFor} from "./MostKnownFor";
import {GoUpArrow} from "../GoUpArrow";
import {UserDataContext} from "../../contexts/UserDataContext";

interface StarredIn {
    id: string,
    year: string,
    title: string,
    role: string,
    description: string,
}

interface Props {
    setSwitches: Dispatch<SetStateAction<{ searchComponent: boolean; nowInCinemas: boolean; soonInCinemas: boolean; favourites: boolean; allDataComponent: boolean, }>>;
    id: string,
    type: string,
}


export const AllDataComponentActor = (props: Props) => {
    const [unFilteredData, setUnFilteredData] = useState<StarredIn[] | null>()
    const {setUserData} = useContext(UserDataContext)
    const [filter, setFilter] = useState('')
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

            const res = await MovieFinder.findActorById(props.id) as unknown as SingleActorSpecific
            if (res.errorMessage.includes('Invalid')) {
                setUserData((prev: { selectedItem: any; })=>({
                    ...prev,
                    selectedItem:{
                        ...prev.selectedItem,
                        type:'movie'
                    }
                }))
            }
            setFoundData(res);
            setUnFilteredData(res.castMovies)
        })()


    }, [props.id,setUserData])


    return (

        <div className="allDataElementBox">

            {!foundData ? <Spinner returnRoute={'/userMain'}/> : (<>
                    <BasicActorInfo foundData={foundData}/>
                    <button onClick={() => {
                        setSwitches(prev => ({
                            ...prev,
                            starredIn: !prev.starredIn,
                        }))
                    }} className={'goBack actor roles'}>{switches.starredIn ? "ukryj role" : 'role'}
                    </button>
                    {switches.starredIn ?
                        <ActorStarredInComponent setSwitches={props.setSwitches} unFilteredData={unFilteredData}
                                                 foundData={foundData}
                                                 handleFilterData={handleFilterData}
                                                 listOfData={[]} type={'actor'}/> : null}
                    <button onClick={() => {
                        setSwitches(prev => ({
                            ...prev,
                            mostKnownFor: !prev.mostKnownFor,
                        }))
                    }} className={'goBack actor roles'}>{switches.mostKnownFor ? 'ukryj' : 'najbardziej znane role'}
                    </button>
                    {switches.mostKnownFor ?
                        <MostKnownFor setSwitches={props.setSwitches} foundData={foundData}/> : null}
                </>
            )}

            <GoUpArrow/>

            <button onClick={() => {
                props.setSwitches(prev => ({
                        ...prev,
                        allDataComponent: false,
                        searchComponent: true,
                    })
                )
            }} className="goBack">zamknij
            </button>
        </div>
    )
}