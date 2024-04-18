import React, { useState } from 'react'
import { useReducer } from 'react'
import styles from './TodoList.module.css'

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
		dispatch({type: 'ADD_TODO', payload: inputValue})
		setInputValue("")
	}

	const [todos, dispatch] = useReducer(reducer, [])
  
	
	return (
	 <>
	 <h1>Todo list</h1>
	 <form onSubmit={handleSubmit}>
		<input onChange={(e)=>setInputValue(e.target.value)}type="text" value={inputValue} />
		<button>Add todo</button>
	 </form>
	 <ul>
		{
			todos.map((todo)=>{
           return <li key={todo.id} className={todo.isCompleted ? styles.todoCompleted: styles.todo}><input type="checkbox" 
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