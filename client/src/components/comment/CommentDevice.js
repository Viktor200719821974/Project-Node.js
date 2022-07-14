import React from 'react';
import {Image} from "react-bootstrap";
import star from "../../image/Star 1.png";

const CommentDevice = ({comment, rate}) => {
    return (
        <div className={'commentDevice_div_main'}>
            {comment}
            <div className={'commentDevice_dive_rate'}>
                <Image src={star} style={{width:18, height:18}}/>
                {rate}
            </div>
        </div>
    );
};

export default CommentDevice;