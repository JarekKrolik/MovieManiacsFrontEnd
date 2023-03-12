import {createContext} from "react";

export const UserDataContext = createContext({
    obj: {
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
    setUserData: (obj: any) => {
    }
})

