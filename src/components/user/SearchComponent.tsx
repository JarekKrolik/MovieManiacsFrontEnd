import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import '../css/RegisterForm.css'
import '../css/moviesList.css'
import {MovieFinder} from "../../repository/MovieFinder";
import {MovieListEntity, ActorsListEntity, FavouriteMoviesList, Response, FavouriteActorsList} from 'types'
import {Spinner} from "../Spinner";
import {ActorsListComponent} from "../movieComponents/ActorsListComponent";
import {UserDataContext} from "../../contexts/UserDataContext";
import {MoviesListComponent} from "../movieComponents/MoviesListComponent";
import {GoUpArrow} from "../GoUpArrow";


interface Props {
    setSwitches: Dispatch<SetStateAction<{ searchComponent: boolean; nowInCinemas: boolean; soonInCinemas: boolean; favourites: boolean; allDataComponent: boolean, }>>
    returnData: MovieListEntity[] | ActorsListEntity[] | undefined,
    type: string,
    favList: FavouriteMoviesList[] | undefined,
    favActorsList: FavouriteActorsList[] | undefined,
}

export const SearchComponent = (props: Props) => {
    const {obj, setUserData} = useContext(UserDataContext)
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
if(obj.selectedItem){if(obj.selectedItem.type!==''){setSelect(obj.selectedItem.type)}else{setSelect('movie')}}else{
setSelect('movie')}



        if (obj.searchList) {
            setShowList(true)
            setFoundData(obj.searchList)
        }


    }, [obj.searchList,obj.selectedItem])


    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {

        setSearchText(e.target.value);
        setShowList(false);
        setFoundData(undefined);
    }

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setUserData((prev: { selectedItem: any; })=>({
            ...prev,
            selectedItem:{
                ...prev.selectedItem,
                type:e.target.value
            }
        }))
        setSelect(e.target.value);
        setShowList(false);
        setFoundData(undefined);

    }

    const handleFind = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        try {

            setErrors(prev => ({
                ...prev,
                notSelected: false,
            }))

            setShowList(true)

            if (select === 'movie') {
                const result = await MovieFinder.getAllByTitle(searchText, 'pl') as unknown as Response;
                if (result.errorMessage) {
                    setErrors(prev => ({
                        ...prev,
                        notFound: true,
                        errorMessage: result.errorMessage,
                    }))
                }


                const finalData = result.results.filter(el => el.resultType === 'Movie') as MovieListEntity[]
                setUserData((prev: any) => ({
                    ...prev,
                    searchList: finalData,
                }))
                setFoundData(finalData);

            }

            if (select === 'series') {
                const result = await MovieFinder.getAllSeriesByTitle(searchText, 'pl') as unknown as Response;
                if (result.errorMessage) {
                    setErrors(prev => ({
                        ...prev,
                        notFound: true,
                        errorMessage: result.errorMessage,
                    }))
                }
                const finalData = result.results.filter(el => el.resultType === 'Series');
                if (finalData.length === 0) {
                    setErrors(prev => ({
                        ...prev,
                        notFound: true,
                    }))
                }
                setErrors(prev => ({
                    ...prev,
                    notFound: false,
                }))
                setUserData((prev: any) => ({
                    ...prev,
                    searchList: finalData,
                }))
                setFoundData(finalData)
            }


            if (select === 'actor') {
                const result = await MovieFinder.findActorByName(searchText, 'pl') as Response;
                if (result.errorMessage) {
                    setErrors(prev => ({
                        ...prev,
                        notFound: true,
                        errorMessage: result.errorMessage,
                    }))
                }

                const finalData = result.results.filter(el => el.resultType === 'Name') as ActorsListEntity[]
                if (finalData.length === 0) {
                    setErrors(prev => ({
                        ...prev,
                        notFound: true,
                    }))
                }

                setErrors(prev => ({
                    ...prev,
                    notFound: false,
                }))
                setUserData((prev: any) => ({
                    ...prev,
                    searchList: finalData,
                }))
                setFoundData(finalData)
            }

        } catch (err) {
        }
    }
    return (
        <>
            <div className="formContainer">
                <form onSubmit={handleFind} className={'register'}>
                    <label>wyszukaj :
                        <input required value={searchText} onChange={handleInput} type="text"/>
                    </label>
                    <select defaultValue={select} onChange={handleSelect} name="option">
                        <option value={select}>{select}</option>
                        {select==='movie'?null:<option value="movie">movie</option>}
                        {select==='series'?null:<option value="series">series</option>}
                        {select==='actor'?null:<option value="actor">actor</option>}
                    </select>
                    <button type={'submit'}>szukaj...</button>
                </form>
                {searchText ? <p className="result">wyszukiwana fraza: <span>{searchText}</span></p> : null}
                {foundData?.length ?
                    <p className="result">znaleziono <span>{foundData.length}</span> pasujących wyników</p> : null}
            </div>
            <ul className={'moviesList'}>
                {errors.notFound ? <p>{errors.errorMessage}</p> : null}
                {(select === 'actor' && showList) ? (!foundData) ?
                        <Spinner returnRoute={'/delay'}/> : foundData.map(el => (
                            <ActorsListComponent setSwitches={props.setSwitches} listOfData={foundData} key={el.id}
                                                 title={el.title}
                                                 resultType={el.resultType} image={el.image} id={el.id}
                                                 description={el.description} errorMessage={""} favList={obj.favActors}/>
                        ))
                    : showList ? <MoviesListComponent setSwitches={setSwitches} foundData={foundData}/> : null}
                {foundData ? <GoUpArrow/> : null}
            </ul>


        </>


    )
}