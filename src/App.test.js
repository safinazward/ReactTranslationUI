import React from 'react';
import App from './App';
import {shallow} from 'enzyme';

import LocaleService from './services/localeService';
import TranslationService from './services/translationService';
import SwRemoveLocaleButton from './components/Controls/SwRemoveLocaleButton';
import SwAddLocaleButton from './components/Controls/SwAddLocaleButton';
import SwAddTranslationButton from './components/Controls/SwAddTranslationButton';
import SwTable from './components/Table/SwTable';
import SwLocaleSelect from './components/Controls/SwLocaleSelect';

describe('<App />', () => {

	beforeEach(() => {
		LocaleService.getLocales = jest.fn().mockReturnValue(Promise.resolve([{code:'sv',name:'Swedish'},{code:'en',name:'English'}]));
		TranslationService.getTranslations = jest.fn().mockReturnValue(Promise.resolve());
	});  

	it('renders without creashing', () => {
		shallow(<App/>);
	});

	it('gets locales when the component did mounted', async () => {
		const app = await shallow(<App/>);
		expect(app.state('locales')).toEqual([{code:'sv',name:'Swedish'},{code:'en',name:'English'}])
		expect(LocaleService.getLocales).toHaveReturnedTimes(1);
	});

	it('triggers onLocaleChange after getting all the locales to load the first locale translations', async() => {		
		await shallow(<App/>);
		expect(TranslationService.getTranslations).toHaveBeenCalledWith('sv');		
	});

	it('triggers onFilterChanged when we change the filter', async () => {		
		const app = await shallow(<App/>);
		const filter = app.find('input').filterWhere(i => i.prop('placeholder') === 'filter');
		filter.simulate('change',{target:{value:'app'}});
		expect(app.state('filter')).toEqual('app');
		filter.simulate('change');
		expect(app.state('filter')).toEqual(null);			
	});

	it('resets locale and translation when there is no locales', async () => {
		const app = await shallow(<App/>);
		await app.find(SwLocaleSelect).simulate('LocaleChange');
		// TODO: check await for nested promises so we can remove setTimeout
		setTimeout(()=>{
			expect(app.state('locale')).toEqual(undefined);
			expect(app.state('keys')).toEqual({});
		});				
	});

	it('reloads locales when removing a locale is done', async () => {
		const app = shallow(<App/>);
		const rmLocaleBtn = app.find(SwRemoveLocaleButton);
		await rmLocaleBtn.simulate('LocaleRemoved');
		expect(LocaleService.getLocales).toHaveBeenCalledTimes(2);
	});

	it('reloads locales when adding a new locale is done', async () => {
		const app = shallow(<App/>);
		const addLocaleBtn = app.find(SwAddLocaleButton);
		await addLocaleBtn.simulate('LocaleCreated','sv');
		expect(LocaleService.getLocales).toHaveBeenCalledTimes(2);
	});

	it('reloads locale translations when adding a new translation is done', async () => {
		const app = shallow(<App/>);
		const addTransBtn = app.find(SwAddTranslationButton);
		await addTransBtn.simulate('TranslationCreated');
		expect(TranslationService.getTranslations).toHaveBeenCalledTimes(2);
	});

	it('loads locale translations when we select it', async () => {
		const app = shallow(<App/>);
		const table = app.find(SwTable);
		await table.simulate('change');
		expect(TranslationService.getTranslations).toHaveBeenCalledTimes(2);
	});

});
