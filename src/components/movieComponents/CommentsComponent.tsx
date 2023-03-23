import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import {CommentsResponse, AnswersResponse} from 'types'
import "../css/CommentsComponent.css"
import {MovieFinder} from "../../repository/MovieFinder";
import {Spinner} from "../Spinner";
import {UserDataContext} from "../../contexts/UserDataContext";
import {AllDataSwitches} from "./AllDataComponent";
import {CommentEditComponent} from "./CommentEditComponent";
import {AnswerCommentComponent} from "./AnswerCommentComponent";

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
    const [sendAnswerOn, setSendAnswerOn] = useState(false)
    const [editedId, setEditedId] = useState('')
    const [answers, setAnswers] = useState<AnswersResponse | null>()
    const [answeredId, setAnsweredId] = useState<string[]>([]);

    const getComments = async () => {
        setComment('')
        const comments = await MovieFinder.getComments(props.id, 'movie');
        setComments(comments)


    }

    const handleSendAnswerToComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const resp = await MovieFinder.addAnswerToComment(editedId, comment, userData.name, userData.avatar)
        setSendAnswerOn(false)
        setResponse(resp.message)
        setComment('')
        console.log(userData.name)
        console.log()
        setAnswers(await MovieFinder.getAnswersForComments(editedId))

    }

    const handleSendEditedComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const resp = await MovieFinder.editComment(editedId, comment);
        setEditCommentOn(false)
        setResponse(resp.message)
        await getComments()

    }

    const handleCloseAnswer = (e: any) => {
        const newArr = answeredId.filter(el => el !== e.target.id)
        setAnsweredId(newArr)
        setEditedId('')


    }


    const handleEditCommentFormOn = async (e: any) => {

        if (e.target.name === 'answer') {
            setEditedId(e.target.id)
            const arr = answeredId;
            arr.push(e.target.id);
            setAnsweredId(arr)
            const data = await MovieFinder.getAnswersForComments(e.target.id);
            console.log(data.result)
            setAnswers(data)


        } else {
            setEditedId(e.target.id)
            setEditCommentOn(true)
            setComment(e.target.name)
        }
    }

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {

        setResponse('')
        setComment(e.target.value)
    };


    const handleSendComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const resp = await MovieFinder.addComment(props.id, userData.avatar, 'movie', userData.name, comment)
        setResponse(resp.message)
        await getComments()

    }

    const handleDeleteComment = async (e: any) => {
        if (e.target.name === 'answer') {
            const response = await MovieFinder.deleteAnswerForComment(e.target.id)
            setAnswers(await MovieFinder.getAnswersForComments(editedId))
            setResponse(response.message)
        } else {
            const response = await MovieFinder.deleteComment(e.target.id);
            setResponse(response.message)
            await getComments()

        }
    }


    const handleRefreshComments = async () => {
        setResponse('')
        await getComments();
    }


    useEffect(() => {
        (async () => {
            await getComments()
            // setAnsweredId([])

        })()
    }, [])


    return (<>
            {sendAnswerOn ? <AnswerCommentComponent setSendAnswerOn={setSendAnswerOn}
                                                    text={'send answer'}
                                                    setComment={setComment}
                                                    handleTextChange={handleTextChange}
                                                    comment={comment}
                                                    handleSendAnswerToComment={handleSendAnswerToComment}
            /> : null}

            {editCommentOn ? <CommentEditComponent comment={comment}
                                                   text={'edit comment'}
                                                   setEditCommentOn={setEditCommentOn}
                                                   handleSendEditedComment={handleSendEditedComment}
                                                   handleTextChange={handleTextChange}
                                                   setComment={setComment}
            /> : null}
            <button onClick={() => {
                props.offButton(prev => ({
                    ...prev,
                    comments: !prev.comments,
                }))
            }} className="return">hide comments
            </button>
            <div className="comments-area">
                {comments ? <ul>
                    {comments.result?.length !== 0 ?
                        comments.result?.map(el => {
                            return (<div key={el.id} className="comments-answers">
                                    <li key={el.id}>
                                <span><div className="avatar">
                            <img src={require(`../../assets/img/avatars/${el.avatar}.png`)}
                                 alt="user avatar"/>
                            <p>{el.name}</p>
                        </div></span>
                                        <p>{el.comment}</p><p>{new Date(el.created_at).toLocaleDateString()}</p>
                                        <br/>
                                        <div className={'buttons'}>{el.name === userData.name ? <>
                                            <button onClick={handleDeleteComment} id={el.id}
                                                    className={'comment-button'}>delete
                                            </button>
                                            <button onClick={handleEditCommentFormOn} id={el.id} name={el.comment}
                                                    className={'comment-button'}>edit
                                            </button>
                                        </> : null}
                                            <button onClick={handleEditCommentFormOn} id={el.id} name={'answer'}
                                                    className={'comment-button'}>answers
                                            </button>
                                        </div>

                                    </li>

                                    {answeredId.includes(el.id) ? <div className="comments-area">
                                        <div onClick={handleCloseAnswer} id={el.id} className="closeBtn">X</div>
                                        <button onClick={() => {
                                            setSendAnswerOn(prev => !prev)
                                        }} className="goBack">add answer
                                        </button>

                                        {answers ? <ul>
                                            {answers.result.map(el => {
                                                return (
                                                    <li key={el.id}>
                                <span><div className="avatar">
                            <img src={require(`../../assets/img/avatars/${el.avatar}.png`)}
                                 alt="user avatar"/>
                            <p>{el.user}</p>
                        </div></span>
                                                        <p>{el.comment}</p>
                                                        <p>{new Date(el.created_at).toLocaleDateString()}</p>
                                                        <br/>
                                                        <div className={'buttons'}>{el.user === userData.name ? <>
                                                            <button onClick={handleDeleteComment} id={el.id}
                                                                    name={'answer'}
                                                                    className={'comment-button'}>delete
                                                            </button>
                                                            <button onClick={handleEditCommentFormOn} id={el.id}
                                                                    name={el.comment}
                                                                    className={'comment-button'}>edit
                                                            </button>
                                                        </> : null}

                                                        </div>

                                                    </li>
                                                )
                                            })}
                                        </ul> : <Spinner returnRoute={'userMain'}/>}

                                    </div> : null}</div>
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

