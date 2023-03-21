import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import {CommentsResponse} from 'types'
import "../css/CommentsComponent.css"
import {MovieFinder} from "../../repository/MovieFinder";
import {Spinner} from "../Spinner";
import {UserDataContext} from "../../contexts/UserDataContext";
import {AllDataSwitches} from "./AllDataComponent";

interface Props {
    id: string;
    offButton: Dispatch<SetStateAction<AllDataSwitches>>;
};

export const CommentsComponent = (props: Props) => {

    const [comments, setComments] = useState<CommentsResponse | null>()
    const {userData} = useContext(UserDataContext)
    const [comment, setComment] = useState('')
    const [response, setResponse] = useState('')
    const [editCommentOn, setEditCommentOn] = useState(false)
    const [editedId, setEditedId] = useState('')

    const getComments = async () => {
        setComment('')
        const comments = await MovieFinder.getComments(props.id, 'movie');
        setComments(comments)


    }

    const handleSendEditedComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const resp = await MovieFinder.editComment(editedId,comment);
        setEditCommentOn(false)
        setResponse(resp.message)
        await getComments()

    }

    const handleEditCommentFormOn = (e: any) => {
        setEditedId(e.target.id)
        setEditCommentOn(true)
        setComment(e.target.name)



    }

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setResponse('')
        setComment(e.target.value);
    }

    const handleSendComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const resp = await MovieFinder.addComment(props.id, userData.avatar, 'movie', userData.name, comment)
        setResponse(resp.message)
        await getComments()

    }

    const handleDeleteComment = async (e: any) => {

        const response = await MovieFinder.deleteComment(e.target.id);
        setResponse(response.message)
        await getComments()


    }


    const handleRefreshComments = async () => {
        setResponse('')
        await getComments();
    }


    useEffect(() => {
        (async () => {
            await getComments()

        })()
    }, [])


    return (<>
            {editCommentOn ? <form onSubmit={handleSendEditedComment} className={'edit register'}>
                <label>edit comment <textarea required={true} value={comment} onChange={handleTextChange}></textarea></label>
                <button>edit</button>
                <p onClick={() => {
                    setEditCommentOn(false)
                    setComment('')
                }} className="seeMore comment">exit</p>
            </form> : null}
            <button onClick={() => {
                props.offButton(prev => ({
                    ...prev,
                    comments: !prev.comments,
                }))
            }} className="return">hide full cast
            </button>
            <div className="comments-area">
                {comments ? <ul>
                    {comments.result?.length !== 0 ?
                        comments.result?.map(el => {
                            return (
                                <li key={el.id}>
                                <span><div className="avatar">
                            <img src={require(`../../assets/img/avatars/${el.avatar}.png`)}
                                 alt="user avatar"/>
                            <p>{el.name}</p>
                        </div></span>
                                    <p>{el.comment}</p><p>{new Date(el.created_at).toLocaleDateString()}</p>
                                    <br/>{el.name === userData.name ? <div className={'buttons'}>
                                    <button onClick={handleDeleteComment} id={el.id}
                                            className={'comment-button'}>delete
                                    </button>
                                    <button onClick={handleEditCommentFormOn} id={el.id} name={el.comment}
                                            className={'comment-button'}>edit
                                    </button>
                                </div> : null}
                                </li>
                            )
                        }) : <h3>No comments...</h3>}
                    <button className={'seeMore'} onClick={handleRefreshComments}>refresh</button>
                </ul> : <Spinner returnRoute={'/userMain'}/>}
            </div>
            {response ? <h3 className={'response'}>{response}</h3> : null}
            <div className="add-comment">
                <form className={'register'} onSubmit={handleSendComment}>
                    <label>your comment
                        <textarea onChange={handleTextChange} value={comment} required={true}/>

                        <button className="seeMore">send</button>
                    </label>
                </form>

            </div>
        </>
    )
}