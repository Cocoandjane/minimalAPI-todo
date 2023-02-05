import React from 'react'
import Todo from './Todo'

export default function TodoList({todos, onComplete, onDelete}) {

    return (
        <div>
            {todos.map(todo => {
                return <Todo
                    onComplete={onComplete}
                    onDelete={onDelete}
                    key={todo.id}
                    id={todo.id}
                    description={todo.description}
                    title={todo.title}
                    createdAt={todo.createdAt}
                    completed={todo.completed} />
            })}
        </div>
    )
}
