import { useState } from 'react'
import { useEffect } from 'react'

function App() {
  // const [todos, setTodos] = useState([{"id": 1, "text": "Learn React", "done": false}])
  //revised tate varuiable so that it retrieves the string from local storage and converts it back to an array
  // returns an empty array if there is no data in local storage
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")) || [])
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

  useEffect(() => {
    //saves the current state of the 'todos' array to the local storage of the browser as a string
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos]) //the useEffect hook will run whenever the 'todos' state variable changes, 
  // ensuring that the local storage is always up to date with the latest state

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center flex-col">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">My Tasks</h1>

        {/* makes use of conditional styling for these buttons since class changes based on state */}
        <div className="flex gap-2 mb-6">
          <button 
            className={`px-4 py-1.5 rounded-full text-sm ${
              filter === "all" 
                ? "bg-indigo-500 text-white" 
                : "border border-gray-200 text-gray-500"
            }`} 
            onClick={() => setFilter("all")}>All</button>
          <button className={`px-4 py-1.5 rounded-full text-sm ${
              filter === "active" 
                ? "bg-indigo-500 text-white" 
                : "border border-gray-200 text-gray-500"
            }`}  
            onClick={() => setFilter("active")}>Active</button>
          <button className={`px-4 py-1.5 rounded-full text-sm ${
              filter === "completed" 
                ? "bg-indigo-500 text-white" 
                : "border border-gray-200 text-gray-500"
            }`} 
            onClick={() => setFilter("completed")}>Completed</button>
        </div>

        {/* takes user input by making use of the new state variable "inputText" */}
        <div className="flex gap-2 mb-6">
          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none"
          />

          {/* passes the function 'addTodo' as a reference to the onClick event of the button, 
          so that when the button is clicked, the function is executed and a new todo item is added to the list */}
          <button onClick={addTodo} className="bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium"> ADD ITEM </button>
        </div>
        <ul className="flex flex-col gap-2 list-none">
          {/* wrap the .map() in {} to write JavaScript syntax inside the return() of JSX*/}
          {/* NO MORE STATEMENTS inside return(), ONLY EXPRESSIONS */}
          {filteredTodos.map(todo => 
            <li key={todo.id} className="flex items-center gap-3 px-4 py-3 border border-gray-100 rounded-xl">
              <input type="checkbox" checked={todo.done} onChange={() => toggleTodo(todo.id)} />
              <span className={`flex-1 text-sm ${
                todo.done ? "line-through text-gray-400" : "text-gray-700"
              }`}>
                {todo.text}
              </span>
              <button 
                className="text-gray-300 hover:text-red-400 text-lg leading-none"
                onClick={() => deleteTodo(todo.id)}>
                X
              </button>
            </li>)}
        </ul>
      </div>
    </div>
  )
}

export default App
