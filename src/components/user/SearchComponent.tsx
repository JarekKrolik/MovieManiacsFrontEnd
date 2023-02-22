import React, {useState} from "react";
import '../css/RegisterForm.css'
import '../css/moviesList.css'
import {MovieFinder} from "../../repository/MovieFinder";
import {MovieListEntity,ActorsListEntity} from 'types'
import {Spinner} from "../Spinner";
import {MovieListElement} from "../movieComponents/MovieListElement";
import {ActorsListComponent} from "../movieComponents/ActorsListComponent";
export const SearchComponent = ()=>{
    const [searchText,setSearchText]=useState('');
    const [foundData,setFoundData]=useState<MovieListEntity[]>();
    const [showList,setShowList]=useState(false)
    const[select,setSelect]=useState<string>()


    const handleInput = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setSearchText(e.target.value);
        setShowList(false);
        setFoundData(undefined);
    }

    const handleSelect = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        setSelect(e.target.value)
    }

    const handleFind =async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setShowList(true)
        if(select==='movie'){const result =await MovieFinder.getAllByTitle(searchText,'pl') as MovieListEntity[];
            setFoundData(result)
        };
        if(select==='series'){const result =await MovieFinder.getAllSeriesByTitle(searchText,'pl') as MovieListEntity[];
            setFoundData(result)};

        if(select==='actor'){const result =await MovieFinder.findActorByName(searchText,'pl') as ActorsListEntity[];
            console.log(result)
            setFoundData(result)};

    }
    return (
        <>
        <div className="formContainer">

            <form onSubmit={handleFind} className={'register'}>
                <label>wyszukaj :
                    <input value={searchText} onChange={handleInput} type="text"/>
                </label>
                <select onChange={handleSelect} name="option" >
                    <option  value="series">serial</option>
                    <option value="movie">film</option>
                    <option value="actor">aktorka/aktor</option>

                </select>
                <button type={'submit'}>szukaj...</button>
            </form>
            {searchText?<p className="result">wyszukiwana fraza: <span>{searchText}</span></p>:null}
            {foundData?.length?<p className="result">znaleziono <span>{foundData.length}</span> pasujących elementów</p>:null}
        </div>
            {select==='actor'?<ActorsListComponent/>: showList?<ul className={'moviesList'}>
                    {!foundData?<Spinner/>:foundData.map(el=>(
                        <MovieListElement key={el.id} id={el.id} description={el.description} image={el.image} title={el.title} resultType={el.resultType}/>
                    ))}

                </ul>:null}




        </>


    )
}