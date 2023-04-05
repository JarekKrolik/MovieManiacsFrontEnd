import {apiUrl} from "../config/api";
import {UserEntity} from 'types';


export const saveUserToDatabase = async (newUser: UserEntity) => {
    try {
        const res = await fetch(`${apiUrl}/user`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify(newUser)
        })

        return res.json()
    } catch (e) {
        return e

    }
}


export const getUser = async (id: string): Promise<UserEntity[]> => {

    try {
        const res = await (fetch(`${apiUrl}/user/${id}`, {

            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        }))

        return await res.json()
    } catch (e) {
        return []

    }


}

export const logInUser = async (userName: string, password: string) => {
    try {
        const res = await fetch(`${apiUrl}/user/${userName}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({pass: password})
        })

        return res.json()
    } catch (e) {
        return e
    }
}

export const checkUserVerificationCode = async (userName: string, verificationCode: number) => {
    try {
        const res = await fetch(`${apiUrl}/verify/${userName}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({code: verificationCode})

        })

        return res.json()
    } catch (e) {
        return e
    }
}

export const userPasswordReset = async (user: string, email: string) => {
    try {
        const res = await fetch(`${apiUrl}/verify/reset`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({
                name: user,
                email: email,
            })

        })

        return res.json()
    } catch (e) {
        return e
    }
}