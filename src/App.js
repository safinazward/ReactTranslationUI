import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'reactstrap';
import { Card, CardHeader, CardBody } from 'reactstrap';

import SwLocaleSelect from './components/Controls/SwLocaleSelect';
import SwAddTranslationButton from './components/Controls/SwAddTranslationButton';
import SwAddLocaleButton from './components/Controls/SwAddLocaleButton';
import SwRemoveLocaleButton from './components/Controls/SwRemoveLocaleButton';
import SwTable from './components/Table/SwTable';
import LocaleService from './services/localeService';
import TranslationService from './services/translationService';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			locale: undefined,
			keys: {},
			locales: [],
		};
		this.onLocaleChange = this.onLocaleChange.bind(this);
		this.onFilterChanged = this.onFilterChanged.bind(this);	
		this.loadLocales = this.loadLocales.bind(this);	
	}

	componentDidMount() {
		this.loadLocales();
	}

	loadLocales(code) {
		LocaleService.getLocales().then(locales => {
			this.setState({ locales: locales });
			locales.length > 0 && this.onLocaleChange(code? code: locales[0].code);
		});
	}

	onLocaleChange(locale) {	
		if (locale && this.state.locale !== locale) {
			this.loadLocale(locale);
		} else {
			this.setState({ locale: undefined, keys: {} });
		}
	}

	loadLocale(locale) {
		TranslationService.getTranslations(locale)
			.then(keys => {
				this.setState({ locale: locale, keys });
			});
	}

	onFilterChanged(event) {
		let value = (((event||{}).target||{}).value||null);
		if (value) {
			this.setState({ filter: value.trim() })
		} else {
			this.setState({ filter: null })
		}
	}

	render() {
		return (
			<Container fluid={true}>
				<Row>
					<Col>
						<Card className="m-5">
							<CardHeader>
								<Row>
									<div className="col-2 text-left">
										<SwLocaleSelect locales={this.state.locales} selected={this.state.locale} onLocaleChange={this.onLocaleChange} />
									</div>
									<div className="col-4 text-left">
										<input className="form-control" type="text" placeholder="filter" onChange={this.onFilterChanged} />
									</div>
									<div className="col-6 text-right">
										<SwAddLocaleButton buttonLabel='New Locale' onLocaleCreated={(locale) => this.loadLocales(locale)} />
										&nbsp;
										<SwRemoveLocaleButton buttonLabel='Remove Locale' locale={this.state.locale} onLocaleRemoved={this.loadLocales} />
										&nbsp;
  									<SwAddTranslationButton disabled={this.state.locale !== 'en'} buttonLabel='New Translation' locale={this.state.locale} onTranslationCreated={() => this.loadLocale(this.state.locale)} />
									</div>
								</Row>
							</CardHeader>
							<CardBody>
								<SwTable key={this.state.locale} locale={this.state.locale} data={this.state.keys} filter={this.state.filter} onChange={() => this.loadLocale(this.state.locale)} />
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default App;
