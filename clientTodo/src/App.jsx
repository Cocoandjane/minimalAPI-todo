import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import { useState } from 'react'
import { TodoContext } from './context/TodoContext'
import axios from 'axios'
import { useEffect } from 'react'

export default function App() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    axios.get('/api/todoitems')
      .then(res => {
        setTodos(res.data)
      }
      )
  }, [])

  const [todo, setTodo] = useState({ title: '', description: '', completed: false, createdAt: Date.now().toString() })



  function handleComplete(id) {
    console.log(id)
    const newTodos = [...todos]
    const ttodo = newTodos.find(todo => todo.id === id)
    ttodo.completed = !ttodo.completed
    axios.put(`/api/todoitems/${id}`, ttodo)
    setTodos(newTodos)
  }

  function handleDelete(id) {
    axios.delete(`/api/todoitems/${id}`)
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
  }


  function handleSubmit() {
    if (todo?.hasOwnProperty('id')) {
      axios.put(`/api/todoitems/${todo.id}`, todo)
      setTodos(prevTodos => {
        return prevTodos.map(t => {
          if (t.id === todo.id) {
            return { ...todo }
          }
          return t
        })
      })

    } else {
      console.log(todo)
      axios.post('/api/todoitems', todo)
      .then(res => {
        console.log(res.data)
        setTodos(prevTodos => {
          return [...prevTodos, { id: res.data.id, title: todo.title, description: todo.description, completed: false, createdAt: Date.now() }]
        })
      })

    }
    setTodo({ title: '', description: '' })
  }

  return (
    <TodoContext.Provider value={{ todo, setTodo }}>
      <TodoForm onSubmit={handleSubmit} />
      <TodoList onComplete={handleComplete} onDelete={handleDelete} todos={todos} />
    </TodoContext.Provider>


  )
}