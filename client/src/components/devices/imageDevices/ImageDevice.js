import React, {useState} from 'react';
import {Image} from "react-bootstrap";
import ImageModal from "../../../modal/imageDeviceModal/ImageModal";

const ImageDevice = ({image, id, setStatusResponse, deviceId}) => {
    const [imageMore, setImageMore] = useState(false);
    return (
        <>
            <Image
                width={300}
                height={'300'}
                className="d-block w-100"
                style={{cursor: 'pointer', objectFit: 'contain'}}
                src={image}
                alt='image device'
                onClick={() => setImageMore(true)}
            />
                <ImageModal
                    show={imageMore}
                    onHide={() => setImageMore(false)}
                    image={image}
                    id={id}
                    setStatusResponse={setStatusResponse}
                    deviceId={deviceId}
                />
        </>
    );
};

export default ImageDevice;