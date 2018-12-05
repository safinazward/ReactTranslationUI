import React from 'react';
import {shallow} from 'enzyme';
import {Button} from 'reactstrap';

import SwTableRow from './SwTableRow';
import SwEditCustomTranslationField from '../../Fields/SwEditCustomTranslationField';
import SwEditTranslationField from '../../Fields/SwEditTranslationField';
import TranslationService from '../../../services/translationService';


describe('<SwTableRow />', () => {  

  it('renders without creashing', () => {
    const tableRow = shallow(<SwTableRow />);
    expect(tableRow.find('tr').length).toEqual(1);
  }); 

  it('renders row with data', () => {
    const tableRow = shallow(<SwTableRow translation={{ key:'key1', text:'trans1', standardText:'trans'}}/>);
    expect(tableRow.find('th').length).toEqual(1);
    expect(tableRow.find('th').text()).toEqual('key1');
    expect(tableRow.find('td').length).toEqual(3);   
    expect(tableRow.find(SwEditTranslationField).props().translation).toEqual({ key:'key1', text:'trans1', standardText:'trans'});
    expect(tableRow.find(SwEditCustomTranslationField).props().translation).toEqual({ key:'key1', text:'trans1', standardText:'trans'});    
    expect(tableRow.find(Button).length).toEqual(4);
  });

  it('sets the standard text to edit mode when we click on edit button', () => {
    const tableRow = shallow(<SwTableRow translation={{ key:'key1', text:'trans1', standardText:'trans'}}/>);  
    expect(tableRow.state('editing')).toEqual(false); 
    const editBtn = tableRow.find('td').at(2).children().first();
    editBtn.simulate('click');
    expect(tableRow.state('editing')).toEqual(true); 
  });

  it('sets the custom text to edit mode when we click on edit button', () => {
    const tableRow = shallow(<SwTableRow translation={{ key:'key1', text:'trans1', standardText:'trans'}}/>);  
    expect(tableRow.state('editingCustom')).toEqual(false);
    const editBtn = tableRow.find('td').at(1).children().first();
    editBtn.simulate('click');
    expect(tableRow.state('editingCustom')).toEqual(true); 
  });

  it('cancels edit mode for standard text when we click on cancel button', () => {
    const tableRow = shallow(<SwTableRow id='key1' text='trans1'/>);
    tableRow.setState({editing:true});
    const cancelBtn = tableRow.findWhere(e => e.text()==="Cancel").first().parent();
    cancelBtn.simulate('click');
    expect(tableRow.state('editing')).toEqual(false); 
  });
  
  it('calls remove when we click on remove button', async () => {
    TranslationService.removeTranslation = jest.fn().mockReturnValueOnce(Promise.resolve());
    const mockOnChange = jest.fn();    
    const tableRow = shallow(<SwTableRow translation={{ key:'key1', text:'trans1', standardText:'trans'}} onChange={mockOnChange}/>);
    const removeBtn = tableRow.findWhere(e => e.text()==="Remove").parent();
    await removeBtn.simulate('click');
    expect(TranslationService.removeTranslation).toHaveBeenCalled();
    expect(mockOnChange).toHaveBeenCalled();
  });

  it('calls reset when we click on reset button', async () => {
    TranslationService.removeCustomTranslation = jest.fn().mockReturnValueOnce(Promise.resolve()); 
    const mockOnChange = jest.fn();   
    const tableRow = shallow(<SwTableRow translation={{ key:'key1', text:'trans1', standardText:'trans'}} onChange={mockOnChange}/>);
    const removeBtn = tableRow.findWhere(e => e.text()==="Reset").parent();
    await removeBtn.simulate('click');
    expect(TranslationService.removeCustomTranslation).toHaveBeenCalled();
    expect(mockOnChange).toHaveBeenCalled();
  });

  it('saves and sets editing state to false when we save standard text', () => {
    const mockOnChange = jest.fn();
    const tableRow = shallow(<SwTableRow translation={{ key:'key1', text:'trans1', standardText:'trans'}} onChange={mockOnChange}/>);
    tableRow.setState({editing:true});
    const form=tableRow.find(SwEditTranslationField);
    form.simulate('save',{text:'newTrans'});
    expect(tableRow.state('editing')).toEqual(false);
    expect(mockOnChange).toHaveBeenCalled();
  });

  it('saves and sets editing state to false when we save custom text', () => {
    const mockOnChange = jest.fn();
    const tableRow = shallow(<SwTableRow translation={{ key:'key1', text:'trans1', standardText:'trans'}} onChange={mockOnChange}/>);
    tableRow.setState({editingCustom:true});
    const form=tableRow.find(SwEditCustomTranslationField);
    form.simulate('save',{text:'newTrans'});
    expect(tableRow.state('editingCustom')).toEqual(false);
    expect(mockOnChange).toHaveBeenCalled();
  });

});
