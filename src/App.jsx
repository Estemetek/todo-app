import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([{"id": 1, "text": "Learn React", "done": false}])
  // to test if the state is working:
  console.log(todos)

  // state variable for empty input field
  const [inputText, setInputText] = useState("")

  // state variable for id number starting from 2, since the first todo item has id 1
  //i wanted to try declaring the id variables myself first
  const [id, setID] = useState(2)

  //state variable for filtering, with "all" as the default value
  const [filter, setFilter] = useState("all")

  //variable that holds the result of filtering the 'todos' array based on the value of the 'filter' state variable
  const filteredTodos = todos.filter(todo => {
    if (filter === "all") return true
    if (filter === "active") return !todo.done
    if (filter === "completed") return todo.done
  })

  //function that combines arrays 'todos' and 'inputText' into a new array 'setTodos'
  const addTodo = () => {
    if (inputText.trim() === "") return //guard clause to check if the input field is empty and does not add to the list if it is empty
    setTodos([...todos, {id: id, text: inputText, done: false}])
    //increments the id number by 1 for each new todo item added to the list
    setID(id+1)
    // refreshes the inpute field empty after adding the todo item to the list
    setInputText("")
  }

  //function that toggles the 'done' property of a todo item (true or false)
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => todo.id === id ? {...todo, done: !todo.done} : todo))
  }

  //function that deletes a todo item from the list by filtering out the item with the matching id
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div>
      <h1>Todo List</h1>

      <button onClick={() => setFilter("all")}>all</button>
      <button onClick={() => setFilter("active")}>active</button>
      <button onClick={() => setFilter("completed")}>completed</button>

      {/* takes user input by making use of the new state variable "inputText" */}
      <input
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      {/* passes the function 'addTodo' as a reference to the onClick event of the button, 
      so that when the button is clicked, the function is executed and a new todo item is added to the list */}
      <button onClick={addTodo}> ADD ITEM </button>
      <ul>
        {/* wrap the .map() in {} to write JavaScript syntax inside the return() of JSX*/}
        {/* NO MORE STATEMENTS inside return(), ONLY EXPRESSIONS */}
        {filteredTodos.map(todo => 
          <li key={todo.id}>
            <input type="checkbox" checked={todo.done} onChange={() => toggleTodo(todo.id)} />
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>Delete Task</button>
          </li>)}
      </ul>
    </div>
  )
}

export default App
