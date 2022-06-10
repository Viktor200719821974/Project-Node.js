import React from 'react';
import useAuth from "../../hook/useAuth";

const BrandCard = ({brand}) => {
    const {setSelectedBrand, selectedBrand} = useAuth();
    return (
        <div
            onClick={() => {setSelectedBrand(brand.id)}}
            className={brand.id === selectedBrand ? 'brandBar_card_select': 'brandBar_card'}>
            {brand.name}
        </div>
    );
};

export default BrandCard;