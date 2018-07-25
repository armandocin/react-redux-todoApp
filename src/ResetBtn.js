import React from 'react';
import { connect } from 'react-redux';

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

export default ResetBtn;