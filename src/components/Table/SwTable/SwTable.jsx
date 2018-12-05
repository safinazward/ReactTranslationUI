import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';

import SwTableRow from '../SwTableRow';

const SwTable = props => (
	<Table striped bordered hover size="sm">
		<thead>
			<tr className="row m-0">
				<th className="d-inline-block col-4">Key</th>
				<th className="d-inline-block col-5">Text</th>
				<th className="d-inline-block col">Custom</th>
				<th className="d-inline-block col">Standard</th>
			</tr>
		</thead>
		<tbody>
			{Object.keys(props.data).filter(k => props.filter ? k.includes(props.filter) : true).map(key => {
				return <SwTableRow key={key} locale={props.locale} translation={props.data[key]} onChange={props.onChange} />
			})}
		</tbody>
	</Table>
);

SwTable.propTypes = {
	data: PropTypes.object,
	filter: PropTypes.string,
	locale: PropTypes.string,
	onChange: PropTypes.func
}

SwTable.defaultProps = {
	data:{},
	filter:'',
	locale:''
}

export default SwTable;
