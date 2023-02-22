import {apiUrl} from "../config/api";
import {UserEntity} from 'types'

export const getUser = async (id:string):Promise<UserEntity[]>=>{



            const res = await (fetch(`${apiUrl}/user/${id}`,{

                method:"GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            }));
    return await res.json()


}