/**
 * Runs an assertion that when the target invokes a method, then a message sends along the proxy object.
 *
 * This is mostly designed around the nestjs ClientProxy object, but you can use it for any proxy that implements
 * a send method that takes a pattern and a payload.
 *
 * @param pattern The command pattern being sent
 * @param payload The expected send payload
 * @param proxy The proxy mock to verify a send invocation
 * @param createTestTarget The target creation factory
 * @param sendFn The method that should cause the invocation of the proxy send method.
 */
export async function assertProxySendsMessage<T, C>(pattern: any, payload: T, proxy: jest.Mocked<{ send: (pattern: any, payload: any) => any }>, createTestTarget: () => C, sendFn: (t: C, p: T) => Promise<any>) {
  // Arrange.
  const target = createTestTarget();
  // Act - note - The Promise.resolve just handles the case that we should await something if the proxy is returning promises.
  // Anything else can just be bypassed.
  const result = sendFn(target, payload);
  await Promise.resolve(true).then(() => result);
  // Assert.
  expect(proxy.send).toHaveBeenCalledWith(pattern, payload);
}
