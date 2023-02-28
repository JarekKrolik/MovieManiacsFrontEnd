import React, {createContext, ReactHTMLElement, useContext, useEffect, useState} from "react";
import '../css/RegisterForm.css'
import '../css/moviesList.css'
import {MovieFinder} from "../../repository/MovieFinder";
import {MovieListEntity, ActorsListEntity,FavouriteMoviesList} from 'types'
import {Spinner} from "../Spinner";
import {MovieListElement} from "../movieComponents/MovieListElement";
import {ActorsListComponent} from "../movieComponents/ActorsListComponent";
import {UserDataContext} from "../../contexts/UserDataContext";

interface Props {
    returnData: MovieListEntity[] | ActorsListEntity[] | undefined,
    type: string,
    favList:FavouriteMoviesList[]|undefined
}

export const SearchComponent = (props: Props) => {
    const{obj}=useContext(UserDataContext)
    const [searchText, setSearchText] = useState('');
    const [foundData, setFoundData] = useState<MovieListEntity[] | ActorsListEntity[]>();
    const [showList, setShowList] = useState(false);
    const [select, setSelect] = useState<string>();
    const [errors, setErrors] = useState({
        notFound: false,
    })


    useEffect(() => {

        if (!props.type) {
            setSelect('movie')
        }

        if (props.returnData) {
            setShowList(true);
            setFoundData(props.returnData);
            setSelect(props.type)

        }
    }, [props.returnData])


    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {

        setSearchText(e.target.value);
        setShowList(false);
        setFoundData(undefined);
    }

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {

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
                const result = await MovieFinder.getAllByTitle(searchText, 'pl') as MovieListEntity[];
                const finalData = result.filter(el => el.resultType === 'Movie');
                if (finalData.length === 0) {
                    setErrors(prev => ({
                        ...prev,
                        notFound: true,
                    }))
                }
                setFoundData(finalData);

            }
            ;
            if (select === 'series') {
                const result = await MovieFinder.getAllSeriesByTitle(searchText, 'pl') as MovieListEntity[];
                const finalData = result.filter(el => el.resultType === 'Series');
                if (finalData.length === 0) {
                    setErrors(prev => ({
                        ...prev,
                        notFound: true,
                    }))
                }
                setFoundData(finalData)
            }


            if (select === 'actor') {
                const result = await MovieFinder.findActorByName(searchText, 'pl') as ActorsListEntity[];
                const finalData = result.filter(el => el.resultType === 'Name');
                if (finalData.length === 0) {
                    setErrors(prev => ({
                        ...prev,
                        notFound: true,
                    }))
                }
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
                    <select defaultValue={props.type} onChange={handleSelect} name="option">
                        <option value="movie">film</option>
                        <option value="series">serial</option>
                        <option value="actor">aktorka/aktor</option>

                    </select>
                    <button type={'submit'}>szukaj...</button>
                </form>
                {searchText ? <p className="result">wyszukiwana fraza: <span>{searchText}</span></p> : null}
                {foundData?.length ?
                    <p className="result">znaleziono <span>{foundData.length}</span> pasujących elementów</p> : null}
            </div>
            <ul className={'moviesList'}>
                {errors.notFound ? <p>Nie znaleziono...</p> : null}
                {(select === 'actor' && showList) ? (!foundData) ?
                        <Spinner returnRoute={'/delay'}/> : foundData.map(el => (
                            <ActorsListComponent listOfData={foundData} key={el.id} title={el.title}
                                                 resultType={el.resultType} image={el.image} id={el.id}
                                                 description={el.description}/>
                        ))
                    : showList ? <ul className={'moviesList'}>
                        {!foundData ? <Spinner returnRoute={'/delay'}/> : foundData.map(el => (
                            <MovieListElement  listOfData={foundData} key={el.id} id={el.id} description={el.description}
                                              image={el.image} title={el.title} resultType={el.resultType} favList={obj.favMovies}/>
                        ))}
                    </ul> : null}</ul>


        </>


    )
}