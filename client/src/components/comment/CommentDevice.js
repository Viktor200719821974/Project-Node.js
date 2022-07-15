import React, {useEffect, useState} from 'react';
import {Button, Image} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import star from "../../image/Star 1.png";
import ChangeComment from "../../modal/changeDevice/ChangeComment";
import {deleteRatingDeviceId} from "../../http/ratingApi";

const CommentDevice = ({comment, rate, userName, id, deviceId, setStatusResponse, setError}) => {
    const [admin, setAdmin] = useState(false);
    const [changeComment, setChangeComment] = useState(false);
    const history = useHistory();

    const delComment = () => {
        try {
            deleteRatingDeviceId(id).then(data => {
                if (data === 'Ok'){
                    setStatusResponse(true);
                }
            }).catch(err => {
                if (err.response){
                    setError(err.response.data.message);
                }
            });
        } catch (e) {
            setError(e.message);
        }
    }

    useEffect(() => {
        if (history.location.pathname === `/deviceCardAdmin/${deviceId}`){
            setAdmin(true);
        }
    },[admin]);

    return (
        <div className={'commentDevice_div_main'}>
            <p>{comment}</p>
            <div className={'commentDevice_dive_rate'}>
                {userName} <Image src={star} style={{width:18, height:18}}/>
                {rate}
            </div>
            {admin && <div>
                <Button
                    variant={"outline-warning"}
                    style={{margin: '5px'}}
                    onClick={() => setChangeComment(true)}
                >
                    Змінити
                </Button>
                <ChangeComment
                    show={changeComment}
                    onHide={() => setChangeComment(false)}
                    comment={comment}
                    id={id}
                    setStatusResponse={setStatusResponse}
                />
                <Button
                    variant={"outline-danger"}
                    style={{margin: '5px'}}
                    onClick={delComment}
                >
                    Видалити
                </Button>
            </div>}

        </div>
    );
};

export default CommentDevice;