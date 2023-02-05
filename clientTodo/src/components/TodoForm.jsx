import React, { useRef,useContext } from 'react'
import { TodoContext } from '../context/TodoContext'

export default function TodoForm({ onSubmit}) {
  const {todo, setTodo} = useContext(TodoContext);


  function handleSubmit() {
    onSubmit()  
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-lg py-4 px-2"> Jane's Todo App</h1>
        <h3 className="text-base text-gray-700 py-1 px-2">todo apps help you to organize your tasks, so use it.</h3>
      </div>
      <div className="grid place-content-center gap-1 md:grid-cols-2">
        <div className="hidden md:inline-flex my-10 md:ml-10 shadow rounded-sm w-full  justify-center">
          <img src="https://picsum.photos/200" alt="Logo" className="object-none object-center" />
        </div>

        <form className="my-10 md:mr-10 bg-white shadow rounded-sm px-10 py-5">

          <div className=" items-center border-b border-teal-500 py-2">
            <input onChange={(e) => setTodo({ ...todo, title: e.target.value })}
            value={todo.title}  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Todo Title"/>
          </div>

          <div className=" items-center border-b border-teal-500 py-2">
            <textarea onChange={(e) => setTodo({ ...todo, description: e.target.value })}
            value={todo.description}  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Todo Description"/>
          </div>

          <div className="flex justify-end py-2">
            <button onClick={handleSubmit}  className=" flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
            {todo.hasOwnProperty('id')? 'Update Todo' : 'Add todo'}
            </button>

            <button onClick={()=> { setTodo({ title: '', description: ''})}} className=" flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
