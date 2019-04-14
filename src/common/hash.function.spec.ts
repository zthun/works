import { zhash, zhashcmp } from './hash.function';

describe('Hashing', () => {
  let password: string;

  beforeEach(() => {
    password = 'should-fool-the-government';
  });

  describe('zhash', () => {
    it('hashes the password with a 10 step bcrypt.', async () => {
      // Arrange
      // Act
      const actual = await zhash(password);
      const same = await zhashcmp(password, actual);
      // Assert
      expect(same).toBeTruthy();
    });
  });
});
