import React from 'react';
import {Table} from "react-bootstrap";

const TestComponent = ({number, device}) => {
    return (
        <>
                <tr>
                    <td>{number}</td>
                    {Array.from({ length: 4 }).map((d, index) => (
                        <td key={index}>{device.map(c => c.name)}</td>
                    ))}
                </tr>
                {/*<tr>*/}
                {/*    <td>2</td>*/}
                {/*    {Array.from({ length: 4 }).map((_, index) => (*/}
                {/*        <td key={index}>Table cell {index}</td>*/}
                {/*    ))}*/}
                {/*</tr>*/}
                {/*<tr>*/}
                {/*    <td>3</td>*/}
                {/*    {Array.from({ length: 4 }).map((_, index) => (*/}
                {/*        <td key={index}>Table cell {index}</td>*/}
                {/*    ))}*/}
                {/*</tr>*/}
        </>
    );
};

export default TestComponent;