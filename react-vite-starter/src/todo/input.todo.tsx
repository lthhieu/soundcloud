import { useState } from "react"


interface IProps {
    todoList: string[];
    setTodoList: (value: string[]) => void
}
const InputTodo = (props: IProps) => {
    const { todoList, setTodoList } = props
    const [todo, setTodo] = useState("")
    const handleCLick = () => {
        setTodoList([...todoList, todo])
    }
    return (<>
        <div><label>Add new todo</label></div>
        <div><input onChange={(e) => setTodo(e.target.value)} /> <button onClick={() => handleCLick()}>Save</button></div>
    </>)
}
export default InputTodo