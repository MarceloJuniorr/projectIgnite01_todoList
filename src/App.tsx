import { Header } from './components/Header'
import { NewTask } from './components/NewTask';
import { v4 } from 'uuid';

import styles from './App.module.css';

import './global.css';
import { useEffect, useState } from 'react';
import { TaskList } from './components/TaskList';
interface ITask {
  content: string,
  isActive: boolean,
  id: string
}



export function App() {
  const [tasks, setTasks] = useState<ITask[]>([])

  function setTasksDb(tasks: ITask[]){
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }
  function getTasksDb(){
    let storageTasks = localStorage.getItem('tasks')
    let storageTasksArray: ITask[]  = []
    if (typeof storageTasks === 'string' ) {
        storageTasksArray = JSON.parse(storageTasks)
    }
    return storageTasksArray
  }

  function handleDeleteTask (uuid: string) {
    const newTaskListWithoutDeleteOne = getTasksDb().filter((task) => {
      return task.id !== uuid
    })
    setTasks(() => {
      setTasksDb(newTaskListWithoutDeleteOne)      
      return newTaskListWithoutDeleteOne})
  }

  function handleCheckedTask (uuid: string) {
    const newTaskListModifyIsActive = getTasksDb().map(task => {
      if (task.id === uuid) {      
      
        return ( {
          content: task.content,
          id: task.id,
          isActive: !task.isActive
        })}
      return task
    })
    setTasks(() => {
      setTasksDb(newTaskListModifyIsActive)      
      return newTaskListModifyIsActive})
  }

  function insertNewTask(task: string){
    const uuid = v4()
    const newTask = {id: uuid, content: task, isActive: true}
    const toTasks: ITask[] = [...tasks, newTask]
    setTasksDb(toTasks)
    setTasks(toTasks)
    
  }
  let tasksList: ITask[] = getTasksDb()
  useEffect(() => {
    tasksList  = getTasksDb()

  })

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <NewTask onCreateTask={insertNewTask} />
        <TaskList 
          onDeleteTask={handleDeleteTask} 
          onCheckedTask={handleCheckedTask}
          tasks={tasksList}/>
      </div>
    </div>
  )
}
