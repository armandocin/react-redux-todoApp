import React from 'react';
import { removeTodo, toggleTodo } from './actionCreators'
import { connect } from 'react-redux';


const handleChangeFilter = (todos, filter) => {
	return todos.filter(t => {
		if (filter === 'SHOW_COMPLETED')
			return t.completed;
		if (filter === 'SHOW_ACTIVE')
			return !t.completed;
		else
			return t;
	})
};

const Todo = ({todo, toggle, onRemove}) => (
		<div className="todo-div">
			<li key={todo.id}
				className="col-sm-3"
				onClick = {toggle}
				style = {
					{
						textDecoration: todo.completed ? 'line-through' : 'none',
						cursor: 'pointer'
					}
				}
			>{todo.text}
				<button 
					className="btn text-danger btn-rm"
					onClick={() => onRemove(todo.id)}
				>
					x
				</button>
			</li>
		</div>
	);

const TodoList = ({todos, onToggle, onRemove}) => {
	const list = todos.map((todo, index) => 	
		<Todo key={index}
			todo={todo}
			toggle={() => onToggle(todo.id)}
			onRemove={onRemove} 
		/>
	);

	return (<ul>{list}</ul>);
}
const mapStateToProps = (state) => {
	return {
		todos: handleChangeFilter(state.todos, state.filter)
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		onToggle: (id) => dispatch(toggleTodo(id)),
		onRemove: (id) => dispatch(removeTodo(id))
	};
};
const VisibleTodoList = connect(
	mapStateToProps,
	mapDispatchToProps
)(TodoList);

export default VisibleTodoList;