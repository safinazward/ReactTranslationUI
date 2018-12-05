import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';

import LocaleService from '../../../services/localeService';

class SwAddLocaleButton extends Component {

	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			error: false
		};

		this.toggle = this.toggle.bind(this);
		this.handleValidSubmit = this.handleValidSubmit.bind(this);
		this.handleInvalidSubmit = this.handleInvalidSubmit.bind(this);
	}

	toggle() {
		this.setState({
			modal: !this.state.modal
		});
	}

	handleValidSubmit(event, values) {
		this.setState({ error: false });
		LocaleService.saveLocale(values)
			.then(locale => {
				if (this.props.onLocaleCreated) {					
					this.props.onLocaleCreated(locale.code);
				}
				this.toggle();
			});
	}

	handleInvalidSubmit(event, errors, values) {
		this.setState({ error: true });
	}

	render() {
		return (
			<>
				<Button color="info" onClick={this.toggle} block={false}>{this.props.buttonLabel}</Button>
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>New Locale</ModalHeader>
					<ModalBody>
						<AvForm id="newLocationForm" onValidSubmit={this.handleValidSubmit} onInvalidSubmit={this.handleInvalidSubmit}>
							<AvField name="name" label="Name" type="text" required />
							<AvField name="code" label="Code" type="text" required />
						</AvForm>
					</ModalBody>
					<ModalFooter>
						<Button color="primary" form="newLocationForm">Create</Button>
						{' '}
						<Button color="secondary" onClick={this.toggle}>Cancel</Button>
					</ModalFooter>
				</Modal>
			</>
		);
	}
}

SwAddLocaleButton.propTypes = {
	onLocaleCreated: PropTypes.func,
	buttonLabel: PropTypes.string
}

SwAddLocaleButton.defaultProps = {
	buttonLabel: 'SWAddLocaleButton Label'
}

export default SwAddLocaleButton;

