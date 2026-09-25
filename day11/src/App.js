import React from 'react'

const App = () => {
  
  const [count, setCount] = React.useState(0)

  const increment = () => {
    setCount(count + 1)
    console.log(count)
  }

  const reset = () => {
    setCount(0)
    console.log(count)
  }

  const decrement = () => {
    setCount(count - 1)
    console.log(count) 
  }

  return (
    <div>
      <h1>counter App</h1>
      <button onClick={increment}>increment</button>  
      <button onClick={reset}>reset</button>  
      <button onClick={decrement}>decrement</button>

      </div>
  )
}

export default App
