import React, {useContext} from "react";
import{CommentsEntity,AnswerToComment}from 'types'
import {UserDataContext} from "../../contexts/UserDataContext";

interface Props{
    comment?:CommentsEntity,
    answer?:AnswerToComment,
    handleDeleteComment:(e: any) => Promise<void>,
    handleEditCommentFormOn:(e: any) => Promise<void>,
    type:string,




}
export const SingleCommentComponent = (props:Props)=>
{
    const {comment,answer,handleDeleteComment,handleEditCommentFormOn,type} = props
    const {userData} = useContext(UserDataContext)
    console.log(comment)



    return(
        <>
            {type==='comment'?
       <> {comment?<li key={comment.id}>
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
                    <div className="like"><img src={require('../../assets/img/icon-like.png')} alt=""/> <p className={'counter'}>{comment.liked}</p> </div>
                    <div className="like dislike"><img src={require('../../assets/img/icon-like.png')} alt=""/><p className={'counter'}>{comment.disliked}</p></div>
                </div>
            </div>

        </li>:null}</>:<>{answer?<li key={answer.id}>
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
                            <div className="like"><img src={require('../../assets/img/icon-like.png')} alt=""/> <p className={'counter'}>{answer.liked}</p> </div>
                            <div className="like dislike"><img src={require('../../assets/img/icon-like.png')} alt=""/><p className={'counter'}>{answer.disliked}</p></div>
                        </div>

                    </div>

                </li>:null}</>}
            </>
    )
}