import React, {Dispatch, SetStateAction, useContext} from "react";
import {CommentsEntity, AnswerToComment, AnswersResponse} from 'types';
import {UserDataContext} from "../../contexts/UserDataContext";
import {MovieFinder} from "../../repository/MovieFinder";

interface Props {
    comment?: CommentsEntity,
    answer?: AnswerToComment,
    handleDeleteComment: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>,
    handleEditCommentFormOn: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>,
    type: string,
    getComments: () => Promise<void>,
    setResponse: Dispatch<SetStateAction<string>>,
    answerId: string,
    setAnswers: Dispatch<SetStateAction<AnswersResponse | null | undefined>>,


}

export const SingleCommentComponent = (props: Props) => {
    const {comment, answer, handleDeleteComment, handleEditCommentFormOn, type, answerId, setAnswers} = props
    const {userData} = useContext(UserDataContext)

    const handleLikeComment = async (e: any) => {
        const data = await MovieFinder.likeComment(e.target.parentElement.id, userData.name, e.target.parentElement.title)
        props.setResponse(data.message)
        await props.getComments()
        if (e.target.parentElement.title === 'answer') {
            setAnswers(await MovieFinder.getAnswersForComments(answerId))
        }
    }

    const handleDislikeComment = async (e: any) => {
        const data = await MovieFinder.dislikeComment(e.target.parentElement.id, userData.name, e.target.parentElement.title)
        props.setResponse(data.message)
        await props.getComments()
        if (e.target.parentElement.title === 'answer') {
            setAnswers(await MovieFinder.getAnswersForComments(answerId))
        }
    }
    return (
        <>
            {type === 'comment' ?
                <> {comment ? <li key={comment.id}>
                                <span><div className="avatar">
                            <img src={require(`../../assets/img/avatars/${comment.avatar}.png`)}
                                 alt="user avatar"/>
                            <p>{comment.name}</p>
                        </div></span>
                    <p>{comment.comment}</p><p>{new Date(comment.created_at).toLocaleDateString()}</p>
                    <br/>
                    <div className={'buttons'}>{comment.name === userData.name ? <>

                        <button onClick={handleDeleteComment} id={comment.id}
                                className={'comment-button'}>delete
                        </button>
                        <button onClick={handleEditCommentFormOn} id={comment.id} name={comment.comment}
                                className={'comment-button'}>edit
                        </button>
                    </> : null}
                        <button onClick={handleEditCommentFormOn} id={comment.id} name={'answer'}
                                className={'comment-button'}>answers
                        </button>
                        <div className="like-buttons">
                            <div onClick={handleLikeComment} id={comment.id} title={'comment'} className="like"><img
                                src={require('../../assets/img/icon-like.png')} alt=""/> <p
                                className={'counter'}>{comment.liked}</p></div>
                            <div onClick={handleDislikeComment} id={comment.id} title={'comment'}
                                 className="like dislike"><img src={require('../../assets/img/icon-like.png')} alt=""/>
                                <p className={'counter'}>{comment.disliked}</p></div>
                        </div>

                    </div>

                </li> : null}</> : <>{answer ? <li key={answer.id}>
                                <span><div className="avatar">
                            <img src={require(`../../assets/img/avatars/${answer.avatar}.png`)}
                                 alt="user avatar"/>
                            <p>{answer.user}</p>
                        </div></span>
                    <p>{answer.comment}</p>
                    <p>{new Date(answer.created_at).toLocaleDateString()}</p>
                    <br/>
                    <div className={'buttons'}>{answer.user === userData.name ? <>
                        <button onClick={handleDeleteComment} id={answer.id}
                                name={'answer'}
                                className={'comment-button'}>delete
                        </button>
                        <button onClick={handleEditCommentFormOn} id={answer.id}
                                name={answer.comment}
                                value={'answer'}
                                className={'comment-button'}>edit
                        </button>
                    </> : null}
                        <div className="like-buttons">
                            <div onClick={handleLikeComment} id={answer.id} title={'answer'} className="like"><img
                                src={require('../../assets/img/icon-like.png')} alt=""/> <p
                                className={'counter'}>{answer.liked}</p></div>
                            <div onClick={handleDislikeComment} id={answer.id} title={'answer'}
                                 className="like dislike"><img src={require('../../assets/img/icon-like.png')} alt=""/>
                                <p className={'counter'}>{answer.disliked}</p></div>
                        </div>

                    </div>

                </li> : null}</>}
        </>
    )
}