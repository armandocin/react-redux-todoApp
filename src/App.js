import React from 'react';
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

export default App;