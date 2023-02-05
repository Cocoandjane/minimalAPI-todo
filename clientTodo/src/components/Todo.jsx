import React, { useContext } from 'react'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineCheckSquare, AiOutlineCloseSquare } from 'react-icons/ai'
import { TodoContext } from '../context/TodoContext'

export default function Todo({ id, title, completed, createdAt, description, onComplete, onDelete }) {
    const { todo, setTodo } = useContext(TodoContext);

    function handComplete() {
        onComplete(id)
    }

    function handleDelete() {
        onDelete(id)
    }

    var d = new Date(+createdAt).toLocaleDateString("en-US")
    var t = new Date(+createdAt).toLocaleTimeString("en-US")


    return (

        <div className="grid grid-cols-5 items-center border-b border-teal-500 py-2">
            <div > {title}</div>
            <div > {description}</div>
            <div >{d} {t} </div>
            <div className='flex items-center  gap-2'>completed:  <div onClick={handComplete} className='text-teal-500 text-lg  hover:text-teal-800 '> {completed ? <AiOutlineCheckSquare /> : <AiOutlineCloseSquare style={{ color: "red" }} />}</div> </div>

            <div className='flex items-center text-teal-500 hover:text-teal-800 text-lg py-2 px-2 gap-4' >
                <AiOutlineDelete onClick={handleDelete} />
                <AiOutlineEdit onClick={() => setTodo({ id, title, description, completed,createdAt })} />
            </div>

        </div>

    )
}
