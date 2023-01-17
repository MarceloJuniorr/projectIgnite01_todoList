import { useEffect, useState } from 'react'
import { Task } from './Task'
import styles from './TaskList.module.css'
import { TodoEmpty } from './TodoEmpty'

interface ITask {
    content: string,
    isActive: boolean,
    id: string
  }

interface ITaskList {
    onCheckedTask: (uuid: string) => void,
    onDeleteTask: (uuid: string) => void,
    tasks: ITask[]
}



export function TaskList({ tasks, onDeleteTask, onCheckedTask}: ITaskList) {
    

    const [countActive, setCountAcive] = useState(0)
    function handleDeleteTask(uuid: string) {
        onDeleteTask(uuid)
    }
    function handleCheckedTask(uuid: string) {
        onCheckedTask(uuid)
    }
    function countChecked() {
        let count = 0
        tasks.map((task) => {
            if (!task.isActive) {
                count = count + 1
            }
        })
        setCountAcive(count)
    }

    useEffect(() => {
        countChecked()
    })



    function List() {
        return (
            <div>
            {tasks.map(task => { 
                return(
                    <div key={task.id}>
                        <Task 
                            task={task} 
                            onDeleteTask={handleDeleteTask} 
                            onCheckedTask={handleCheckedTask}/>
                    </div>                       
                )
            })}
        </div>
        )
    }

    return(
        <div className={styles.TaskList}>
            <header>
                <p className={styles.CreatedTasks}>Tarefas Criadas <span>{tasks.length}</span></p>
                <p className={styles.CheckedTasks}>Concluídas {tasks.length === 0 ? <span>{tasks.length}</span>  : <span>{countActive} de {tasks.length}</span> 
                }</p>

            </header>

            {tasks.length !== 0 ? <List /> : <TodoEmpty/>}

        </div>
    )
}