
import "bootstrap/dist/css/bootstrap.min.css"
import AppName from  "./components/AppName"
import AddTodo from "./components/AddTodo"
import TodoDetails from "./components/TodoDetails" 
import { useState, useEffect } from "react"
import { TodoContextProvider } from "./context/todo-items-context"
import "./index.css"

function App() {

    const [tasks, setTasks] = useState([]);
    const [nextId, setNextId] = useState(1);
    

    function add(taskName, date){
     const newTask = {name:taskName, date:date, id:nextId, editable:false, completed:false};
    setTasks([...tasks, newTask]);
    setNextId((prev) => prev + 1);
    }

    function handleDelete(id) {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    }
    
    function handleEdit(id, newTodo) {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, name: newTodo } : task
            )
        );
    }
    
    function handleSave(id){
        console.log("saved")
    }
    function toggleComplete(id) {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    }

    useEffect(()=>{
        const todos = JSON.parse(localStorage.getItem("tasks"))
        if(tasks&&tasks.length>0){
            setTasks(todos);
            setNextId(
                Math.max(...storedTasks.map((tasks) => tasks.id), 0) + 1
            );
        }
    }, [])

    useEffect(()=>{
     localStorage.setItem("tasks", JSON.stringify(tasks))
    }, [tasks])

 return <center>
 <AppName />
 <TodoContextProvider value={{tasks:tasks, handleAdd:add, handleDelete:handleDelete, handleEdit:handleEdit,  toggleComplete:toggleComplete}}>
 <AddTodo />
 <TodoDetails task={tasks} />
 </TodoContextProvider>
 </center>
}

export default App
