import React, {Dispatch, SetStateAction} from "react";

interface Props{
    text:string,
    handleSendEditedComment:(e: React.FormEvent<HTMLFormElement>) => Promise<void>,
    handleTextChange:(e: React.ChangeEvent<HTMLTextAreaElement>) => void,
    setEditCommentOn:Dispatch<SetStateAction<boolean>>,
    comment:string,
    setComment:Dispatch<SetStateAction<string>>,
}

export const CommentEditComponent = (props:Props)=>{

    const{handleSendEditedComment,handleTextChange,setEditCommentOn,comment,setComment}=props

    return(
        <form onSubmit={handleSendEditedComment} className={'edit register'}>
            <label>{props.text} <textarea required={true} value={comment} onChange={handleTextChange}></textarea></label>
            <button>send</button>
            <p onClick={() => {
                setEditCommentOn(false)
                setComment('')
            }} className="seeMore comment">exit</p>
        </form>
    )
}