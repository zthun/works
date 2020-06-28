export function createMocked<T>(methods?: Array<keyof T>): jest.Mocked<T> {
  const mockup: jest.Mocked<T> = {} as jest.Mocked<T>;

  methods = methods || [];
  methods.forEach((method) => {
    mockup[method] = (jest.fn() as unknown) as jest.Mocked<T>[keyof T];
  });

  return mockup;
}
