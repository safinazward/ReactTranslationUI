import React from 'react';
import {shallow} from 'enzyme';
import { AvForm, AvInput } from "availity-reactstrap-validation";

import SwEditCustomTranslationField from '../SwEditCustomTranslationField';
import TranslationService from '../../../services/translationService';

describe('<SwEditCustomTranslationField />', () => {
    
  it('renders without creashing', () => {
    shallow(<SwEditCustomTranslationField/>);    
  });

  it('renders input field in editing mode', () => {
    const editCustomTransBtn = shallow(<SwEditCustomTranslationField editing={true}/>);
    expect(editCustomTransBtn.find(AvInput).length).toEqual(1);
  });

  it('creates custom translation when click on save', () => {
    TranslationService.addCustomTranslation = jest.fn().mockReturnValueOnce(Promise.resolve());
    const editCustomTransBtn = shallow(<SwEditCustomTranslationField editing={true} translation={{ key:'app.title', text:'title', standardText:'title'}}/>);
    editCustomTransBtn.find(AvForm).simulate('ValidSubmit', null, {text:'custom title'} )
    expect(TranslationService.addCustomTranslation).toHaveBeenCalled();
  });

  it('updates custom translation when click on save', () => {
    TranslationService.updateCustomTranslation = jest.fn().mockReturnValueOnce(Promise.resolve());
    const editCustomTransBtn = shallow(<SwEditCustomTranslationField editing={true} translation={{ key:'app.title', text:'custom title', standardText:'title'}}/>);
    editCustomTransBtn.find(AvForm).simulate('ValidSubmit', null, {text:'updated title'} )
    expect(TranslationService.updateCustomTranslation).toHaveBeenCalled();
  });

  it('calls onSave when creating a custom translation is completed', async () => {
    TranslationService.addCustomTranslation = jest.fn().mockReturnValueOnce(Promise.resolve());
    const mockOnSave = jest.fn();
    const editCustomTransBtn = shallow(<SwEditCustomTranslationField onSave={mockOnSave} editing={true} translation={{ key:'app.title', text:'title', standardText:'title'}}/>);
    await editCustomTransBtn.find(AvForm).simulate('ValidSubmit', null, {text:'updated title'});
    expect(mockOnSave).toHaveBeenCalled();
  });

  it('calls onSave when updating a custom translation is completed', async () => {
    TranslationService.updateCustomTranslation = jest.fn().mockReturnValueOnce(Promise.resolve());
    const mockOnSave = jest.fn();
    const editCustomTransBtn = shallow(<SwEditCustomTranslationField onSave={mockOnSave} editing={true} translation={{ key:'app.title', text:'custom title', standardText:'title'}}/>);
    await editCustomTransBtn.find(AvForm).simulate('ValidSubmit', null, {text:'updated title'});
    expect(mockOnSave).toHaveBeenCalled();
  });
  
});
