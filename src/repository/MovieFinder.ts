import {imdbApiKey} from "../config/apiKeyConfig";
import {MovieListEntity, NowInCinemasMovieEntity, SingleMovieSpecific} from 'types'

export class MovieFinder {


    static async getAllByTitle (title:string,lang='en'):Promise<MovieListEntity[]>{
        const res = await fetch(`https://imdb-api.com/${lang}/API/SearchMovie/${imdbApiKey}/${title}`);
        const data = await res.json()
        return data.results as MovieListEntity[]
};

    static async getAllSeriesByTitle (title:string,lang='en'):Promise<MovieListEntity[]>{
        const res = await fetch(`https://imdb-api.com/${lang}/API/SearchSeries/${imdbApiKey}/${title}`);
        const data = await res.json();
        return data.results as MovieListEntity[];
    };

    static async getComingSoonMovies(lang='en'):Promise<NowInCinemasMovieEntity[]>{
        const res = await fetch(`https://imdb-api.com/${lang}/API/ComingSoon/${imdbApiKey}`);
        const data = await res.json() ;


        return data.items as NowInCinemasMovieEntity[];
    }

    static async nowInCinemas(lang='en'):Promise<NowInCinemasMovieEntity[]>{
        const res = await fetch(`https://imdb-api.com/${lang}/API/InTheaters/${imdbApiKey}`);
        const result = await res.json() ;
        const data = result.items as NowInCinemasMovieEntity[]
        return data;
    }

static async getOneMovieById(id:string,lang='en'):Promise<SingleMovieSpecific>{
    const res = await fetch(`https://imdb-api.com/${lang}/API/Title/${imdbApiKey}/${id}/FullActor, FullCast, Posters, Images, Trailer, Ratings, Wikipedia`);
    const data = await res.json()
    return data as SingleMovieSpecific;
}




    static async findActorByName(name:string,lang='en'):Promise<any[]>{
        const res = await fetch(`https://imdb-api.com/en/API/SearchName/${imdbApiKey}/${name}`)  ;
        const data = await res.json();


        return data.results
    }

    static async findActorById(id:string,lang='en'):Promise<any[]>{
        const res = await fetch(`https://imdb-api.com/${lang}/API/Name/${imdbApiKey}/${id}`)  ;
        const data = await res.json();

        console.log(data)
        return data
    }





}