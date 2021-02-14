import { fireEvent, render } from '@testing-library/react';
import { createTypedocTypography } from './typedoc-create-typography.function';

describe('createTypedocTypography', () => {
  describe('Falsy child.', () => {
    it('does not render anything.', () => {
      // Arrange
      // Act
      const target = createTypedocTypography(null);
      // Assert
      expect(target).toBeNull();
    });
  });

  describe('Truthy child.', () => {
    it('creates the typography text.', () => {
      // Arrange
      const expected = 'text';
      const target = render(createTypedocTypography(expected));
      // Act
      const actual = target.container.textContent;
      // Assert
      expect(actual).toEqual(expected);
    });

    it('creates the typography with the given id.', () => {
      // Arrange
      const expected = '300';
      const clasz = 'CreateTypography-root';
      const target = render(createTypedocTypography('My Entity', 'strong', 'body1', clasz, expected));
      // Act
      const node = target.container.querySelector(`.${clasz}`);
      const actual = node.getAttribute('data-entity');
      // Assert
      expect(actual).toEqual(expected);
    });

    it('invokes the click action.', () => {
      // Arrange
      const expected = jest.fn();
      const clasz = 'CreateTypography-root';
      const target = render(createTypedocTypography('My entity', 'em', 'body2', clasz, undefined, expected));
      // Act
      const root = target.container.querySelector(`.${clasz}`);
      fireEvent.click(root);
      // Assert
      expect(expected).toHaveBeenCalledWith(expect.anything());
    });
  });
});
