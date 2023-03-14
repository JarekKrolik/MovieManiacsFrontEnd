import {createContext} from "react";
import{UserData}from'types'

export const UserDataContext = createContext({
    userData: {
        id: '',
        name: '',
        date: '',
        avatar: 0,
        email: '',
        movieId: '',
        favMovies: [{
            movie_id:'',
            user:'',
            name:'',
            image:'',
        }],
        favActors: [{
            actor_id:'',
            user:'',
            name:'',
            image:'',
        }],
        searchList:[
            {
                id: '',
                title: '',
                description: '',
                image: '',
                resultType: '',
                errorMessage: '',
            },
        ],
        selectedItem:{
            id:'',
            type:'',
        }

    },
    setUserData: (userData: UserData) => {
    }
})

