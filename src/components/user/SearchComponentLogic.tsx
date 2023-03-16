import React, {Dispatch, SetStateAction, useContext} from "react";
import {MovieFinder} from "../../repository/MovieFinder";
import {MovieListEntity, ActorsListEntity, Response} from 'types'
import {UserDataContext} from "../../contexts/UserDataContext";
import {SearchComponentForm} from "./SearchComponentForm";


interface Props {
    setSearchText: Dispatch<SetStateAction<string>>,
    setShowList: Dispatch<SetStateAction<boolean>>,
    setFoundData: Dispatch<SetStateAction<MovieListEntity[] | ActorsListEntity[] | undefined>>,
    setSelect: Dispatch<SetStateAction<string | undefined>>,
    setErrors: Dispatch<SetStateAction<{ notFound: boolean; errorMessage: string; }>>,
    select: string | undefined,
    searchText: string,
    errors: { notFound: boolean; errorMessage: string; },
    foundData: MovieListEntity[] | ActorsListEntity[] | undefined,


}


export const SearchComponentLogic = (props: Props) => {
    const {setSearchText, setShowList, setFoundData, setSelect, setErrors, select, searchText, foundData} = props
    const {userData,setUserData} = useContext(UserDataContext)

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {

        setSearchText(e.target.value);
        setShowList(false);
        setFoundData(undefined);

    }

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setUserData(  ({
            ...userData,
            selectedItem: {
                ...userData.selectedItem,
                type: e.target.value
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
                setUserData(({
                    ...userData,
                    searchList: finalData,
                }))
                setFoundData(finalData);

            }

            if (select === 'series') {
                const result = await MovieFinder.getAllSeriesByTitle(searchText) as unknown as Response;
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
                setUserData( ({
                    ...userData,
                    searchList: finalData,
                }))
                setFoundData(finalData)
            }


            if (select === 'actor') {
                const result = await MovieFinder.findActorByName(searchText) as Response;
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
                setUserData( ({
                    ...userData,
                    searchList: finalData,
                }))
                setFoundData(finalData)
            }

        } catch (err) {
        }
    }


    return (<SearchComponentForm foundData={foundData} handleFind={handleFind} searchText={searchText}
                                handleInput={handleInput} handleSelect={handleSelect} select={select}/>)

}