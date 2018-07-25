import { combineReducers } from 'redux';

function indexOf(list, field, value){
	return list.map(e => { return e[field]; }).indexOf(value);
}

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

export default rootReducer;