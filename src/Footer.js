import React from 'react';
import FilterBtn from './FilterBtn';

const Footer = () => {
	return (//filter will be passed to ownProps
		<p><label>Show:</label>{'	'}
			<FilterBtn filter='SHOW_ALL'>All  </FilterBtn>
			<FilterBtn filter='SHOW_COMPLETED'>Completed  </FilterBtn>
			<FilterBtn filter='SHOW_ACTIVE'>Active  </FilterBtn>
		</p>
	);
}

export default Footer