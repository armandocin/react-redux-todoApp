import React from 'react';
import { connect } from 'react-redux';
import { saveState } from './handlePersistance';
import App from './App'

let Persistor = ({todos}) => {
	
	saveState({
		todos: todos
	}, 'tmp');
	return <App />;
};

const mapStateToProps = (state) => {
	return {
		todos: state.todos
	};
};

export default Persistor = connect(mapStateToProps)(Persistor);
