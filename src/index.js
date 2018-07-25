//jshint esnext:true
import React from 'react';
import {combineReducers, createStore} from 'redux';
import {connect, Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './css/index.css';

// const {connect, Provider} = ReactRedux;

const handleAddTodo = (input) => {
	// const text = document.getElementById('todo-text').value;
	const text = input.value;
	if(text){
		const newTodo = {
			type: 'ADD_TODO',
			id: Math.random().toString().slice(2),
			text: text
		}

		//document.getElementById('todo-text').value = "";
		input.value = "";
		return(newTodo);
	}
};
const setFilter = (filter) => {
	return {
		type: 'SET_FILTER',
		filter: filter
	};
};
const toggleTodo = (id) => {
	return { 
		type: 'TOGGLE_TODO',
		id 
	};
};
const removeTodo = (id) => {
	return {
		type: 'REMOVE_TODO',
		id 
	};
};

const handlePressEnter = (event) => {
	event.preventDefault();
	if (event.keyCode === 13) {
	  document.getElementById("insert-todo").click();
	}
};
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

const todoReducer = (state, action) => {
	switch(action.type){
		case('ADD_TODO'):
			return {
						id: action.id,
						text: action.text,
						completed: false
					};

		case('TOGGLE_TODO'):
			if(state.id !== action.id)
				return state;
			return Object.assign({}, state, {completed: !state.completed} )

		default:
			return state;
	}
};

const todos = (state = [], action) => {
	switch(action.type){
		case('ADD_TODO'):
			return [
					...state,
					todoReducer(undefined, action)
					];

		case('TOGGLE_TODO'):
			return state.map(todo =>
				todoReducer(todo, action)
			);

		case('REMOVE_TODO'):
			return [
					...state.slice(0, indexOf(state, 'id', action.id)),
					...state.slice(indexOf(state, 'id', action.id) + 1)
					];

		default:
			return state;
	}
};

const filter = (state = 'SHOW_ALL', action) => {
	switch(action.type){
		case('SET_FILTER'):
			return action.filter;
		default:
			return state;
	}
};

const todoApp = combineReducers({
	todos,
	filter
});

const rootReducer = (state, action) => {
	if (action.type === 'RESET_APP') {
		state = undefined;
	}

	return todoApp(state, action);
}

const Todo = ({todo, toggle, onRemove}) => (
		<div className="todo-div">
			<li key={todo.id} 
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
const mapStateToTodoListProps = (state) => {
	return {
		todos: handleChangeFilter(state.todos, state.filter)
	};
};
const mapDispatchToTodoListProps = (dispatch) => {
	return {
		onToggle: (id) => dispatch(toggleTodo(id)),
		onRemove: (id) => dispatch(removeTodo(id))
	};
};
const VisibleTodoList = connect(
	mapStateToTodoListProps,
	mapDispatchToTodoListProps
)(TodoList);

let AddTodo = ({dispatch}) => {
	let input;
	return (
		<div>
			<input type="textbox" id="todo-text" 
				onKeyUp={(event) => handlePressEnter(event) }
				ref={node => input = node}
			/>
			<button id="insert-todo" onClick={() => dispatch(handleAddTodo(input))}>Add TODO</button>
		</div>
	);
};
AddTodo = connect()(AddTodo);

const Btn = ({active, children, onClick}) => {
	if(active)
		return (
			<button onClick={() => onClick()} disabled>
				{children}
			</button>
		);

	return (
		<button onClick={() => onClick()} >
			{children}
		</button>
	);
}
const mapStateToFilterBtnProps = (state, ownProps) => {
	return {
		active: state.filter === ownProps.filter
	};
};
const mapDispatchToFilterBtnProps = (dispatch, ownProps) => {
	return {
		onClick: () => dispatch(setFilter(ownProps.filter))
	};
};
const FilterBtn = connect(mapStateToFilterBtnProps, mapDispatchToFilterBtnProps)(Btn);

const Footer = () => {
	return (//filter will be passed to ownProps
		<p><label>Show:</label>{'	'}
			<FilterBtn filter='SHOW_ALL'>All  </FilterBtn>
			<FilterBtn filter='SHOW_COMPLETED'>Completed  </FilterBtn>
			<FilterBtn filter='SHOW_ACTIVE'>Active  </FilterBtn>
		</p>
	);
}


let ResetBtn = ({dispatch}) => {
	return (
		<button 
			onClick={() => dispatch({type: 'RESET_APP'})}
			className="btn btn-danger"
		>
			Reset List
		</button>
	);
}
ResetBtn = connect()(ResetBtn);

const App = () =>{
	return (
		<div>
			<h2>TODO: </h2>
			<AddTodo />
			<VisibleTodoList />
			<Footer />
			<ResetBtn />
		</div>
	);
}

let curr = 'tmp';
const persistedState = loadState(curr);


ReactDOM.render(
	<Provider store={createStore(rootReducer, persistedState)}>
		<App />
	</Provider>,
	document.getElementById('root')
);
/*store.subscribe(render);
store.subscribe(() => {
	saveState({
		todos: store.getState().todos
	}, curr);
});*/
// render();

/***************************************/

function loadState(key) {
	try {
		const serializedState = localStorage.getItem(key);
		if(serializedState === null){
			return undefined;
		}
		return JSON.parse(serializedState);
	} catch (err) {
		return undefined;
	}
};

function saveState(state, key) {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem(key, serializedState);
	} catch (err){
		// should be logged
	}
};

function indexOf(list, field, value){
	return list.map(e => { return e[field]; }).indexOf(value);
}