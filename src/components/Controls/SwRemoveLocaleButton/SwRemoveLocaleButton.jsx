import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import LocaleService from '../../../services/localeService';

class SwRemoveLocaleButton extends Component {

	constructor(props) {
		super(props);
		this.state = {
			modal: false		
		};

		this.toggle = this.toggle.bind(this);
		this.removeLocale = this.removeLocale.bind(this);		
	}

	toggle() {
		this.setState({
			modal: !this.state.modal
		});
	}

	removeLocale() {
		LocaleService.removeLocale(this.props.locale)
			.then(response => {
				if (this.props.onLocaleRemoved) {
					this.props.onLocaleRemoved();
				}
				this.toggle();
			});
	}

	render() {		
		return (
			<>
				<Button color="danger" onClick={this.toggle} block={false} disabled={!this.props.locale || this.props.locale === 'en'}>{this.props.buttonLabel}</Button>
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Remove Locale</ModalHeader>
					<ModalBody>
						<p>This will remove the locale and all its translations</p>
					</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={this.removeLocale}>Remove</Button>
						{' '}
						<Button color="secondary" onClick={this.toggle}>Cancel</Button>
					</ModalFooter>
				</Modal>
			</>
		);		
	}
}

SwRemoveLocaleButton.propTypes = {
	onLocaleRemoved: PropTypes.func,
	buttonLabel: PropTypes.string,
	locale: PropTypes.string
}

SwRemoveLocaleButton.defaultProps = {
	buttonLabel: 'SwAddTranslationButton Label',
	locale:''
}

export default SwRemoveLocaleButton;

