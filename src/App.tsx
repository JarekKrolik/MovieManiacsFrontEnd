import React, {useContext, useEffect} from "react";
import {useState} from "react";
import{UserDataContext} from "./contexts/UserDataContext";
import {Form, Route, Routes} from "react-router-dom";
import {FormAdd} from "./components/forms/RegisterForm";
import {Footer} from "./components/Footer";
import {LoginComponent} from "./components/LoginComponent";
import {LoginForm} from "./components/forms/LoginForm";
import {UserMainPage} from "./components/user/UserMainPage";
import {BackGroundPicture} from "./components/pictures/BackGroundPicture";
import {UserPanel} from "./components/user/UserPanel";
import {DataDelayComponent} from "./components/movieComponents/DataDelayComponent";
import {AllDataComponent} from "./components/movieComponents/AllDataComponent";
import {AllDataComponentActor} from "./components/movieComponents/AllDataComponentActor";



function App() {

    const obj = {
        name:'',
        id:'',
        avatar:0,
        date:'',
        email:'',
        movieId: '',
        favMovies:[{
            user:'',
            movie_id:'',
        }],
        favActors:[{
            user:'',
            actor_id:'',
        }]
    }
const[userData,setUserData]=useState(obj);



    return (
<>
        <div className={'mainBox'}>
            {/*<BackGroundPicture/>*/}
<UserDataContext.Provider value={{obj: userData,setUserData}}>
      <Routes>
          <Route path={'/'} element={<LoginComponent/>}/>
        <Route path={'/log'} element={<LoginForm login={''} password={''}/>}/>
          <Route path={'/register'} element={<FormAdd/>}/>
          <Route path={'/userMain'} element={<UserMainPage/>}/>
          <Route path={'/userPanel'} element={<UserPanel/>} />
          <Route path={'/delay'} element={<DataDelayComponent/>}/>
          <Route path={'/allData'} element={<AllDataComponent/>}/>
          <Route path={'/allDataActor'} element={<AllDataComponentActor/>}/>
          <Route path={'/*'} element={<LoginComponent/>}/>
      </Routes>
</UserDataContext.Provider>




            <Footer/>
        </div>

</>
  );
}

export default App;
