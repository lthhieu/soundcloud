
import { useState } from "react"
import InputTodo from "./todo/input.todo"
// import './App.css'

function App() {
  const [todoList, setTodoList] = useState(["todo1", "todo2", "todo3"])

  return (<>
    <InputTodo todoList={todoList} setTodoList={setTodoList} />
    <ul>
      {todoList.map((item, index) => {
        return (<li key={`index-${index}`}>
          {item}
        </li>)
      })}
    </ul>
  </>
  )
}

export default App
