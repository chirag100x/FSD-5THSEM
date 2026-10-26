import React from 'react'

const App = () => {
  const[tasks, setTasks] = React.useState("");
  const[todo, setTodo] = React.useState([]);
  const[editIndex, setEditIndex] = React.useState(null);
  const addHandler = () => {
    if(tasks===""){
      alert("Please enter a task");
      return;
    }
    if(editIndex !== null){
      const newTodo = [...todo];
      newTodo[editIndex] = tasks;
      setTodo(newTodo);
      setEditIndex(null);
    } else {
      setTodo([...todo, tasks]);
    console.log(todo);
    setTasks("");
    }
    
  }
  const deleteHandler = (index) => {
    console.log(todo[index]);
    const newTodo = todo.filter((data, i) => i !== index);
    setTodo(newTodo);
  }
  const editHandler = (index) => {
    setTasks(todo[index]);
    setEditIndex(index);
  }
  return (
    <div>
      <h1>Todo App</h1>
      <input value={tasks} onChange={(e)=>setTasks(e.target.value)}></input>
      <button onClick={addHandler}>{editIndex !== null ? "Update" : "Add"}</button>
      <br></br>
      
        {todo.map((data, index) => (
          <div key={index}>
            <span>{data}</span>
            <button onClick={()=>editHandler(index)}>edit</button>
            <button onClick={()=>deleteHandler(index)}>delete</button>
            </div>
        ))}
      
    </div>
  )
}

export default App