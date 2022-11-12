import React from 'react'

export default function Todo({todo , toggleTodo}) {
    function  addTodo(){
        toggleTodo(todo.id)
    }
    return (
        <div>
            <label>
                {/* checked means the value of the checkbox */}
                <input type={'checkbox'} checked={todo.complete} onChange={addTodo}/>
                {todo.name}
            </label>
        </div>
    )
}
