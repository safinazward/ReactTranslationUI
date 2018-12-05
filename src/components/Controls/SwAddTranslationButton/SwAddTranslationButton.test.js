import React from 'react';
import {shallow} from 'enzyme';
import {Modal} from 'reactstrap';
import { AvForm } from 'availity-reactstrap-validation';

import SwAddTranslationButton from '../SwAddTranslationButton';
import TranslationService from '../../../services/translationService';

describe('<SwAddTranslationButton />', () => {
    
  it('renders without creashing', () => {
    const addTransBtn = shallow(<SwAddTranslationButton/>);
    expect(addTransBtn.find(Modal).length).toEqual(1);
  });

  it('calls toggle when we click on the button', () => {
    const addTransBtn = shallow(<SwAddTranslationButton buttonLabel='Add translation'/>);    
    const btn = addTransBtn.findWhere(e => e.text()==="Add translation").parent();
    expect(addTransBtn.state('modal')).toEqual(false);
    btn.simulate('click');
    expect(addTransBtn.state('modal')).toEqual(true);
  });

  it('sets error when we submit the form with errors', () => {
    const addTransBtn = shallow(<SwAddTranslationButton/>);
    addTransBtn.setState({modal:true});    
    addTransBtn.find(AvForm).simulate('InvalidSubmit');
    expect(addTransBtn.state('error')).toEqual(true);    
  });

  it('resets error when we submit the valid form', () => {
    TranslationService.addTranslation = jest.fn().mockReturnValueOnce(Promise.resolve()); 
    const addTransBtn = shallow(<SwAddTranslationButton/>);
    addTransBtn.setState({error:true});    
    addTransBtn.find(AvForm).simulate('ValidSubmit');
    expect(addTransBtn.state('error')).toEqual(false);    
  });

  it('calls add translation when we submit valid form', () => {
    TranslationService.addTranslation = jest.fn().mockReturnValueOnce(Promise.resolve());    
    const addTransBtn = shallow(<SwAddTranslationButton/>);      
    addTransBtn.find(AvForm).simulate('ValidSubmit',{values:{key:"TKey", text:"TText"}});
    expect(TranslationService.addTranslation).toHaveBeenCalled();
  });

  it('calls onTranslationCreated when the translation is added', async () => {
    TranslationService.addTranslation = jest.fn().mockReturnValueOnce(Promise.resolve()); 
    const mockOnTranslationCreated = jest.fn();   
    const addTransBtn = shallow(<SwAddTranslationButton onTranslationCreated={mockOnTranslationCreated}/>);       
    await addTransBtn.find(AvForm).simulate('ValidSubmit');
    expect(mockOnTranslationCreated).toHaveBeenCalled();
  });

});
