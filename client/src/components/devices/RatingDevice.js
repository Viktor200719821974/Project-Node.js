import React, {useEffect, useState} from 'react';
import {FaStar} from "react-icons/fa";
import {getRatingDeviceId} from "../../http/ratingApi";

const RatingDevice = ({deviceId}) => {
    // const [rating, setRating] = useState(null);
    // const [hover, setHover] = useState(null);
    const [rate, setRate] = useState([]);
    useEffect(() => {
        getRatingDeviceId(deviceId).then(data => {
            setRate(data);
        })
    },[]);
    const filter = rate.map(c => c.rate);

    return (
        <div>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                    // <label>
                    //     <input
                    //         type="radio"
                    //         name={'rating'}
                    //         value={ratingValue}
                    //         onClick={() => setRating(ratingValue)}
                    //     />
                        <FaStar
                            size={30}
                            key={i}
                            color={ratingValue <= filter ? '#ffc107' : '#e4e5e9'}
                            // color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                            // onMouseEnter={() => setHover(ratingValue)}
                            // onMouseLeave={() => setHover(null)}
                        />
                    // </label>
                );
            })}
        </div>
    );
};

export default RatingDevice;