import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { ZLoginTabs } from './login-tabs';

describe('ZLoginTabs', () => {
  let _target: ShallowWrapper;

  function createTestTarget() {
    _target = shallow(<ZLoginTabs />);
    return _target;
  }

  beforeAll(() => {
    configure({ adapter: new Adapter() });
  });

  afterEach(() => {
    _target.unmount();
  });

  it('renders the form.', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = target.find('.ZLoginTabs-root');
    // Assert
    expect(actual.length).toBeGreaterThan(0);
  });
});
