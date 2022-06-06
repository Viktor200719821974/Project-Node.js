import React from 'react';
import {observer} from "mobx-react-lite";
import {Card} from "react-bootstrap";
import useAuth from "../../hook/useAuth";
import '../../style/style.css';

const BrandBar = observer(() => {
    const {brands} = useAuth();
    return (
        <div className={'brandBar_div'}>
            { brands && brands.map(brand =>
                <Card
                    // style={{cursor:'pointer', margin: '5px'}}
                    key={brand.id}
                    className={'brandBar_card'}
                    // onClick={() => device.setSelectedBrand(brand)}
                    // border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
                >
                    {brand.name}
                </Card>
            )}
        </div>
    );
});

export default BrandBar;