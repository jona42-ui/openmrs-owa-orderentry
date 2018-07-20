import React from 'react';
import LabEntryForm from '../../../app/js/components/labOrderEntry/LabEntryForm';

let props;
let mountedComponent;

const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<LabEntryForm />);
  }
  return mountedComponent;
};

const mockTest = [1, 2, 3];
const mockPanel = { id: 1, testsId: [4, 5, 6] };

describe('Component: LabEntryForm', () => {
  beforeEach(() => {
    mountedComponent = undefined;
  });

  it('should render on initial setup', () => {
    const component = getComponent();
    expect(component).toMatchSnapshot();
  });

  it('should be able to select a category', () => {
    const component = getComponent();
    const categoryButton = component.find('#category-button').at(1); // click on the second category iwth id of 2
    categoryButton.simulate('click', {
      target: {}
    });
    expect(component.state().categoryId).toEqual(2);
  });

  it('should add and remove all the tests belonging to a panel as default tests', () => {
    const component = getComponent();
    const instance = component.instance();
    instance.selectPanelTests(mockPanel);
    expect(component.state().defaultTests.includes(4)).toBeTruthy();
    instance.selectPanelTests(mockPanel);
    expect(component.state().defaultTests.includes(4)).toBeFalsy();
  });

  it('should add and remove test options when selected and deselected', () => {
    const component = getComponent();
    const instance = component.instance();
    instance.setState({
      selectedTests: mockTest
    });
    let newTestId = 4;
    instance.selectTest(newTestId);
    expect(component.state().selectedTests.includes(4)).toBeTruthy();
    instance.selectTest(newTestId);
    expect(component.state().selectedTests.includes(4)).toBeFalsy();
  });

  it('should submit the form', () => {
    const component = getComponent();
    const addButton = component.find('#add-lab-order').at(0); // click the second button
    addButton.simulate('click', {});
    expect(component.state().selectedTests).toEqual([]);
    expect(component.state().disableSaveButton).toBeTruthy();
    expect(component.state().disableCancelButton).toBeTruthy();
  });
});