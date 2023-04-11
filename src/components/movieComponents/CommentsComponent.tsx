import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import {CommentsResponse, AnswersResponse, CommentsEntity, AnswerToComment} from 'types';
import "../css/CommentsComponent.css";
import {MovieFinder} from "../../repository/MovieFinder";
import {Spinner} from "../Spinner";
import {UserDataContext} from "../../contexts/UserDataContext";
import {AllDataSwitches} from "./AllDataComponent";
import {CommentEditComponent} from "./CommentEditComponent";
import {AnswerCommentComponent} from "./AnswerCommentComponent";
import {SingleCommentComponent} from "./SingleCommentComponent";
import {AddCommentForm} from "./AddCommentForm";

interface Props {
    id: string,
    offButton: Dispatch<SetStateAction<AllDataSwitches>>,
}


export const CommentsComponent = (props: Props) => {

    const [comments, setComments] = useState<CommentsResponse | null>()
    const {userData} = useContext(UserDataContext)
    const [comment, setComment] = useState('')
    const [response, setResponse] = useState('')
    const [editCommentOn, setEditCommentOn] = useState(false)
    const [sendAnswerOn, setSendAnswerOn] = useState(false)
    const [editedId, setEditedId] = useState('')
    const [answers, setAnswers] = useState<AnswersResponse | null>()
    const [answeredId, setAnsweredId] = useState<string[]>([])
    const [answerSend, setAnswerSend] = useState(false)
    const [mainCommentId, setMainCommentId] = useState('')
    const [answerId, setAnswerId] = useState('')
    const [paginatedComments, setPaginatedComments] = useState<CommentsEntity[] | []>()
    const [paginatedAnswers, setPaginatedAnswers] = useState<AnswerToComment [] | []>()
    const [numberOfDisplayedComments, setNumberOfDisplayedComments] = useState(5)
    const [numberOfDisplayedAnswers, setNumberOfDisplayedAnswers] = useState(5)


   const getAnswers = async (id:string)=>{
       const responseAnswers = await MovieFinder.getAnswersForComments(id)
       const answersSlicedArray = responseAnswers.result.slice(0, numberOfDisplayedAnswers)
       setPaginatedAnswers(answersSlicedArray)
    }

    const getComments = async () => {
        setComment('')
        const comments = await MovieFinder.getComments(props.id, 'movie')
        setComments(comments)
        const commentsSlicedArray = comments.result.slice(0, numberOfDisplayedComments)
        setPaginatedComments(commentsSlicedArray)
        if (mainCommentId) (await MovieFinder.getAnswersForComments(mainCommentId))
    }

    const handleSendAnswerToComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const resp = await MovieFinder.addAnswerToComment(editedId, comment, userData.name, userData.avatar)
        setSendAnswerOn(false)
        setResponse(resp.message)
        setComment('')
        const data = await MovieFinder.getAnswersForComments(editedId)
        const answersSlicedArray = data.result.slice(0, numberOfDisplayedAnswers)
        setAnswers(data)
        setPaginatedAnswers(answersSlicedArray)

    }

    const handleShowMoreComments = async () => {
        setNumberOfDisplayedComments(prev => 5 + prev)
    }

    const handleShowMoreAnswers = async () => {
        setNumberOfDisplayedAnswers(prev => 5 + prev)
    }

    const handleSendEditedComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (answerSend) {

            const resp = await MovieFinder.editAnswerForComment(editedId, comment)
            setResponse(resp.message)
            setComment('')
            setEditCommentOn(false)
            const data = await MovieFinder.getAnswersForComments(mainCommentId)
            const answersSlicedArray = data.result.slice(0, numberOfDisplayedAnswers)
            setAnswers(data)
            setPaginatedAnswers(answersSlicedArray)

            await getComments()

        } else {
            const resp = await MovieFinder.editComment(editedId, comment)
            setEditCommentOn(false)
            setResponse(resp.message)
            await getComments()
        }

    }

    const handleCloseAnswer = (e: any) => {
        const newArr = answeredId.filter(el => el !== e.target.id)
        setAnsweredId(newArr)
        setEditedId('')
    }

    const handleEditCommentFormOn = async (e: React.MouseEvent<HTMLButtonElement>) => {

        if (e.currentTarget.name === 'answer') {
            setMainCommentId(e.currentTarget.id)
            setEditedId(e.currentTarget.id)
            setAnswerId(e.currentTarget.id)
            const arr = answeredId
            arr.push(e.currentTarget.id)
            setAnsweredId(arr)
            const data = await MovieFinder.getAnswersForComments(e.currentTarget.id)
            const answersSlicedArray = data.result.slice(0, numberOfDisplayedAnswers)
            setAnswers(data)
            setPaginatedAnswers(answersSlicedArray)


        } else {
            if (e.currentTarget.value === 'answer') {
                setAnswerSend(true)
                setEditedId(e.currentTarget.id)

            } else {
                setEditedId(e.currentTarget.id)
                setAnswerSend(false)

            }

            setEditCommentOn(true)
            setComment(e.currentTarget.name)

        }
    }

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {

        setResponse('')
        setComment(e.target.value)
    };


    const handleSendComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const resp = await MovieFinder.addComment(props.id, userData.avatar, 'movie', userData.name, comment)
        setResponse(resp.message)
        await getComments()

    }

    const handleDeleteComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (e.currentTarget.name === 'answer') {
            const response = await MovieFinder.deleteAnswerForComment(e.currentTarget.id)
            const responseAnswers = await MovieFinder.getAnswersForComments(mainCommentId)
            const answersSlicedArray = responseAnswers.result.slice(0, numberOfDisplayedAnswers)
            setPaginatedAnswers(answersSlicedArray)
            setAnswers(responseAnswers)
            setResponse(response.message)
        } else {
            const response = await MovieFinder.deleteComment(e.currentTarget.id)
            setResponse(response.message)
            await getComments()

        }
    }


    const handleRefreshComments = async () => {
        setResponse('')
        await getComments()
    }

    useEffect(() => {
        (async () => {
            if (mainCommentId) {
                const responseAnswers = await MovieFinder.getAnswersForComments(mainCommentId)
                const answersSlicedArray = responseAnswers.result.slice(0, numberOfDisplayedAnswers)
                setPaginatedAnswers(answersSlicedArray)
            }

        })()

    }, [numberOfDisplayedAnswers])

    useEffect(() => {

        const commentsSlicedArray = comments?.result.slice(0, numberOfDisplayedComments)
        setPaginatedComments(commentsSlicedArray)
    }, [numberOfDisplayedComments])


    useEffect(() => {
        (async () => {
            await getComments()
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
                        paginatedComments?.map(el => {
                            return (<div key={el.id} className="comments-answers">
                                    <SingleCommentComponent
                                        answerId={answerId}
                                        setAnswers={setAnswers}
                                        comment={el}
                                        type={'comment'}
                                        handleDeleteComment={handleDeleteComment}
                                        handleEditCommentFormOn={handleEditCommentFormOn}
                                        getComments={getComments}
                                        setResponse={setResponse}
                                        key={el.id}
                                        getAnswers={getAnswers}
                                    />

                                    {answeredId.includes(el.id) ? <div className="comments-area">
                                        <div
                                            onClick={handleCloseAnswer}
                                            id={el.id}
                                            className="closeBtn">
                                            X
                                        </div>
                                        <button onClick={() => {
                                            setSendAnswerOn(prev => !prev)
                                        }} className="goBack">add answer
                                        </button>

                                        {answers ? <ul>
                                            {answers.result.length === 0 ?
                                                <h3 className={'comments'}>No comments...</h3> :

                                                paginatedAnswers?.map(el => {
                                                    return (
                                                        <SingleCommentComponent type={'answer'}
                                                                                setAnswers={setAnswers}
                                                                                answerId={answerId}
                                                                                answer={el}
                                                                                handleDeleteComment={handleDeleteComment}
                                                                                handleEditCommentFormOn={handleEditCommentFormOn}
                                                                                getComments={getComments}
                                                                                setResponse={setResponse}
                                                                                key={el.id}
                                                                                getAnswers={getAnswers}

                                                        />
                                                    )
                                                })}
                                            <h3 className="counter">{paginatedAnswers?.length} of {answers.result.length} comments</h3>
                                            {answers.result.length <= numberOfDisplayedAnswers ? null :
                                                <button className={'seeMore'}
                                                        onClick={handleShowMoreAnswers}>more</button>}
                                        </ul> : <Spinner returnRoute={'userMain'}/>}

                                    </div> : null}</div>
                            )
                        }) : <h3 className={'comments'}>No comments...</h3>}
                    <h3 className="counter">{paginatedComments?.length} of {comments.result.length} comments</h3>
                    {comments.result.length <= numberOfDisplayedComments ? null :
                        <button className={'seeMore'} onClick={handleShowMoreComments}>more</button>}
                    <button className={'seeMore'} onClick={handleRefreshComments}>refresh</button>
                </ul> : <Spinner returnRoute={'/userMain'}/>}
            </div>
            {response ? <h3 className={'response'}>{response}</h3> : null}
            <AddCommentForm comment={comment} handleSendComment={handleSendComment}
                            handleTextChange={handleTextChange}/>
        </>
    )
}

