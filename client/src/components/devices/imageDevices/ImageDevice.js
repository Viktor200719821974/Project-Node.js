import React from 'react';
import {Carousel, Image} from "react-bootstrap";
import noImage from '../../../image/no_image.jpg';

const ImageDevice = ({image}) => {
    return (
        <>
            {image.length > 0 ? <Carousel>
                {image.map(c => <Carousel.Item key={c.id}>
                    <Image
                        width={300}
                        height={300}
                        className="d-block w-100"
                        src={c.imageLocation}
                        alt='image device'
                    />
                    {/*<Carousel.Caption>*/}
                    {/*    <h3>First slide label</h3>*/}
                    {/*    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>*/}
                    {/*</Carousel.Caption>*/}
                </Carousel.Item>)}
            </Carousel> :  <Image width={300} height={300} src={noImage}/>}
        </>
    );
};

export default ImageDevice;