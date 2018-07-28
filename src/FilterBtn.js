import React from 'react';
import { setFilter } from './actionCreators'
import { connect } from 'react-redux';

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
const mapStateToProps = (state, ownProps) => {
	return {
		active: state.filter === ownProps.filter
	};
};
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onClick: () => dispatch(setFilter(ownProps.filter))
	};
};
const FilterBtn = connect(mapStateToProps, mapDispatchToProps)(Btn);

export default FilterBtn;