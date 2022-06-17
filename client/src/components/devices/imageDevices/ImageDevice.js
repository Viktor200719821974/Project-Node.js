import React from 'react';
import {Carousel, Image} from "react-bootstrap";
import star from '../../../image/1.jpg';
import start from '../../../image/downloadreej.jpg';

const ImageDevice = ({image}) => {
    return (
        <>
            {/*<Image width={300} height={300} src={image}/>*/}
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={star}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={start}
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </>
    );
};

export default ImageDevice;