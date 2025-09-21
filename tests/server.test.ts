describe('server.ts', () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = { ...process.env };
    jest.resetModules();
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.resetModules();
  });

  it('should call app.listen with default port', () => {
    process.env.PORT = '';
    const mockListen = jest.fn((_port, _hostname, cb) => cb && cb());
    jest.doMock('../src/app', () => ({
      __esModule: true,
      default: { listen: mockListen }
    }));
    require('../src/server');
    expect(mockListen).toHaveBeenCalledWith(8000, '0.0.0.0', expect.any(Function));
  });

  it('should call app.listen with custom port', () => {
    process.env.PORT = '4321';
    const mockListen = jest.fn((_port, _hostname, cb) => cb && cb());
    jest.doMock('../src/app', () => ({
      __esModule: true,
      default: { listen: mockListen }
    }));
    require('../src/server');
    expect(mockListen).toHaveBeenCalledWith(4321, '0.0.0.0', expect.any(Function));
  });
});