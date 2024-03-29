import {imdbApiKey} from "../config/apiKeyConfig";

import {
    ActorsListEntity,
    AnswersResponse,
    CommentsResponse,
    MovieListEntity,
    NowInCinemasMovieEntity,
    Response,
    SingleMovieSpecific,
    YoutubeTrailer,
} from 'types';

import {apiUrl} from "../config/api";

export class MovieFinder {

    static async changeUserAvatar(id: string, avatar: number) {
        await fetch(`${apiUrl}/user/${id}`, {

            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({avatar})
        })

    }

    static async deleteUserAccount(userName: string, userId: string) {
        const data = await fetch(`${apiUrl}/user`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({
                userName,
                userId,
            })
        })

        return data.json()

    }

    static async changeUserPassword(userId: string, newPassword: string) {
        const data = await fetch(`${apiUrl}/user/change_password/${userId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({password: newPassword})
        })
        return data.json()
    }


    static async whereToWatch(title: string, imdbId: string, lang: string, country: string) {
        try {
            const res = await fetch(`https://streaming-availability.p.rapidapi.com/v2/search/title?title=${title}&country=${country}&type=movie&output_language=${lang}`, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'eee3e0efbemsh23dcfc7e2f8b735p1dbd2fjsn91a0da94641f',
                    'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
                }
            })
            const data = await res.json()
            const found = data.result.filter((el: { imdbId: string; }) => el.imdbId === imdbId)
            return found[0].streamingInfo
        } catch (e) {

            return null;
        }


    }

    static async dislikeComment(commentId: string, user: string, type: string) {
        const dislikedComment = await fetch(`${apiUrl}/comments/likes`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({
                commentId,
                user,
                type,
            })

        })

        return dislikedComment.json()
    }

    static async likeComment(commentId: string, user: string, type: string) {
        const likedComment = await fetch(`${apiUrl}/comments/likes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({
                commentId,
                user,
                type,
            })

        })

        return likedComment.json()

    }

    static async editAnswerForComment(id: string, comment: string) {
        const editAnswer = await fetch(`${apiUrl}/comments/answers/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({
                comment,
            })

        })

        return editAnswer.json();

    }

    static async deleteAnswerForComment(id: string) {
        const deleteAnswer = await fetch(`${apiUrl}/comments/answers`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({
                id,
            })

        })

        return deleteAnswer.json();
    }

    static async getAnswersForComments(id: string) {
        const getComments = await fetch(`${apiUrl}/comments/answers/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'

            },

        })

        return await getComments.json() as AnswersResponse

    }

    static async addAnswerToComment(commentId: string, comment: string, user: string, avatar: number) {
        const sentAnswer = await fetch(`${apiUrl}/comments/answers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({
                mainCommentId: commentId,
                comment,
                user,
                avatar,
            })
        })

        return sentAnswer.json()

    }

    static async getComments(id: string, type: string) {
        const getComment = await fetch(`${apiUrl}/comments/${id}/${type}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'

                },

            }
        );
        return await getComment.json() as CommentsResponse;

    }

    static async deleteComment(id: string) {

        const resp = await fetch(`${apiUrl}/comments`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'

                },
                body: JSON.stringify({
                    id: id,

                })
            }
        );

        return await resp.json();


    }

    static async editComment(id: string, comment: string) {
        const response = await fetch(`${apiUrl}/comments`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'

                },
                body: JSON.stringify({
                    newComment: comment,
                    id: id,

                })
            }
        );
        return await response.json();
    }

    static async addComment(id: string, avatar: number, type: string, name: string, comment: string): Promise<any> {

        const response = await fetch(`${apiUrl}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'

                },
                body: JSON.stringify({
                    commented_id: id,
                    avatar,
                    type,
                    name,
                    comment,

                })
            }
        );

        return await response.json();


    };

    static async addToFavouriteList(id: string, user: string, type: string, title: string, image: string): Promise<{ response: string }> {
        const res = await fetch(`${apiUrl}/favourite`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'

                },
                body: JSON.stringify({
                    id, user, type, title, image
                })
            }
        )

        return res.json()
    }

    static async getFavouritesMoviesList(id: string): Promise<MovieListEntity[] | null> {
        const res = await fetch(`${apiUrl}/favourite/${id}`)
        return await res.json()
    }

    static async getFavouritesActorsList(id: string): Promise<ActorsListEntity[] | null> {
        const res = await fetch(`${apiUrl}/favourite/actor/${id}`)
        return await res.json()

    }


    static async removeFromFavouriteList(id: string, user: string, type: string): Promise<{ response: string }> {
        const res = await fetch(`${apiUrl}/favourite`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'

                },
                body: JSON.stringify({
                    id, user, type
                })
            }
        );

        return res.json()
    }


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
        return result.items as NowInCinemasMovieEntity[];
    }

    static async getOneMovieById(id: string, lang = 'en'): Promise<SingleMovieSpecific> {
        const res = await fetch(`https://imdb-api.com/${lang}/API/Title/${imdbApiKey}/${id}/FullActor, FullCast, Posters, Images, Trailer, Ratings, Wikipedia`);
        const data = await res.json()
        return data as SingleMovieSpecific;
    }

    static async getYouTubeTrailer(id: string): Promise<YoutubeTrailer> {
        const res = await fetch(`https://imdb-api.com/en/API/YouTubeTrailer/${imdbApiKey}/${id}`);
        const data = await res.json()
        return data as YoutubeTrailer;

    }


    static async findActorByName(name: string, lang = 'en'): Promise<Response> {
        const res = await fetch(`https://imdb-api.com/${lang}/API/SearchName/${imdbApiKey}/${name}`)
        const data = await res.json();


        return data as Response
    }

    static async findActorById(id: string, lang = 'en'): Promise<any[]> {
        const res = await fetch(`https://imdb-api.com/${lang}/API/Name/${imdbApiKey}/${id}`);
        return await res.json()
    }


}