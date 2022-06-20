import React, {useState} from 'react';
import {FaStar} from "react-icons/fa";

const RatingDevice = ({sendRating, setSendRating}) => {
    // const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    return (
        <div>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                    <label key={i}>
                        <input
                            className={'input_rating_device'}
                            type="radio"
                            name={'rating'}
                            value={ratingValue}
                            onClick={() => setSendRating(ratingValue)}
                        />
                        <FaStar
                            size={30}
                            color={ratingValue <= (hover || sendRating) ? '#ffc107' : '#e4e5e9'}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                        />
                     </label>
                );
            })}
        </div>
    );
};

export default RatingDevice;