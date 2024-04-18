import React, { useState } from 'react'
import { useReducer } from 'react'

const TodoList = () => {
	const [inputValue, setInputValue] = useState('')

	const reducer = (state, action)=>{
      switch (action.type) {
			case 'ADD_TODO':
				return [...state, {
					title: action.payload,
					id: Date.now(),
					isCompleted: false,
				},];
				
			case 'CHECK':
				return state.map((todo)=> todo.id === action.payload ? 
				 {...todo, isCompleted: !todo.isCompleted} : 
				 todo);

			case 'RESET':
				return [];
		
			default:
				return state;
				
		}
	}

	const handleSubmit = (e)=>{
      e.preventDefault();
	}

	const [todos, dispatch] = useReducer(reducer, [])
  
	
	return (
	 <>
	 <h1>Todo list</h1>
	 <form onSubmit={handleSubmit}>
		<input onChange={(e)=>setInputValue(e.target.value)}type="text" />
		<button onClick={()=>dispatch({type: 'ADD_TODO', payload: inputValue})}>
			Add todo</button>
	 </form>
	 <ul>
		{
			todos.map((todo)=>{
           return <li key={todo.id}><input type="checkbox" 
			  onChange={()=>dispatch({type: 'CHECK', payload: todo.id})}/>
			  {todo.title}
			  </li>
			})
		}
	 </ul>
	 <button onClick={()=>dispatch({type: 'RESET'})}>Reset</button>
	 </>
  )
}

export default TodoList