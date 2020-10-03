import { btoa } from './base64';
import { blobFromBase64, blobFromDataUrl, blobFromString } from './blob';

describe('Blob', () => {
  describe('From string', () => {
    it('converts to a valid blob.', () => {
      // Arrange
      // Actual
      const actual = blobFromString('String stream');
      // Assert
      expect(actual).toBeTruthy();
    });

    it('converts to a valid blob of the given type.', () => {
      // Arrange
      const expected = 'text/html';
      // Actual
      const actual = blobFromString('String stream', { type: expected });
      // Assert
      expect(actual.type).toEqual(expected);
    });
  });

  describe('From base64', () => {
    it('converts to a valid blob.', () => {
      // Arrange
      const b64 = btoa('String stream');
      // Actual
      const actual = blobFromBase64(b64);
      // Assert
      expect(actual).toBeTruthy();
    });

    it('converts to the correct type.', () => {
      // Arrange
      const b64 = btoa('<b>String stream</b>');
      const expected = 'text/html';
      // Actual
      const actual = blobFromBase64(b64, { type: expected });
      // Assert
      expect(actual.type).toEqual(expected);
    });
  });

  describe('From data url', () => {
    it('converts to a valid blob for a base64 encoded url.', () => {
      // Arrange
      const text = 'Simple text';
      const encoded = btoa(text);
      const url = `data:text/html;base64,${encoded}`;
      // Act
      const actual = blobFromDataUrl(url);
      // Assert
      expect(actual).toBeTruthy();
    });

    it('converts to a valid blob for a plain text url.', () => {
      // Arrange
      const url = 'data:text/html,some-html-text';
      // Act
      const actual = blobFromDataUrl(url);
      // Assert
      expect(actual).toBeTruthy();
    });

    it('converts the correct mime type.', () => {
      // Arrange
      const url = 'data:text/html,some-html-text';
      // Act
      const actual = blobFromDataUrl(url);
      // Assert
      expect(actual.type).toEqual('text/html');
    });

    it('defaults the mime type to plain text with ascii encoding.', () => {
      // Arrange
      const url = 'data:,some-text';
      // Act
      const actual = blobFromDataUrl(url);
      // Assert
      expect(actual.type).toEqual('text/plain;charset=us-ascii');
    });
  });
});
