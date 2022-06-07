import React from 'react';
import {Image} from "react-bootstrap";

const ImageCard = ({image}) => {
    return (
        <div>
            <Image width={150} height={150} src={image}/>
        </div>
    );
};

export default ImageCard;