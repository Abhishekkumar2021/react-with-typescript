import React, { useState } from 'react';
import '../styles/Counter.css'

function Counter() {
    const [count, setCount] = useState<number>(0);
    return <>
        <div className='text'>Current value = <code> {count} </code></div>
        <div className="buttons">
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setCount(count - 1)}>Decrement</button>
            <button onClick={() => setCount(0)}>Reset</button>
        </div>
    </>
}

export default Counter;
    