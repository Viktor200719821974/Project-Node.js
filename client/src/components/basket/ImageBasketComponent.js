import React from 'react';
import {Image} from "react-bootstrap";
import noImage from "../../image/no_image.jpg";

const ImageBasketComponent = ({image}) => {
    const img = image.map(c => c.imageLocation);

    return (
        <div>
                <Image src={img[0] || noImage} alt={'image device'} style={{width: '150px', height: 'auto', marginRight: '20px'}}/>
        </div>
    );
};

export default ImageBasketComponent;