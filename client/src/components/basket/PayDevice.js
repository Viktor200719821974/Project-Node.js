import React from 'react';

const PayDevice = ({setTypePay, typePay}) => {

    return (
        <div>
            <form>
                <div style={{padding: '10px'}}>
                    <legend>Виберіть спосіб оплати:</legend>
                    <input type="radio"
                           id="payChoice1"
                           name="pay"
                           value="Готівка"
                           onChange={(e) => setTypePay(e.target.value)}
                    />
                    <label htmlFor="payChoice1" style={{marginRight: '10px'}}>Готівка</label>

                    <input type="radio"
                           id="payChoice2"
                           name="pay"
                           value="Банківський переказ"
                           onChange={(e) => setTypePay(e.target.value)}/>
                    <label htmlFor="payChoice2" style={{marginRight: '10px'}}>Банківський переказ</label>

                    {typePay === 'Банківський переказ' && <div
                        style={{width: '250px', marginTop: '10px', marginLeft: '10px'}}>
                        <strong>На цей момент доступна тільки готівкова форма оплати</strong>
                    </div>}
                    {/*<input type="radio"*/}
                    {/*       id="payChoice3"*/}
                    {/*       name="pay"*/}
                    {/*       value="Готівкою при отриманні"*/}
                    {/*       onChange={(e) => setType(e.target.value)}/>*/}
                    {/*<label htmlFor="payChoice3" style={{marginRight: '10px'}}>Готівкою при отриманні</label>*/}
                </div>
            </form>
        </div>
    );
};

export default PayDevice;