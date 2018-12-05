import React from 'react';
import SwTable from '.';
import {shallow} from 'enzyme';
import {Table} from 'reactstrap';
import SwTableRow from '../SwTableRow';


describe('<SwTable />', () => {  
  
  it('renders without creashing', () => {
    const table = shallow(<SwTable data={{}}/>);
    expect(table.find(Table).length).toEqual(1);
  }); 

  it('renders SwTableRow', () => {
    const data = {
       apptitle : {key:'appTitle', text:'trans1'},
        ds: {key:'ds', text:'trans1'}
    };
    const table = shallow(<SwTable data={data}/>);
    expect(table.find(SwTableRow).length).toEqual(2);
  }); 

  it('filters rows by key', () => {
    const data = {
      apptitle : {key:'appTitle', text:'trans1'},
      ds: {key:'ds', text:'trans1'}
    };      
    const table = shallow(<SwTable data={data} filter='app'/>);
    expect(table.find(SwTableRow).length).toEqual(1);
  });

});
