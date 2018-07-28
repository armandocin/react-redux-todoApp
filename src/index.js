//jshint esnext:true
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import {connect, Provider} from 'react-redux';
import { loadState } from './handlePersistance';
// import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';
import rootReducer from './reducers';
import Persistor from './Persistor';

let curr = 'tmp';
const persistedState = loadState(curr);

ReactDOM.render(
	<Provider store={createStore(rootReducer, persistedState)}>
		<Persistor />
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


