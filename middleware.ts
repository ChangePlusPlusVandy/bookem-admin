import { testingAPI } from './utils/api-testing';

/**
 * THIS FILE HAS TO STAY HERE!
 * Use the default next-auth middleware pattern.
 * If a user is not logged in, the default behavior is
 * to redirect them to the sign-in page.
 */
export { default } from 'next-auth/middleware';

/**
 * Configure which api routes to authenticate
 */
export const config = {
  matcher: ['/api/:function*'],
};


function middleware() {}
// when in development, export the empty middleware function
if (testingAPI) {
  module.exports = { ...module.exports, middleware };
}