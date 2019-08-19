import { mount } from '@vue/test-utils';
import ZAppComponent from './app.component.vue';

describe('ZAppComponent', () => {
  function createTestTarget() {
    return mount(ZAppComponent);
  }

  it('should create.', () => {
    // Arrange
    // Act
    const target = createTestTarget();
    // Assert
    expect(target.element).toBeTruthy();
  });
});
