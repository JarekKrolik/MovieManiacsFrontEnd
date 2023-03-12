import React, {Dispatch, SetStateAction, useContext} from "react";
import '../css/MovieListElement.css'
import {ActorsListEntity,FavouriteActorsList} from 'types'
import {Link} from "react-router-dom";
import {UserDataContext} from "../../contexts/UserDataContext";
import {FavouriteIcon} from "../FavouriteIcon";

interface Props extends ActorsListEntity {
    listOfData: ActorsListEntity[];
    favList:FavouriteActorsList[]|undefined;
    setSwitches: Dispatch<SetStateAction<{ searchComponent: boolean; nowInCinemas: boolean; soonInCinemas: boolean; favourites: boolean;allDataComponent:boolean, }>>;
}

export const ActorsListComponent = (props: Props) => {
    const {obj,setUserData} = useContext(UserDataContext)
    const {id, description, image, title,favList} = props
    const list = favList?.map(e=>e.actor_id)

    const handleSeeMore = ()=>{
        props.setSwitches({
            favourites:false,
            soonInCinemas:false,
            nowInCinemas:false,
            searchComponent:false,
            allDataComponent:true,

        })
        setUserData((prev: any)=>({
            ...prev,
            selectedItem:{
                id:id,
                type:'actor',
            }
        }))

    }


    return (<li className={'element'} id={id}>
        <FavouriteIcon image={image} switchedOn={list?list.includes(id):false}  id={id} user={obj.name} type={'actor'} title={title}/>
        <h3>Imię i Nazwisko : <span>{title}</span></h3>
        <p>Krótki opis : <span>{description}</span></p>
        <div className="picture">
            {image ? (<img src={image} alt="plakat z filmu"/>) : (
                <img src={require('../../assets/img/vecteezy_icon-image-not-found-vector_.jpg')}
                     alt="symbol braku zdjęcia"/>)}
        </div>
        <button onClick={handleSeeMore} className="seeMore">zobacz więcej</button>
        {/*<Link to={'/allDataActor'} state={{id: id, listOfData: props.listOfData, type: 'actor'}} className={'seeMore'}>zobacz*/}
        {/*    więcej</Link>*/}
    </li>)
}