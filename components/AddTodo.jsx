import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import useTodoContext from "../context/todo-items-context";

function AddTodo (){
const {handleAdd} = useTodoContext();
const [taskName, setTaskName] = useState("");
const [taskDate, setTaskDate] = useState("");

function handleNameChange(event){
  setTaskName(event.target.value);
}

function handleDateChange(event){
  setTaskDate(event.target.value);
}
 
function handleClick(){
handleAdd(taskName, taskDate);
setTaskName("");
setTaskDate("");
}

return <div class="row mb-3 text-center">
     <div class="col-6 col-md-4 themed-grid-col"><input  type="text" placeholder="enter your to-do" onChange={handleNameChange} value={taskName}/></div>
     <div class="col-4 col-md-4 themed-grid-col"><input  type="date" onChange={handleDateChange} value={taskDate} /></div>
     <div class="col-2 col-md-4 themed-grid-col"><button className="btn btn-success rounded-pill px-3" type="button" onClick={handleClick}><IoIosAddCircleOutline /></button></div>
   </div>
}
export default AddTodo;