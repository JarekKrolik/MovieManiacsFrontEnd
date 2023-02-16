import {createContext} from "react";
import{UserEntity} from 'types'
export const UserContext = createContext({
    id:'',
    setId:(s:string)=>{}
})

