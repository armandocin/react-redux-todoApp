import React from 'react';
import { connect } from 'react-redux';
import { saveState } from './handlePersistance';

let Persistor = ({todos, children}) => {
	
	saveState({
		todos: todos
	}, 'tmp');
	return children;
};

const mapStateToProps = (state) => {
	return {
		todos: state.todos
	};
};

export default Persistor = connect(mapStateToProps)(Persistor);
