import {imdbApiKey} from "../config/apiKeyConfig";
import {ActorsListEntity, MovieListEntity, NowInCinemasMovieEntity, Response, SingleMovieSpecific,YoutubeTrailer} from 'types'
import {apiUrl} from "../config/api";

export class MovieFinder {

    static async addToFavouriteList(id: string, user: string,type:string,title:string,image:string): Promise<void> {
        await fetch(`${apiUrl}/favourite`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'

                },
                body: JSON.stringify({
                    id, user,type,title,image
                })
            }
        )    }
    static async getFavouritesMoviesList(id:string):Promise<MovieListEntity[]|null>{
        const res = await fetch(`${apiUrl}/favourite/${id}`)
        return await res.json()
    }
    static async getFavouritesActorsList(id:string):Promise<ActorsListEntity[]|null>{
        const res = await fetch(`${apiUrl}/favourite/actor/${id}`)
        return await res.json()

    }


    static async removeFromFavouriteList(id: string, user: string,type:string): Promise<void> {
        await fetch(`${apiUrl}/favourite`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'

                },
                body: JSON.stringify({
                    id, user,type
                })
            }
        )    }


    static async getAllByTitle(title: string, lang = 'en'): Promise<Response> {
        const res = await fetch(`https://imdb-api.com/${lang}/API/SearchMovie/${imdbApiKey}/${title}`);
        const data = await res.json()
        return data as Response
    };

    static async getAllSeriesByTitle(title: string, lang = 'en'): Promise<Response> {
        const res = await fetch(`https://imdb-api.com/${lang}/API/SearchSeries/${imdbApiKey}/${title}`);
        const data = await res.json();
        return data as Response
    };

    static async getComingSoonMovies(lang = 'en'): Promise<NowInCinemasMovieEntity[]> {
        const res = await fetch(`https://imdb-api.com/${lang}/API/ComingSoon/${imdbApiKey}`);
        const data = await res.json();


        return data.items as NowInCinemasMovieEntity[];
    }

    static async nowInCinemas(lang = 'en'): Promise<NowInCinemasMovieEntity[]> {
        const res = await fetch(`https://imdb-api.com/${lang}/API/InTheaters/${imdbApiKey}`);
        const result = await res.json();
        const data = result.items as NowInCinemasMovieEntity[]
        return data;
    }

    static async getOneMovieById(id: string, lang = 'en'): Promise<SingleMovieSpecific> {
        const res = await fetch(`https://imdb-api.com/${lang}/API/Title/${imdbApiKey}/${id}/FullActor, FullCast, Posters, Images, Trailer, Ratings, Wikipedia`);
        const data = await res.json()
        return data as SingleMovieSpecific;
    }
    static async getYouTubeTrailer(id:string):Promise<YoutubeTrailer>{
        const res = await  fetch(`https://imdb-api.com/en/API/YouTubeTrailer/${imdbApiKey}/${id}`);
        const data = res.json()
        return data as unknown as YoutubeTrailer

    }


    static async findActorByName(name: string, lang = 'en'): Promise<Response> {
        const res = await fetch(`https://imdb-api.com/en/API/SearchName/${imdbApiKey}/${name}`)
        const data = await res.json();


        return data as Response
    }

    static async findActorById(id: string, lang = 'en'): Promise<any[]> {
        const res = await fetch(`https://imdb-api.com/${lang}/API/Name/${imdbApiKey}/${id}`);
        const data = await res.json();

        console.log(data)
        return data
    }


}