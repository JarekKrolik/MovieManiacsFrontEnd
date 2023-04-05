import React from "react";
import {useState} from "react";
import {UserDataContext} from "./contexts/UserDataContext";
import {Route, Routes} from "react-router-dom";
import {FormAdd} from "./components/forms/RegisterComponent";
import {Footer} from "./components/Footer";
import {LoginComponent} from "./components/LoginComponent";
import {LoginForm} from "./components/forms/LoginForm";
import {UserMainPage} from "./components/user/UserMainPage";
import {UserPanel} from "./components/user/UserPanel";
import {DataDelayComponent} from "./components/movieComponents/DataDelayComponent";
import {UserData} from 'types';


function App() {

    const userDataObject: UserData = {

        name: '',
        id: '',
        avatar: 0,
        date: '',
        email: '',
        movieId: '',
        favMovies: [{
            user: '',
            movie_id: '',
            name: '',
            image: '',
        }],
        favActors: [{
            user: '',
            actor_id: '',
            name: '',
            image: '',
        }],
        searchList: [
            {
                id: '',
                title: '',
                description: '',
                image: '',
                resultType: '',
                errorMessage: '',
            },
        ],
        selectedItem: {
            id: '',
            type: '',
        }


    }
    const [userData, setUserData] = useState<UserData>(userDataObject);


    return (
        <>
            <div className={'mainBox'}>
                <UserDataContext.Provider value={{userData: userData, setUserData}}>
                    <Routes>
                        <Route path={'/'} element={<LoginComponent/>}/>
                        <Route path={'/log'} element={<LoginForm login={''} password={''}/>}/>
                        <Route path={'/register'} element={<FormAdd/>}/>
                        <Route path={'/userMain'} element={<UserMainPage/>}/>
                        <Route path={'/userPanel'} element={<UserPanel/>}/>
                        <Route path={'/delay'} element={<DataDelayComponent/>}/>
                        <Route path={'/*'} element={<LoginComponent/>}/>
                    </Routes>
                </UserDataContext.Provider>
                <Footer/>
            </div>

        </>
    );
}

export default App;
