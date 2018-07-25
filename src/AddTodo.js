import React from 'react';
import { handleAddTodo } from './actionCreators';
import { connect } from 'react-redux';

const handlePressEnter = (event) => {
	event.preventDefault();
	if (event.keyCode === 13) {
	  document.getElementById("insert-todo").click();
	}
};

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

export default AddTodo