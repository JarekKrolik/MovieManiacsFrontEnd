import React from "react";
import {Link} from "react-router-dom";
import './css/GoBackBtn.css';

interface Props {
    text: string,
    path: string,
}


export const GoBackBtn = (props: Props) => {


    return <Link className={'goBack'} to={props.path}>{props.text}</Link>
}