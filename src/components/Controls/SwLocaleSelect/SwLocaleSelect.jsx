import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SwLocaleSelect extends Component {

	constructor(props) {
		super(props);
		this.onLocaleChange = this.onLocaleChange.bind(this);
	}

	onLocaleChange(event) {
		this.props.onLocaleChange && this.props.onLocaleChange(event.target.value);
	}

	render() {
		return (
			<select className="form-control" value={this.props.selected} onChange={this.onLocaleChange} >
				<option key="default" value="">Select...</option>
				{this.props.locales.map((l, i) => {
					return (
						<option key={l.code} value={l.code}>
							{l.name}
						</option>
					);
				})}
			</select>
		);
	}
}

SwLocaleSelect.propTypes = {
	selected: PropTypes.string,
	locales: PropTypes.array,
	onLocaleChange: PropTypes.func
}

SwLocaleSelect.defaultProps = {
	selected: 'default',
	locales: []
}

export default SwLocaleSelect;
