export const setNotificationHandler = jest.fn(() => Promise.resolve());
export const getPermissionsAsync = jest.fn(() =>
  Promise.resolve({ status: "granted" }),
);
export const requestPermissionsAsync = jest.fn(() =>
  Promise.resolve({ status: "granted" }),
);
