import React from "react";
import {MovieListEntity, ActorsListEntity} from 'types';

interface Props {
    handleFind: (e: React.FormEvent<HTMLFormElement>) => Promise<void>,
    searchText: string,
    select: string | undefined,
    handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    foundData: MovieListEntity[] | ActorsListEntity[] | undefined,
    clearSearchHistory: () => void,

}

export const SearchComponentForm = (props: Props) => {
    const {handleFind, searchText, handleInput, handleSelect, select, foundData, clearSearchHistory} = props



    return (

        <div className="formContainer">
            <form onSubmit={handleFind} className={'register search'}>
                <label>search for :
                    <input required value={searchText} onChange={handleInput} type="text"/>
                </label>
                <label>choose search category
                <select defaultValue={select} onChange={handleSelect} name="option">
                    <option value={select}>{select}</option>
                    {select === 'movie' ? null : <option value="movie">movie</option>}
                    {select === 'series' ? null : <option value="series">series</option>}
                    {select === 'actor' ? null : <option value="actor">actor</option>}
                </select>
                </label>
                <button type={'submit'}>start searching</button>
                <div onClick={clearSearchHistory}
                     className={'goBack search'}
                >clear search history
                </div>
            </form>

            {searchText ? <p className="result">you are looking for : <span>{searchText}</span></p> : null}
            {foundData?.length ?
                <p className="result">found <span>{foundData.length}</span> matching results</p> : null}
        </div>
    )
}