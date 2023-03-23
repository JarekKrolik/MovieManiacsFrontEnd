import React from "react";

interface Props {
    comment: string,
    handleSendComment: (e: React.FormEvent<HTMLFormElement>) => Promise<void>,
    handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
}

export const AddCommentForm = (props: Props) => {
    const {comment, handleSendComment, handleTextChange} = props

    return (
        <div className="add-comment">
            <form className={'register'} onSubmit={handleSendComment}>
                <label>your comment
                    <textarea onChange={handleTextChange} value={comment} required={true}/>
                    <button className="seeMore comment-btn">send</button>
                </label>
            </form>

        </div>
    )
}