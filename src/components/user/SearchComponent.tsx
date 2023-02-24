import React, {createContext, ReactHTMLElement, useContext, useEffect, useState} from "react";
import '../css/RegisterForm.css'
import '../css/moviesList.css'
import {MovieFinder} from "../../repository/MovieFinder";
import {MovieListEntity,ActorsListEntity} from 'types'
import {Spinner} from "../Spinner";
import {MovieListElement} from "../movieComponents/MovieListElement";
import {ActorsListComponent} from "../movieComponents/ActorsListComponent";

interface Props {
    returnData:MovieListEntity[]|undefined,
}

export const SearchComponent = (props:Props)=>{
    const [searchText,setSearchText]=useState('');
    const [foundData,setFoundData]=useState<MovieListEntity[]|ActorsListEntity[]>();
    const [showList,setShowList]=useState(false);
    const[select,setSelect]=useState<string>();






 useEffect(()=>{

     if(props.returnData){
         setShowList(true);
         setFoundData(props.returnData)
     }
 },[props.returnData])


    const handleInput = (e:React.ChangeEvent<HTMLInputElement>)=>{

        setSearchText(e.target.value);
        setShowList(false);
        setFoundData(undefined);
    }

    const handleSelect = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        setSelect(e.target.value);
        setShowList(false);
        setFoundData(undefined);

    }

    const handleFind =async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try{


        setShowList(true)
        if(select==='movie'){const result =await MovieFinder.getAllByTitle(searchText,'pl') as MovieListEntity[];
            setFoundData(result);

        };
        if(select==='series'){const result =await MovieFinder.getAllSeriesByTitle(searchText,'pl') as MovieListEntity[];
            setFoundData(result)};

        if(select==='actor'){const result =await MovieFinder.findActorByName(searchText,'pl') as ActorsListEntity[];

            setFoundData(result)};}catch (err){

        }


    }
    return (
        <>
        <div className="formContainer">

            <form onSubmit={handleFind} className={'register'}>
                <label>wyszukaj :
                    <input required value={searchText} onChange={handleInput} type="text"/>
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
            <ul className={'moviesList'}>
            {(select==='actor'&&showList)?(!foundData)?<Spinner returnRoute={'/delay'}/>:foundData.map(el=>(
                <ActorsListComponent listOfData={foundData} key={el.id} title={el.title} resultType={el.resultType} image={el.image} id={el.id} description={el.description}/>
                    ))
                :showList?<ul className={'moviesList'}>
                    {!foundData?<Spinner returnRoute={'/delay'}/>:foundData.map(el=>(
                        <MovieListElement listOfData={foundData} key={el.id} id={el.id} description={el.description} image={el.image} title={el.title} resultType={el.resultType}/>
                    ))}
                </ul>:null}</ul>




        </>


    )
}