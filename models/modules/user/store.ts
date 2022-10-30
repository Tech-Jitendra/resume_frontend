import { types } from "mobx-state-tree";
import { withEnvironment } from "../..";
import {
  API_ENDPOINT,
  REQUEST_METHOD,
  TRAILING_SLASH,
  UTILS,
} from "../../api/endpoint.types";
import globalKeyStore from "../../api/global-key-store";
/**
 * Model description here for TypeScript hints.
 */
const UserSchema = {
  email: types.string,
  username: types.maybeNull(types.string),
  profile_picture: types.maybeNull(types.string),
  first_name: types.string,
  last_name: types.string,
  phone_number: types.maybeNull(types.string),
  id: types.identifierNumber,
};
const UserObject = types.model("UserObject").props(UserSchema);
const API_ENDPOINTS = {
  getLoggedInUser: new API_ENDPOINT({
    url: "/api/login/",
    method: REQUEST_METHOD.GET,
    paginated: false,
    response: UserSchema,
  }),
  logoutUser: new API_ENDPOINT({
    url: "/api/login/",
    method: REQUEST_METHOD.DELETE,
    paginated: false,
    response: null,
  }),
  loginUser: new API_ENDPOINT({
    url: "/api/token/",
    method: REQUEST_METHOD.POST,
    paginated: false,
    response: null,
    data_fields: ["email", "password"],
  }),
  loginGoogle: new API_ENDPOINT({
    url: "/social-auth/google/",
    method: REQUEST_METHOD.POST,
    paginated: false,
    response: null,
    data_fields: ["access_token"],
  }),
  loginFacebook: new API_ENDPOINT({
    url: "/social-auth/facebook/",
    method: REQUEST_METHOD.POST,
    paginated: false,
    response: null,
    data_fields: ["access_token"],
  }),
  signupUser: new API_ENDPOINT({
    url: "/api/register/",
    method: REQUEST_METHOD.POST,
    paginated: false,
    response: null,
    data_fields: ["email", "password1", "password2"],
  }),
  editUser: new API_ENDPOINT({
    url: "/api/users/", //append id
    method: REQUEST_METHOD.PATCH,
    paginated: false,
    response: UserSchema,
    data_fields: [
      "first_name",
      "last_name",
      "profile_picture",
      "phone_number",
      "username",
      "email",
    ],
  }),
  changePassword: new API_ENDPOINT({
    url: "/api/change-password/",
    method: REQUEST_METHOD.POST,
    paginated: false,
    response: null,
  }),
  resetPassword: new API_ENDPOINT({
    url: "/api/reset-password/",
    method: REQUEST_METHOD.POST,
    paginated: false,
    response: null,
  }),
};
export const UserStore = types
  .model("User")
  .props({
    user_data: types.maybeNull(UserObject),
    is_logged_in: types.maybeNull(types.boolean),
  })
  .extend(withEnvironment)
  .views((self) => ({
    isLoggedIn() {
      return self.is_logged_in;
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    _writeUserData(data) {
      self.user_data = UserObject.create(data);
    },
    _setUserLoginStatus(status) {
      self.is_logged_in = status;
    },
  }))
  .actions((self) => ({
    async getLoggedInUser(callback = null, access_token_bypass = null) {
      if (access_token_bypass)
        localStorage.setItem(
          self.environment.api.config.token_key,
          access_token_bypass
        );
      console.log(
        "after setting",
        localStorage.getItem(self.environment.api.config.token_key)
      );
      const response = await self.environment.api.call(
        API_ENDPOINTS.getLoggedInUser
      );
      switch (response.status) {
        case 405:
          localStorage.clear();
          self._setUserLoginStatus(false);
          break;
        case 200:
          const access_token = localStorage.getItem(
            self.environment.api.config.token_key
          );
          localStorage.clear();
          localStorage.setItem(
            self.environment.api.config.token_key,
            access_token
          );
          self._writeUserData(response.data);
          self._setUserLoginStatus(true);
          if (callback) callback();
          break;
        default:
          console.error("UNHANDLED ERROR");
          break;
      }
    },

    async loginUser(email, password, callback) {
      const response = await self.environment.api.call(
        API_ENDPOINTS.loginUser,
        {
          email: email,
          password: password,
        }
      );
      switch (response.status) {
        case 200:
          self._setUserLoginStatus(true);
          localStorage.setItem(
            self.environment.api.config.token_key,
            response.data["access"]
          );
          if (callback) callback();
          break;
        case 401:
          globalKeyStore.setGlobalModalContent(
            "Invalid credentials",
            "Your username password password combination are incorrect"
          );
          globalKeyStore.toggleGlobalModal(true);
        default:
          console.error("UNHANDLED ERROR");
          break;
      }
    },
    async logoutUser() {
      const response = await self.environment.api.call(
        API_ENDPOINTS.logoutUser
      );
      switch (response.status) {
        case 204:
        case 200:
          self._setUserLoginStatus(false);
          localStorage.removeItem(self.environment.api.config.token_key);
          localStorage.clear();
          break;
        default:
          localStorage.clear();
          console.error("UNHANDLED ERROR");
          break;
      }
    },
    async signupUser(email, password1, password2) {
      globalKeyStore.toggleLoader(true);
      const response = await self.environment.api.call(
        API_ENDPOINTS.signupUser,
        {
          email: email,
          password1: password1,
          password2: password2,
        }
      );
      globalKeyStore.toggleLoader(false);
      switch (response.status) {
        case 201:
          //successfull signup
          return true;
          break;
        case 400:
          let error = response.data["non_field_errors"].toString();
          if (error.includes("[")) error = error.replaceAll("[", "");
          if (error.includes("]")) error = error.replaceAll("]", "");
          error = error.replaceAll(",", "\n");

          globalKeyStore.setGlobalModalContent(
            "Signup failed!",
            error.replaceAll("'", "")
          );
          globalKeyStore.toggleGlobalModal(true);
          break;
        default:
          console.error("UNHANDLED ERROR");
          break;
      }
      return false;
    },
    async editUser(data: {
      first_name: string | null;
      last_name: string | null;
      phone_number: string | null;
      username: string | null;
      email: string | null;
      profile_picture: any | null;
    }) {
      let endpoint = new API_ENDPOINT(API_ENDPOINTS.editUser);
      endpoint.url += self.user_data.id + TRAILING_SLASH;
      globalKeyStore.toggleLoader(true);
      const response = await self.environment.api.call(
        endpoint,
        UTILS.packFormData(data)
      );
      globalKeyStore.toggleLoader(false);
      switch (response.status) {
        case 200:
          self._writeUserData(response.data);
          return true;
          break;
        default:
          console.error("UNHANDLED ERROR");
          break;
      }
      return false;
    },
    async changePassword(current_password, new_password) {
      globalKeyStore.toggleLoader(true);
      const response = await self.environment.api.call(
        API_ENDPOINTS.changePassword,
        {
          current_password: current_password,
          new_password: new_password,
        }
      );
      globalKeyStore.toggleLoader(false);
      switch (response.status) {
        case 200:
          globalKeyStore.setGlobalModalContent(
            "Password changed successfully",
            "Your password has been changed successfully"
          );
          globalKeyStore.toggleGlobalModal(true);
          break;
        case 400:
          globalKeyStore.setGlobalModalContent(
            "Password is insecure",
            response.data["errors"].toString().replaceAll(",", "\n")
          );
          globalKeyStore.toggleGlobalModal(true);
          break;
        case 401:
          globalKeyStore.setGlobalModalContent(
            "Incorrect Password!",
            "Current password is incorrect"
          );
          globalKeyStore.toggleGlobalModal(true);
          break;
        default:
          console.error("UNHANDLED ERROR");
          break;
      }
    },

    async resetPassword(email) {
      globalKeyStore.toggleLoader(true);
      const response = await self.environment.api.call(
        API_ENDPOINTS.resetPassword,
        {
          email: email
        }
      );
      globalKeyStore.toggleLoader(false);
      switch (response.status) {
        case 200:
          globalKeyStore.setGlobalModalContent(
            "Link sent successfully",
            "Your password reset link has been sent successfully"
          );
          globalKeyStore.toggleGlobalModal(true);
          break;
        case 400:
          globalKeyStore.setGlobalModalContent(
            "email is not valid",
            response.data["errors"].toString().replaceAll(",", "\n")
          );
          globalKeyStore.toggleGlobalModal(true);
          break;
        case 401:
          globalKeyStore.setGlobalModalContent(
            "Incorrect email!",
            "email is incorrect"
          );
          globalKeyStore.toggleGlobalModal(true);
          break;
        default:
          console.error("UNHANDLED ERROR");
          break;
      }
    },
    
    async loginFacebook(facebook_access_token, callback) {
      const response = await self.environment.api.call(
        API_ENDPOINTS.loginFacebook,
        {
          access_token: facebook_access_token,
        }
      );
      switch (response.status) {
        case 200:
          self._setUserLoginStatus(true);
          localStorage.setItem(
            self.environment.api.config.token_key,
            response.data["access_token"]
          );
          if (callback) callback();
          break;
        case 400:
          globalKeyStore.setGlobalModalContent(
            "Invalid credentials",
            "User is already registered with this e-mail address."
          );
          globalKeyStore.toggleGlobalModal(true);
        default:
          console.error("UNHANDLED ERROR");
          break;
      }
    },
    
    async loginGoogle(google_access_token, callback) {
      const response = await self.environment.api.call(
        API_ENDPOINTS.loginGoogle,
        {
          access_token: google_access_token,
        }
      );
      switch (response.status) {
        case 200:
          self._setUserLoginStatus(true);
          localStorage.setItem(
            self.environment.api.config.token_key,
            response.data["access_token"]
          );
          if (callback) callback();
          break;
        case 400:
          globalKeyStore.setGlobalModalContent(
            "User Exists",
            "User is already registered with this e-mail address."
          );
          globalKeyStore.toggleGlobalModal(true);
        default:
          console.error("UNHANDLED ERROR");
          break;
      }
    },
  }));
