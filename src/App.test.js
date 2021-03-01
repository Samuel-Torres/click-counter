import React from 'react';
import App from './App';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

// set up enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the App component
 * @function setup
 * @returns {ShallowWrapper}
 */

const setup = () => shallow(<App />);

const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`);

test('renders without error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
})

test('renders increment button', () => {
  const wrapper = setup();
  const incrmementButton = findByTestAttr(wrapper, "increment-button"); 
  expect(incrmementButton.length).toBe(1);
})

test('renders decrement button', () => {
  const wrapper = setup();
  const decrementButton = findByTestAttr(wrapper, "decrement-button");
  expect(decrementButton.length).toBe(1);
})

test('render counter displays', () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, "counter-display");   
  expect(counterDisplay.length).toBe(1);
})

test('counter starts at 0', () => {
  const wrapper = setup();
  const count = findByTestAttr(wrapper, "count").text();
  expect(count).toBe("0");
})

test('clicking on button increments counter display', () => {
  const wrapper = setup();
  // find the button
  const button = findByTestAttr(wrapper, "increment-button");
  // click the button
  button.simulate('click');
  // find the display, and test that the number has incremented
  const count = findByTestAttr(wrapper, "count").text();
  expect(count).toBe("1")
})

test('Clicking the decrement button decrements the count', () => {
  const wrapper = setup()
  
  // grab the increment button
  const incrementButton = findByTestAttr(wrapper, "increment-button");
  // simulate increment click count is now 1
  incrementButton.simulate('click');
  // grab the decrement button
  const decrementButton = findByTestAttr(wrapper, "decrement-button");
  // simulate decrement click count is now 0
  decrementButton.simulate('click');
  // get the value of count
  const count = findByTestAttr(wrapper, "count").text();
  // test and expect that the value of count will remain 0
  expect(count).toBe("0");
})

test('decrementing will not allow value below 0 & error displays', () => {
  const wrapper = setup();
  const decrementButton = findByTestAttr(wrapper, "decrement-button");
  decrementButton.simulate('click');
  const count = findByTestAttr(wrapper, "count").text()
  expect(count).toBe('0');

  const errorMsg = findByTestAttr(wrapper, 'error-message');
  expect(errorMsg.length).toBe(1)
})
