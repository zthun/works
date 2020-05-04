import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { ZLoginTabs } from './login-tabs';

describe('ZLoginTabs', () => {
  let _target: ShallowWrapper;
  let login: jasmine.Spy;
  let create: jasmine.Spy;
  let recover: jasmine.Spy;

  function createTestTarget() {
    _target = shallow(<ZLoginTabs login={login} create={create} recover={recover} />);
    return _target;
  }

  beforeAll(() => {
    configure({ adapter: new Adapter() });
  });

  beforeEach(() => {
    login = jasmine.createSpy();
    create = jasmine.createSpy();
    recover = jasmine.createSpy();
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
