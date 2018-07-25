

export const handleAddTodo = (input) => {
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
export const setFilter = (filter) => {
	return {
		type: 'SET_FILTER',
		filter: filter
	};
};
export const toggleTodo = (id) => {
	return { 
		type: 'TOGGLE_TODO',
		id 
	};
};
export const removeTodo = (id) => {
	return {
		type: 'REMOVE_TODO',
		id 
	};
};