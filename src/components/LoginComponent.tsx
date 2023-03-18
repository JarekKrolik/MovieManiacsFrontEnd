import React from "react";
import {Link} from "react-router-dom";
import "./css/LoginComponent.css"
import {Header} from "./Header";

const quotes = require('popular-movie-quotes')

export  interface Switches {
    searchComponent: boolean;
    nowInCinemas: boolean;
    soonInCinemas: boolean;
    favourites:boolean;
    allDataComponent:boolean,
    whatToWatch:boolean
}

interface Quote {
    movie: string,
    quote: string,
    type: string,
    year: string,
}

export const LoginComponent = () => {
    const [quoteObj] = quotes.getSomeRandom(1)
    const quote = quoteObj as Quote
    return (
        <>
            <Header/>
            <div className="quotes">
                <h2>Movie quote for today :</h2>
                <h2>"{quote.quote}"</h2>
                <h2>{quote.movie} {quote.year}</h2>
            </div>
            <div className={'loginBox'}>
                <Link to={'/log'}>log in</Link>
                <Link to={'/register'}>register</Link>
            </div>
        </>
    )
}