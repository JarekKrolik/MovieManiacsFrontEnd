import {createContext} from "react";
export const UserDataContext = createContext({
    obj:{id:'',
    name:'',
    date:'',
    avatar:0,
    email:'',
    movieId:'',
    },
    setUserData:(obj:any)=>{}
})

