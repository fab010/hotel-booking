/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
  "/",
  "/search",
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
  "/login",
  "/register",
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiPrefix = "/api/";

/**
 * The prefix for hotel routes
 * Routes that start with this hotel routes
 * @type {string}
 */

export const hotelRoutes = "/hotel";

/**
 * The hotel details route
 * Routes that start with the hotel routes and ends with details path
 * @type {string}
 */

export const hotelDetailsRoute = "/details";




/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";