export const useAuthRequest = jest.fn(() => {
  return [{}, {}, jest.fn()];
});

export const makeRedirectUri = jest.fn(() => "https://redirect.mock");
