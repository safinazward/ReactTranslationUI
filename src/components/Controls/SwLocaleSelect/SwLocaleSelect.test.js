import React from 'react';
import { shallow } from 'enzyme';

import SwLocaleSelect from '../SwLocaleSelect';


describe('<SwLocaleSelect />', () => {
  
  it('renders without creashing', async () => {
    const tableRow = shallow(<SwLocaleSelect />);
    expect(tableRow.find('select').length).toEqual(1);
  });

  it('renders list of options', async () => {
    let locales = [{ "code": "en" }, { "code": "sv" }];
    const tableRow = shallow(<SwLocaleSelect locales={locales} />);    
    expect(tableRow.find('option').length).toEqual(3);
  });

  it('handles on locale change', () => {
    const localeChangeMock = jest.fn();
    const tableRow = shallow(<SwLocaleSelect onLocaleChange={localeChangeMock} />);
    tableRow.instance().onLocaleChange({ target: { value: "en" } });
    expect(localeChangeMock).toHaveBeenCalled();
  });

});
