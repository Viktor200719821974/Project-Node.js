import React from 'react';

const Delivery = ({
                      setType, setCity, setStreet, setHouse, setRoom, setComment, setDepartment, type, city, street,
                      house, room, comment, department
                  }) => {
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
                               value="Кур'єр"
                               onChange={(e) => setType(e.target.value)}/>
                            <label htmlFor="deliveryChoice2" style={{marginRight: '10px'}}>Кур'єр</label>

                            <input type="radio"
                                   id="deliveryChoice3"
                                   name="delivery"
                                   value="НоваПошта"
                                   onChange={(e) => setType(e.target.value)}/>
                                <label htmlFor="deliveryChoice3" style={{marginRight: '10px'}}>НоваПошта</label>
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
                {type === "Кур'єр" && <div style={{padding: '10px'}}>
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
                              placeholder={"Коментар для кур'єра"}/>
                </div>}
                {type === 'НоваПошта' && <div style={{padding: '10px'}}>
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