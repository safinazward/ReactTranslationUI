import React from 'react';
import {shallow} from 'enzyme';
import {Modal} from 'reactstrap';

import SwRemoveLocaleButton from '../SwRemoveLocaleButton';
import LocaleService from '../../../services/localeService';

describe('<SwRemoveLocaleButton />', () => {
    
  it('renders without creashing', () => {
    const rmLocaleBtn = shallow(<SwRemoveLocaleButton/>);
    expect(rmLocaleBtn.find(Modal).length).toEqual(1);
  });

  it('calls toggle when we click on the button', () => {
    const rmLocaleBtn = shallow(<SwRemoveLocaleButton buttonLabel='Remove locale'/>);    
    const btn = rmLocaleBtn.findWhere(e => e.text()==="Remove locale").parent();
    expect(rmLocaleBtn.state('modal')).toEqual(false);
    btn.simulate('click');
    expect(rmLocaleBtn.state('modal')).toEqual(true);
  });

   it('should disable the remove button when the selected locale is english', () => {
    const rmLocaleBtn = shallow(<SwRemoveLocaleButton buttonLabel='Remove locale' locale='en'/>);    
    const btn = rmLocaleBtn.findWhere(e => e.text()==="Remove locale").parent(); 
    expect(btn.props().disabled).toEqual(true);
  });

  it('calls remove locale when we click on remove button', () => {
    LocaleService.removeLocale = jest.fn().mockReturnValueOnce(Promise.resolve());    
    const rmLocaleBtn = shallow(<SwRemoveLocaleButton/>);  
    const btn = rmLocaleBtn.findWhere(e => e.text()==="Remove").parent();    
    btn.simulate('click');
    expect(LocaleService.removeLocale).toHaveBeenCalled();
  });

  it('calls onLocaleRemoved when the locale is removed', async () => {
    LocaleService.removeLocale = jest.fn().mockReturnValueOnce(Promise.resolve()); 
    const mockOnLocaleRemoved = jest.fn();   
    const rmLocaleBtn = shallow(<SwRemoveLocaleButton onLocaleRemoved={mockOnLocaleRemoved}/>);
    const btn = rmLocaleBtn.findWhere(e => e.text()==="Remove").parent();    
    await btn.simulate('click');
    expect(mockOnLocaleRemoved).toHaveBeenCalled();
  });

});
