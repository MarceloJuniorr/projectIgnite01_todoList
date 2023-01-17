import styles from './NewTask.module.css'
import { ChangeEvent, FormEvent, useState } from 'react'
import plus from '../assets/plus.svg'

interface NewTaskProps {
    onCreateTask: (newTask: string) => void
}

export function NewTask({onCreateTask}: NewTaskProps) {
    const [NewTask, setNewTask] = useState('')
    

    function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
        setNewTask(event.target.value)
       }

    function handleCreateNewTask(event: FormEvent) {
        event.preventDefault();
        onCreateTask(NewTask)
        setNewTask('')
    }

    return (
        <form className={styles.form}  onSubmit={handleCreateNewTask}>
            <input 
                type="text" 
                placeholder='Adicione uma nova tarefa'
                onChange={handleNewTaskChange}
                value={NewTask}
                required
            />
            <button type="submit">
                Criar 
                <img src={plus} alt="plus.svg" />
            </button>

        </form>
    )
}