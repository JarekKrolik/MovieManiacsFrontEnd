import React, {useEffect} from "react";
import {useState} from "react";
import {apiUrl} from "./config/api";
import {MovieFinder} from "./repository/MovieFinder";
import {NowInCinemasMovieEntity}from 'types'


function App() {
  const [test,setTest]= useState(null);

  useEffect(()=>{
    (async()=>{
      const data = await MovieFinder.getOneMovieById('tt0088247')
console.log(data);
      setTest(data)
    })()
  },[])


  return (
    <div className="App">
        {/*<p>{test}</p>*/}
        {/*{!test?<p>wczytywanie</p>:(test.map(obj=>{*/}
        {/*    return(*/}
        {/*        <div>*/}
        {/*            <h2>{obj.title}</h2>*/}
        {/*          <p>{obj.type}</p>*/}
        {/*          <p>{obj.writers}</p>*/}
        {/*        </div>*/}
        {/*    )*/}
        {/*}))}*/}
    </div>
  );
}

export default App;
