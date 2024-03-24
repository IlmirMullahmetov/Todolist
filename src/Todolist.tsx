import { ChangeEvent, KeyboardEvent, useState } from "react"
import { filterValuesType } from "./App"

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type PropsType = {
  title: string,
  tasks: Array<TaskType>,
  removeTask: (id: string) => void,
  changeFilter: (value: filterValuesType) => void
  addTask: (title: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean) => void
  filter: filterValuesType
}
export function Todolist(props: PropsType) {

  const [error, setError] = useState<string | null>(null)
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>{
    setNewTaskTitle(e.currentTarget.value)
  };
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if(e.charCode === 13){
      props.addTask(newTaskTitle)
      setNewTaskTitle("")
    }
  };
  const addTask = () => {
    if(newTaskTitle.trim() !== ""){
      props.addTask(newTaskTitle.trim())
            setNewTaskTitle("")
    }else {
      setError('Field is required');
    }
  };
  const onAllClickHandler = () => props.changeFilter('all');
  const onActiveClickHandler = () => props.changeFilter('active');
  const onCompletedClickHandler = () => props.changeFilter('completed');

  return (
    <div>
      <div>
        <h3>{props.title}</h3>
        <div>
          <input
            value={newTaskTitle}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            className={error ? "error" : ""}
          />
          <button onClick={addTask}>+</button>
          {error && <div className="error-message">{error}</div>}
        </div>
        <ul>
          {
            props.tasks.map((t) => {
              const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus(t.id, e.currentTarget.checked)
              }
              const onRemoveHandler = () => {
                props.removeTask(t.id)
              }
              return (
                <li key={t.id} 
                    className={t.isDone ? "isdone" : ''}>
                  <input 
                  type="checkbox" 
                  checked={t.isDone}
                  onChange={onChangeHandler}
                   />
                  <span>{t.title}</span>
                  <button onClick={onRemoveHandler}>x</button>
                </li>
              )
            })
          }
        </ul>
        <div>
          <button 
          className={props.filter === "all" ? "active-filter" : ""} 
          onClick={onAllClickHandler}>All
          </button>
          <button
          className={props.filter === "active" ? "active-filter" : ""}
           onClick={onActiveClickHandler}>Active
           </button>
          <button 
          className={props.filter === "completed" ? "active-filter" : ""}
          onClick={onCompletedClickHandler}>Completed
          </button>
        </div>
      </div>
    </div>

  )
}