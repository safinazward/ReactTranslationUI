import React from 'react';
import {shallow} from 'enzyme';
import { AvForm, AvInput } from "availity-reactstrap-validation";

import SwEditTranslationField from '../SwEditTranslationField';
import TranslationService from '../../../services/translationService';

describe('<SwEditTranslationField />', () => {
    
  it('renders without creashing', () => {
    shallow(<SwEditTranslationField/>);    
  });

  it('renders input field in editing mode', () => {
    const editTransBtn = shallow(<SwEditTranslationField editing={true}/>);
    expect(editTransBtn.find(AvInput).length).toEqual(1);
  });

  it('updates translation when click on save', () => {
    TranslationService.updateTranslation = jest.fn().mockReturnValueOnce(Promise.resolve());
    const editTransBtn = shallow(<SwEditTranslationField editing={true} translation={{ key:'app.title', text:'title', standardText:'title'}}/>);
    editTransBtn.find(AvForm).simulate('ValidSubmit', null, {text:'title1'} )
    expect(TranslationService.updateTranslation).toHaveBeenCalled();
  });

  it('calls onSave when updating a translation is completed', async () => {
    TranslationService.updateTranslation = jest.fn().mockReturnValueOnce(Promise.resolve());
    const mockOnSave = jest.fn();
    const editTransBtn = shallow(<SwEditTranslationField onSave={mockOnSave} editing={true} translation={{ key:'app.title', text:'title', standardText:'title'}}/>);
    await editTransBtn.find(AvForm).simulate('ValidSubmit', null, {text:'updated title'});
    expect(mockOnSave).toHaveBeenCalled();
  });
  
});
