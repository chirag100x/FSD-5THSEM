import React from 'react'

const App = () => {
  // changable state variable then we use useState hook to change the value of the variable
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
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100vh"}}>
      <h1 style={{backgroundColor:"black",color:"white"}}>counter App</h1>
      <div>{count}</div>
      <button onClick={increment}>increment</button>  
      <button onClick={reset}>reset</button>  
      <button onClick={decrement}>decrement</button>

      </div>
  )
}

export default App
