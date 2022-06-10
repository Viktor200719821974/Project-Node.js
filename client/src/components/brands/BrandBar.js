import React from 'react';
import {observer} from "mobx-react-lite";
import useAuth from "../../hook/useAuth";
import '../../style/style.css';
import BrandCard from "./BrandCard";

const BrandBar = observer(() => {
    const {brands} = useAuth();
    return (
        <div className={'brandBar_div'} >
            { brands && brands.map((brand) =>
                <BrandCard key={brand.id} brand={brand}/>
            )}
        </div>
    );
});

export default BrandBar;