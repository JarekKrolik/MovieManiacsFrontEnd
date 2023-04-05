import React, {Dispatch, SetStateAction, useEffect} from "react";

interface Props {
    text: string,
    handleSendAnswerToComment: (e: React.FormEvent<HTMLFormElement>) => Promise<void>,
    setSendAnswerOn: Dispatch<SetStateAction<boolean>>,
    handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
    setComment: Dispatch<SetStateAction<string>>,
    comment: string,
}

export const AnswerCommentComponent = (props: Props) => {
    const {handleTextChange, setComment, setSendAnswerOn, comment, handleSendAnswerToComment} = props
    useEffect(() => {
        setComment('')
    }, [])

    return (
        <form onSubmit={handleSendAnswerToComment} className={'edit register'}>
            <label>{props.text} <textarea required={true} value={comment}
                                          onChange={handleTextChange}></textarea></label>
            <button>send</button>
            <p onClick={() => {
                setSendAnswerOn(false)
                setComment('')
            }} className="seeMore comment">exit</p>
        </form>
    )
}