// common utils for simple API testing in development phase

// change this var to true when you are testing the API endpoints without logging in
export const testingAPI = true;

const fakeUserSession = {
  user: {
    _id: '65ae7bbe24dc37492f2581c2',
  },
};

// returns a fake user session when testing the API
export const makeSessionForAPITest = () => {
  return testingAPI ? fakeUserSession : null;
};
