import { useState , useRef , useEffect} from "react";
import TodoList from "./TodoList"
import uuidv4 from '../node_modules/uuid/dist/v4'

const LOCAL_STORAGE_KEY = "todoApp.todos"

function App() {
  const [ todos, setTodos ] = useState([])
  const nameRef = useRef()

  useEffect(() =>{
    /* 
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
    localStorage.getItem(LOCAL_STORAGE_KEY) returns a string and
    that will throw an error because in our app we use array functions 
    so we will use JSON.parse to change the string to an array */  
    const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (stored) setTodos(stored)
  },[])

  useEffect(() =>{
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(todos))
  },[todos])

  function toggleTodo(id){
    /* in react we should never directly modify a state variable instead 
    we create a copy before modifying it and then use that copy 
    to set the new state  */
    const newTodos = [...todos]
    /* get the todo that we want to modify */
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function addToList(e){
    let name = nameRef.current.value
    if(name === "") return
    setTodos(prevTodos =>{
      return [...prevTodos,{id : uuidv4() ,name : name, complete : false}]
    })
    nameRef.current.value = null
  }

  function clearTodo(){
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }
  return (
    <>
    <TodoList todos={todos} toggleTodo={toggleTodo}/>
    <input ref={nameRef} type="text" />
    <button onClick={addToList}>Add</button>
    <button onClick={clearTodo}>Clear Complete</button>
    <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  );
}

export default App;
