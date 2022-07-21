import React, {useEffect, useState} from 'react';
import {Image} from "react-bootstrap";
import noImage from "../../image/no_image.jpg";
import {getImageDeviceId} from "../../http/imageDeviceApi";

const ImageBasketComponent = ({deviceId}) => {
    const [image, setImage] = useState('');

    useEffect(() => {
        try {
            getImageDeviceId(deviceId).then(data => {
                if(data.length > 0){
                    setImage(data[0].imageLocation);
                }
            });
        } catch (e) {
            console.log(e.message);
        }
    },[deviceId]);
    return (
        <div>
            {<Image
                src={image || noImage}
                alt={'image device'}
                style={{width: '150px', height: 'auto', marginRight: '20px'}}/>}
        </div>
    );
};

export default ImageBasketComponent;