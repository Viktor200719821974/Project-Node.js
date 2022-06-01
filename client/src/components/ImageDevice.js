import React from 'react';
import {Image} from "react-bootstrap";

const ImageDevice = ({image}) => {
    return (
        <>
            <Image width={300} height={300} src={image}/>
        </>
    );
};

export default ImageDevice;