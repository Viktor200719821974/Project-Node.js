import React, {useState} from 'react';

const Delivery = () => {
    const [type, setType] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [house, setHouse] = useState('');
    const [room, setRoom] = useState('');
    const [comment, setComment] = useState('');
    const [department, setDepartment] = useState('');
    return (
        <div>
            <form>
                <div style={{padding: '10px'}}>
                    <legend>Виберіть спосіб доставки:</legend>
                    <input type="radio"
                           id="deliveryChoice1"
                           name="delivery"
                           value="Самовивіз"
                           onChange={(e) => setType(e.target.value)}
                    />
                        <label htmlFor="deliveryChoice1" style={{marginRight: '10px'}}>Самовивіз</label>

                        <input type="radio"
                               id="deliveryChoice2"
                               name="delivery"
                               value="Курєр"
                               onChange={(e) => setType(e.target.value)}/>
                            <label htmlFor="deliveryChoice2" style={{marginRight: '10px'}}>Кур'єр</label>

                            <input type="radio"
                                   id="deliveryChoice3"
                                   name="delivery"
                                   value="Нова Пошта"
                                   onChange={(e) => setType(e.target.value)}/>
                                <label htmlFor="deliveryChoice3" style={{marginRight: '10px'}}>Нова Пошта</label>
                    <input type="radio"
                           id="deliveryChoice4"
                           name="delivery"
                           value="УкрПошта"
                           onChange={(e) => setType(e.target.value)}/>
                    <label htmlFor="deliveryChoice4" style={{marginRight: '10px'}}>УкрПошта</label>
                </div>
                {type === 'Самовивіз' && <div style={{margin: '10px'}}>
                    <strong>Адреса відбору:</strong>
                        <p>м. Суми, вул. Шевченко 5, <br/>
                        маг. "Побутова техніка" <br/>
                            Пн.-Сб. 08-20 <br/>
                            Нд. вихідний
                        </p>
                </div>}
                {type === 'Курєр' && <div style={{padding: '10px'}}>
                    <legend>Адреса доставки:</legend>
                    <input type="text"
                           value={city}
                           onChange={(e) => setCity(e.target.value)}
                           placeholder={'Місто'}
                           style={{marginBottom: '5px'}}
                    />
                    <br/>
                    <input type="text"
                           value={street}
                           onChange={(e) => setStreet(e.target.value)}
                           placeholder={'Вулиця'}
                           style={{marginBottom: '5px'}}
                    />
                    <br/>
                    <input type="number"
                           value={house}
                           onChange={(e) => setHouse(e.target.value)}
                           placeholder={'Будинок №'}
                           style={{marginBottom: '5px'}}
                    />
                    <br/>
                    <input type="number"
                           value={room}
                           onChange={(e) => setRoom(e.target.value)}
                           placeholder={'Квартира №'}
                           style={{marginBottom: '5px'}}
                    />
                    <br/>
                    <textarea id="text_box"
                              cols="23"
                              rows="2"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              placeholder={'Коментар для курьєра'}/>
                </div>}
                {type === 'Нова Пошта' && <div style={{padding: '10px'}}>
                    <legend>Адреса доставки:</legend>
                    <input type="text"
                           value={city}
                           onChange={(e) => setCity(e.target.value)}
                           placeholder={'Місто'}
                           style={{marginBottom: '5px'}}
                    />
                    <br/>
                    <input type="number"
                           value={department}
                           onChange={(e) => setDepartment(e.target.value)}
                           placeholder={'Відділення №'}
                           style={{marginBottom: '5px'}}
                    />
                </div>}
                {type === 'УкрПошта' && <div style={{padding: '10px'}}>
                    <legend>Адреса доставки:</legend>
                    <input type="text"
                           value={city}
                           onChange={(e) => setCity(e.target.value)}
                           placeholder={'Місто'}
                           style={{marginBottom: '5px'}}
                    />
                    <br/>
                    <input type="number"
                           value={department}
                           onChange={(e) => setDepartment(e.target.value)}
                           placeholder={'Відділення №'}
                           style={{marginBottom: '5px'}}
                    />
                </div>}
            </form>
        </div>
    );
};

export default Delivery;