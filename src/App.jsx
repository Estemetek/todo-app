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

  //function that combines arrays 'todos' and 'inputText' into a new array 'setTodos'
  const addTodo = () => {
    setTodos([...todos, {id: id, text: inputText, done: false}])
    //increments the id number by 1 for each new todo item added to the list
    setID(id+1)
    // refreshes the inpute field empty after adding the todo item to the list
    setInputText("")
  }

  return (
    <div>
      <h1>Todo List</h1>

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
        {todos.map(todo => <li key={todo.id}>{todo.text}</li>)}
      </ul>
    </div>
  )
}

export default App
