import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import {CommentsResponse, AnswersResponse} from 'types'
import "../css/CommentsComponent.css"
import {MovieFinder} from "../../repository/MovieFinder";
import {Spinner} from "../Spinner";
import {UserDataContext} from "../../contexts/UserDataContext";
import {AllDataSwitches} from "./AllDataComponent";
import {CommentEditComponent} from "./CommentEditComponent";
import {AnswerCommentComponent} from "./AnswerCommentComponent";
import {SingleCommentComponent} from "./SingleCommentComponent";
import {AddCommentForm} from "./AddCommentForm";

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
    const [answerSend, setAnswerSend] = useState(false)
    const [mainCommentId, setMainCommentId] = useState('')
    const[answerId,setAnswerId]=useState('')

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
        setAnswers(await MovieFinder.getAnswersForComments(editedId))

    }

    const handleSendEditedComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (answerSend) {

            const resp = await MovieFinder.editAnswerForComment(editedId, comment)
            setResponse(resp.message)
            setComment('')
            setEditCommentOn(false)
            setAnswers(await MovieFinder.getAnswersForComments(mainCommentId))
            await getComments()

        } else {
            const resp = await MovieFinder.editComment(editedId, comment);
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
            const arr = answeredId;
            arr.push(e.currentTarget.id);
            setAnsweredId(arr)
            const data = await MovieFinder.getAnswersForComments(e.currentTarget.id);
            setAnswers(data)


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
        e.preventDefault();
        const resp = await MovieFinder.addComment(props.id, userData.avatar, 'movie', userData.name, comment)
        setResponse(resp.message)
        await getComments()

    }

    const handleDeleteComment = async (e:React.MouseEvent<HTMLButtonElement>) => {
        if (e.currentTarget.name === 'answer') {
            const response = await MovieFinder.deleteAnswerForComment(e.currentTarget.id)
            setAnswers(await MovieFinder.getAnswersForComments(mainCommentId))
            setResponse(response.message)
        } else {
            const response = await MovieFinder.deleteComment(e.currentTarget.id);
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

                                  />

                                    {answeredId.includes(el.id) ? <div className="comments-area">
                                        <div
                                            onClick={handleCloseAnswer}
                                            id={el.id}
                                            className="closeBtn">
                                            X</div>
                                        <button onClick={() => {
                                            setSendAnswerOn(prev => !prev)
                                        }} className="goBack">add answer
                                        </button>

                                        {answers ? <ul>
                                            {answers.result.length===0?<h3 className={'comments'}>No comments...</h3>:

                                            answers.result.map(el => {
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

                                                  />
                                                )
                                            })}
                                        </ul> : <Spinner returnRoute={'userMain'}/>}

                                    </div> : null}</div>
                            )
                        }) : <h3 className={'comments'}>No comments...</h3>}
                    <button className={'seeMore'} onClick={handleRefreshComments}>refresh</button>
                </ul> : <Spinner returnRoute={'/userMain'}/>}
            </div>
            {response ? <h3 className={'response'}>{response}</h3> : null}
          <AddCommentForm comment={comment} handleSendComment={handleSendComment} handleTextChange={handleTextChange}/>
        </>
    )
}

