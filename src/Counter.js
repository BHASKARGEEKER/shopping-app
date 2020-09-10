import React, { useState } from 'react';

export const Counter = (props) => {

    const { quantity } = props;
    const [count, setCount] = useState(quantity);
    const [time, setTime] = useState(new Date())

    return (
        <div>

            <button
                className='btn btn-secondary'
                onClick={() => { setCount(count-1) }}
                disabled={count == 1}
            >-</button>

            <p>Quantity is {count}</p>

            <button
                className='btn btn-secondary'
                onClick={() => { setCount(count+1) }}
            >+</button>
        </div>
    )
} 