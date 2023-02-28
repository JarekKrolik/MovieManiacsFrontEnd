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
        }],
        favActors:[{
            actor_id:'',
            user:'',
        }]
    },
    setUserData: (obj: any) => {
    }
})

