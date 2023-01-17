import { Clipboard } from 'phosphor-react'
import styles from './TodoEmpty.module.css'

export function TodoEmpty() {
    return (
        <div className={styles.TodoEmpty}>
            <Clipboard size={56}/>
            <p>Você ainda não tem tarefas cadastradas</p>
            <span>Crie tarefas e organize seus itens a fazer</span>
        </div>
    )
}