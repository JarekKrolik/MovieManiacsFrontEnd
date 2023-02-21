import React, {useState} from "react";
import '../css/RegisterForm.css'
import '../css/moviesList.css'
import {MovieFinder} from "../../repository/MovieFinder";
import {MovieListEntity} from 'types'
import {Spinner} from "../Spinner";
import {MovieListElement} from "../movieComponents/MovieListElement";
export const SearchComponent = ()=>{
    const [searchText,setSearchText]=useState('');
    const [foundData,setFoundData]=useState<MovieListEntity[]>();
    const [showList,setShowList]=useState(false)


    const handleInput = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setSearchText(e.target.value);
        setShowList(false);
        setFoundData(undefined);
    }

    const handleFind =async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setShowList(true)
        const result =await MovieFinder.getAllByTitle(searchText,'pl') as MovieListEntity[];
setFoundData(result)


    }
    return (
        <>
        <div className="formContainer">

            <form onSubmit={handleFind} className={'register'}>
                <label>znajdź film lub serial :
                    <input value={searchText} onChange={handleInput} type="text"/>
                </label>
                <button type={'submit'}>szukaj...</button>
            </form>
            {searchText?<p className="result">wyszukiwana fraza: <span>{searchText}</span></p>:null}
            {foundData?.length?<p className="result">znaleziono <span>{foundData.length}</span> pasujących elementów</p>:null}
        </div>
            {showList?<ul className={'moviesList'}>
                {!foundData?<Spinner/>:foundData.map(el=>(
                    <MovieListElement key={el.id} id={el.id} description={el.description} image={el.image} title={el.title} resultType={el.resultType}/>
                ))}

            </ul>:null}



        </>


    )
}