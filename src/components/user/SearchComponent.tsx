import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import '../css/RegisterForm.css'
import '../css/moviesList.css'
import {MovieListEntity, ActorsListEntity, FavouriteMoviesList, FavouriteActorsList} from 'types'
import {Spinner} from "../Spinner";
import {ActorsListComponent} from "../movieComponents/ActorsListComponent";
import {UserDataContext} from "../../contexts/UserDataContext";
import {MoviesListComponent} from "../movieComponents/MoviesListComponent";
import {GoUpArrow} from "../GoUpArrow";
import {SearchComponentLogic} from "./SearchComponentLogic";
import {Switches} from "../LoginComponent";


interface Props {
    setSwitches: Dispatch<SetStateAction<Switches>>,
    // returnData: MovieListEntity[] | ActorsListEntity[] | undefined,
    type: string,
    favList: FavouriteMoviesList[] | undefined,
    favActorsList: FavouriteActorsList[] | undefined,
}

export const SearchComponent = (props: Props) => {
    const {userData} = useContext(UserDataContext)
    const [searchText, setSearchText] = useState('');
    const [foundData, setFoundData] = useState<MovieListEntity[] | ActorsListEntity[]>();
    const [showList, setShowList] = useState(false);
    const [select, setSelect] = useState<string>();

    const [errors, setErrors] = useState({
        notFound: false,
        errorMessage: '',
    })

    const {setSwitches} = props

    useEffect(() => {
        if (userData.searchList)
            if (userData.selectedItem) {
                if (userData.selectedItem.type !== '') {
                    setSelect(userData.selectedItem.type)
                } else {
                    setSelect('movie')
                }
            } else {
                setSelect('movie')
            }


        if (userData.searchList) {
            setShowList(true)
            setFoundData(userData.searchList)
        }

    }, [userData.searchList, userData.selectedItem])

    return (
        <>
            <SearchComponentLogic foundData={foundData} errors={errors} searchText={searchText} select={select}
                                  setErrors={setErrors} setSelect={setSelect} setSearchText={setSearchText}
                                  setShowList={setShowList} setFoundData={setFoundData}/>
            <ul className={'moviesList'}>
                {errors.notFound ? <p>{errors.errorMessage}</p> : null}
                {(select === 'actor' && showList) ? (!foundData) ?
                        <Spinner returnRoute={'/delay'}/> : foundData.map(el => (
                            <ActorsListComponent setSwitches={props.setSwitches} listOfData={foundData} key={el.id}
                                                 title={el.title}
                                                 resultType={el.resultType} image={el.image} id={el.id}
                                                 description={el.description} errorMessage={""}
                                                 favList={userData.favActors}/>
                        ))
                    : showList ? <MoviesListComponent setSwitches={setSwitches} foundData={foundData}/> : null}
                {foundData ? <GoUpArrow/> : null}
            </ul>
        </>
    )
}