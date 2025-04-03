// Add any global test setup here
jest.setTimeout(10000); // 10 second timeout

// Mock console.error to keep test output clean
console.error = jest.fn();
console.warn = jest.fn();
