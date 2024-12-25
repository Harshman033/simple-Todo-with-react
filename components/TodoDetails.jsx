import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import useTodoContext from "../context/todo-items-context";
import { useState } from "react";

function TodoDetails() {
    const { tasks, handleDelete, handleEdit, toggleComplete } = useTodoContext();
    const [editableTaskId, setEditableTaskId] = useState(null); // Tracks which task is editable
    const [editedTodo, setEditedTodo] = useState(""); // Tracks the current task being edited

    if (!tasks || tasks.length === 0) {
        return <p>No tasks available. Add a task to get started!</p>;
    }

    return (
        <>
            {tasks.map((taskItem) => (
                <div key={taskItem.id} className="row mb-3">
                    {/* Task details */}
                    <div
                        className={`col-6 col-md-4 themed-grid-col todoText ${
                            taskItem.completed ? "text-decoration-line-through" : ""
                        }`}
                    >
                        <input
                            type="checkbox"
                            onChange={() => toggleComplete(taskItem.id)}
                            checked={taskItem.completed}
                        />
                        {editableTaskId === taskItem.id ? (
                            <input
                                className="editableBg"
                                type="text"
                                value={editedTodo}
                                onChange={(e) => setEditedTodo(e.target.value)}
                                autoFocus
                            />
                        ) : (
                            <span>{taskItem.name}</span>
                        )}
                    </div>

                    {/* Task date */}
                    <div className="col-4 col-md-4 themed-grid-col">{taskItem.date}</div>

                    {/* Action buttons */}
                    <div className="col-2 col-md-4 themed-grid-col">
                        <button
                            className="btn btn-danger rounded-pill px-2 m-1"
                            type="button"
                            onClick={() => handleDelete(taskItem.id)}
                        >
                            <MdDeleteOutline />
                        </button>
                        {editableTaskId === taskItem.id ? (
                            <button
                                className="btn btn-success rounded-pill px-2"
                                type="button"
                                onClick={() => {
                                    handleEdit(taskItem.id, editedTodo); // Save changes
                                    setEditableTaskId(null); // Exit edit mode
                                }}
                            >
                                <TiTick />
                            </button>
                        ) : (
                            <button
                                className="btn btn-warning rounded-pill px-2"
                                type="button"
                                onClick={() => {
                                    setEditableTaskId(taskItem.id); // Enter edit mode
                                    setEditedTodo(taskItem.name); // Pre-fill with current name
                                }}
                            >
                                <MdOutlineModeEdit />
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </>
    );
}

export default TodoDetails;
