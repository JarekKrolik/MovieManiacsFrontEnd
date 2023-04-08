import React from "react";
import '../css/UserPanel.css';

interface Props {
    handleRadioChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    countOfAvatars: number,

}

export const AvatarComponent = (props: Props) => {
    const {handleRadioChange, countOfAvatars} = props

    return (
        <label className={'label'}>
            {<div className={'picture input'}><img src={require(`../../assets/img/avatars/${countOfAvatars}.png`)}
                                                   alt=""/></div>}
            <input onChange={handleRadioChange} required value={countOfAvatars} name={'avatar'} type="radio"/>
        </label>
    )
}