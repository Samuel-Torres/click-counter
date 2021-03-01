import React, { useState } from 'react';
import './App.css';
 
function App() {
  const [ count, setCount ] = useState(0)
  const [ error, setError ] = useState('')

  const handleDecrementClick = () => {
    if(count > 0){
      setError('')
      setCount(count - 1)
    } else if(count === 0 && error.length === 0){
      setError('Count can not go below zero!')
    }
  }

  const handleSetError = () => setError('')

  return (
    <div data-test="component-app" className="App">
        <h1 data-test="counter-display">
          The counter is currently&nbsp;
          <span data-test="count">{count}</span>
        </h1>
        <button 
          data-test="increment-button"
          onClick={() => setCount(count + 1)}
          >Increment counter</button>
        <button
          data-test="decrement-button"
          onClick={handleDecrementClick}
        >Decrement counter</button>
        <br></br>
        {count === 0 && error.length > 0 ? <span data-test='error-message'>{error}</span> : () => handleSetError()}
    </div>
  );
}

export default App;
