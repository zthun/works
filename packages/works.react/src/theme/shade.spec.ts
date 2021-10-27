/* eslint-disable require-jsdoc */
import { shade } from './shade';

describe('shade', () => {
  function assertShadeOutput(expected: string, color: string, magnitude: number) {
    // Arrange
    // Act
    const actual = shade(color, magnitude);
    // Assert
    expect(actual).toEqual(expected);
  }

  describe('Identity', () => {
    it('should shade white to white at 0 magnitude.', () => {
      assertShadeOutput('#ffffff', 'FF', 0);
    });

    it('should shade black to black at 0 magnitude.', () => {
      assertShadeOutput('#000000', '000', 0);
    });

    it('should shade any color to the same color at 0 magnitude.', () => {
      assertShadeOutput('#223344', '#223344', 0);
    });
  });

  describe('Darken', () => {
    it('should shade white to black at -1 magnitude.', () => {
      assertShadeOutput('#000000', 'ffffff', -255);
    });
  });

  describe('Lighten', () => {
    it('should shade black to white at 1 magnitude.', () => {
      assertShadeOutput('#ffffff', '00', 255);
    });
  });

  describe('Invalid', () => {
    it('should return the same hex value.', () => {
      assertShadeOutput('invalid', 'invalid', 56);
    });

    it('should return the same hex value if the length is 4.', () => {
      assertShadeOutput('0000', '0000', 50);
    });

    it('should return the same hex value if the length is 5.', () => {
      assertShadeOutput('00000', '00000', 50);
    });
  });
});
