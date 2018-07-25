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
const mapStateToFilterBtnProps = (state, ownProps) => {
	return {
		active: state.filter === ownProps.filter
	};
};
const mapDispatchToFilterBtnProps = (dispatch, ownProps) => {
	return {
		onClick: () => dispatch(setFilter(ownProps.filter))
	};
};
const FilterBtn = connect(mapStateToFilterBtnProps, mapDispatchToFilterBtnProps)(Btn);

export default FilterBtn;