export const GoogleSignin = {
  configure: jest.fn(),
  hasPlayServices: jest.fn(() => Promise.resolve(true)),
  signIn: jest.fn(() =>
    Promise.resolve({
      user: {
        id: "mock-user-id",
        email: "mock@example.com",
        name: "Mock User",
        photo: "https://example.com/photo.jpg",
      },
      idToken: "mock-id-token",
    }),
  ),
  signInSilently: jest.fn(() =>
    Promise.resolve({
      user: {
        id: "mock-user-id",
        email: "mock@example.com",
        name: "Mock User",
      },
    }),
  ),
  signOut: jest.fn(() => Promise.resolve()),
  revokeAccess: jest.fn(() => Promise.resolve()),
  isSignedIn: jest.fn(() => Promise.resolve(false)),
  getCurrentUser: jest.fn(() => Promise.resolve(null)),
  getTokens: jest.fn(() =>
    Promise.resolve({
      idToken: "mock-id-token",
      accessToken: "mock-access-token",
    }),
  ),
};

export const statusCodes = {
  SIGN_IN_CANCELLED: "SIGN_IN_CANCELLED",
  IN_PROGRESS: "IN_PROGRESS",
  PLAY_SERVICES_NOT_AVAILABLE: "PLAY_SERVICES_NOT_AVAILABLE",
};
