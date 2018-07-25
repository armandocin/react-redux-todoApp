//jshint esnext:true
import React from 'react';
import { createStore } from 'redux';
import {connect, Provider} from 'react-redux';
import ReactDOM from 'react-dom';
// import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import './css/index.css';
import rootReducer from './reducers';
import { loadState, saveState } from './handlePersistance';
import VisibleTodoList from './VisibleTodoList';
import AddTodo from './AddTodo';
import Footer from './Footer';
import ResetBtn from './ResetBtn';

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


