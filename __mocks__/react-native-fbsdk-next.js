export const LoginManager = {
  logInWithPermissions: jest.fn(() => Promise.resolve({ isCancelled: false })),
};

export const AccessToken = {
  getCurrentAccessToken: jest.fn(() =>
    Promise.resolve({ accessToken: "fake-token" })
  ),
};

export const GraphRequest = jest.fn();
export const GraphRequestManager = jest.fn(() => ({
  addRequest: jest.fn().mockReturnThis(),
  start: jest.fn(),
}));
