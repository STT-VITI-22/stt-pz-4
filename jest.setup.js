// jest.setup.js
// Custom matchers for Jest

expect.extend({
  toHaveBeenCalledBefore(received, other) {
    const receivedCalls = received.mock.invocationCallOrder;
    const otherCalls = other.mock.invocationCallOrder;
    
    if (receivedCalls.length === 0 || otherCalls.length === 0) {
      return {
        pass: false,
        message: () => 'One or both spies were not called',
      };
    }
    
    const pass = receivedCalls[0] < otherCalls[0];
    
    return {
      pass,
      message: () =>
        pass
          ? `Expected ${received.getMockName()} not to be called before ${other.getMockName()}`
          : `Expected ${received.getMockName()} to be called before ${other.getMockName()}`,
    };
  },
});