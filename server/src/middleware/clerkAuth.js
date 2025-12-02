// Mock auth middleware for development
export const requireAuth = (req, res, next) => {
  // For now, create a mock user ID for testing
  req.userId = 'mock-user-id';
  next();
};

export const getClerkUserId = (req) => {
  return req.userId || 'mock-user-id';
};