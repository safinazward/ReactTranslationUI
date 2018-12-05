import React from 'react';
import {shallow} from 'enzyme';
import {Modal} from 'reactstrap';
import { AvForm } from 'availity-reactstrap-validation';

import SwAddLocaleButton from '../SwAddLocaleButton';
import LocaleService from '../../../services/localeService';

describe('<SwAddLocaleButton />', () => {

  it('renders without creashing', () => {
    const addLocaleBtn = shallow(<SwAddLocaleButton/>);
    expect(addLocaleBtn.find(Modal).length).toEqual(1);
  });

  it('calls toggle when we click on the button', () => {
    const addLocaleBtn = shallow(<SwAddLocaleButton buttonLabel='Add locale'/>);    
    const btn = addLocaleBtn.findWhere(e => e.text()==="Add locale").parent();
    expect(addLocaleBtn.state('modal')).toEqual(false);
    btn.simulate('click');
    expect(addLocaleBtn.state('modal')).toEqual(true);
  });

  it('sets error when we submit the form with errors', () => {
    const addLocaleBtn = shallow(<SwAddLocaleButton/>);
    addLocaleBtn.setState({modal:true});    
    addLocaleBtn.find(AvForm).simulate('InvalidSubmit');
    expect(addLocaleBtn.state('error')).toEqual(true);    
  });

  it('resets error when we submit the valid form', () => {
    LocaleService.saveLocale = jest.fn().mockReturnValueOnce(Promise.resolve());
    const addLocaleBtn = shallow(<SwAddLocaleButton/>);
    addLocaleBtn.setState({error:true});    
    addLocaleBtn.find(AvForm).simulate('ValidSubmit');
    expect(addLocaleBtn.state('error')).toEqual(false);    
  });

  it('calls save locale when we submit valid form', () => {
    LocaleService.saveLocale = jest.fn().mockReturnValueOnce(Promise.resolve());    
    const addLocaleBtn = shallow(<SwAddLocaleButton/>);       
    addLocaleBtn.find(AvForm).simulate('ValidSubmit');
    expect(LocaleService.saveLocale).toHaveBeenCalled();
  });

  it('calls onLocaleCreated when the locale is saved', async () => {
    LocaleService.saveLocale = jest.fn().mockReturnValueOnce(Promise.resolve({code:'sv'})); 
    const mockOnLocaleCreated = jest.fn();   
    const addLocaleBtn = shallow(<SwAddLocaleButton onLocaleCreated={mockOnLocaleCreated}/>);       
    await addLocaleBtn.find(AvForm).simulate('ValidSubmit');
    expect(mockOnLocaleCreated).toHaveBeenCalled();
  });

});
