/* eslint-disable require-jsdoc */
import { createMocked } from '@zthun/works.jest';
import { IZAlertService } from '@zthun/works.message';
import { ZErrorMessageHandlerAlert } from './error-message-handler-alert';

describe('ZErrorMessageHandlerAlert', () => {
  let alerts: jest.Mocked<IZAlertService>;

  function createTestTarget() {
    return new ZErrorMessageHandlerAlert(alerts);
  }

  beforeEach(() => {
    alerts = createMocked(['create']);
    alerts.create.mockImplementation((a) => Promise.resolve(a));
  });

  it('should invoke one alert for multiple messages.', async () => {
    // Arrange
    const messages = ['one', 'two'];
    const expected = messages.join('\n');
    const target = createTestTarget();
    // Act
    await target.handle(messages);
    // Assert
    expect(alerts.create).toHaveBeenCalledWith(expect.objectContaining({ message: expected }));
  });
});
