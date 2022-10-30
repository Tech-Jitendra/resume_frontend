// Use this import if you want to use "env.js" file
// const { API_URL } = require("../../config/env")
// Or just specify it directly like this:
const API_URL = "http://localhost:8001"
// export const TAP_PAYMENT_PUBLIC_KEY = "pk_test_Vlk842B1EA7tDN5QbrfGjYzh";
// export const TAP_PAYMENT_REDIRECT_URL =
//   "http://thevibestown.highpolar.in/orders";
// export const TAP_PAYMENT_POST_URL = null;
/**
 * The options used to configure the API.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string;

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number;
  /**
   * auth token storage key
   */
  token_key: string;
}

/**
 * The default configuration for the app.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: API_URL,
  timeout: 100000,
  token_key: "token",
};
