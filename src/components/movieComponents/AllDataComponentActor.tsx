import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import {MovieFinder} from "../../repository/MovieFinder";
import {SingleActorSpecific} from 'types';
import {Spinner} from "../Spinner";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import '../css/AllDataComponent.css';
import {BasicActorInfo} from "./BasicActorInfo";
import {ActorStarredInComponent} from "./ActorStarredInComponent";
import {MostKnownFor} from "./MostKnownFor";
import {GoUpArrow} from "../GoUpArrow";
import {UserDataContext} from "../../contexts/UserDataContext";
import {Switches} from "../LoginComponent";

interface StarredIn {
    id: string,
    year: string,
    title: string,
    role: string,
    description: string,
}

interface Props {
    setSwitches: Dispatch<SetStateAction<Switches>>,
    id: string,
    type: string,
}


export const AllDataComponentActor = (props: Props) => {
    const [unFilteredData, setUnFilteredData] = useState<StarredIn[] | null>()
    const {setUserData, userData} = useContext(UserDataContext)
    const [filter, setFilter] = useState('')
    const [switches, setSwitches] = useState({
        starredIn: false,
        mostKnownFor: false,

    })
    const [foundData, setFoundData] = useState<SingleActorSpecific>()

    const handleFilterData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value.toUpperCase())
        if (foundData) {

            if (!filter) {
                setUnFilteredData(foundData.castMovies)
            }
            const dataFiltered = foundData.castMovies.filter(el => {
                return el.title.toUpperCase().includes(filter)
            })
            setUnFilteredData(dataFiltered)
        }
    }

    useEffect(() => {

        (async () => {

            const res = await MovieFinder.findActorById(props.id) as unknown as SingleActorSpecific
            if (res.errorMessage.includes('Invalid')) {
                setUserData(({
                    ...userData,
                    selectedItem: {
                        ...userData.selectedItem,
                        type: 'movie'
                    }
                }))
            }
            setFoundData(res)
            setUnFilteredData(res.castMovies)
        })()


    }, [props.id, setUserData, userData])


    return (
        <div className="allDataElementBox">
            {!foundData ? <Spinner returnRoute={'/userMain'}/> : (<>
                    <BasicActorInfo foundData={foundData}/>
                    <button onClick={() => {
                        setSwitches(prev => ({
                            ...prev,
                            starredIn: !prev.starredIn,
                        }))
                    }} className={'goBack actor roles'}>{switches.starredIn ? "hide roles" : 'roles'}
                    </button>
                    {switches.starredIn ?
                        <ActorStarredInComponent setSwitches={props.setSwitches}
                                                 offButton={setSwitches}
                                                 unFilteredData={unFilteredData}
                                                 foundData={foundData}
                                                 handleFilterData={handleFilterData}
                                                 type={'actor'}/> : null}
                    <button onClick={() => {
                        setSwitches(prev => ({
                            ...prev,
                            mostKnownFor: !prev.mostKnownFor,
                        }))
                    }} className={'goBack actor roles'}>{switches.mostKnownFor ? 'hide' : 'most known for'}
                    </button>
                    {switches.mostKnownFor ?
                        <MostKnownFor
                            offButton={setSwitches}
                            setSwitches={props.setSwitches}
                            foundData={foundData}
                        /> : null}
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
            }} className="goBack">close
            </button>
        </div>
    )
}