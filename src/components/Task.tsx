import styles from './Task.module.css'
import checked from '../assets/checked.svg'
import unchecked from '../assets/unchecked.svg'
import { Trash } from 'phosphor-react'

import { useState } from 'react'

interface ITask {
    task:{
        content: string,
        isActive: boolean,
        id: string},
    onDeleteTask: (id: string) => void,
    onCheckedTask: (id: string) => void
  }


export function Task({task, onDeleteTask, onCheckedTask}: ITask) {
function handleCheckedTask(){
    onCheckedTask(task.id)
}

    function handleDeleteTask() {
         onDeleteTask(task.id)
    }
    return (
        <div className={styles.Task}>
            <label className={styles.checkbox}>
            <input 
                type="checkbox" 
                id={task.id} 
                checked={task.isActive}
                onChange={handleCheckedTask}/>

            {task.isActive ?  <img src={unchecked}/> : <img src={checked}/> }
                
            </label>

            <p className={task.isActive ? styles.ActiveText : styles.NotActiveText} >{task.content}</p>
            <button
                onClick={handleDeleteTask}>
                <Trash size={24} />

            </button>
        </div>
    )

}