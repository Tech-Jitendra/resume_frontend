import { ApisauceInstance, create, ApiResponse } from "apisauce";
import { getGeneralApiProblem } from "./api-problem";
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config";

import {
  API_ENDPOINT,
  REQUEST_METHOD,
  transformObjectFromSchema,
  TRAILING_SLASH,
  PAGINATION_FILTERS,
} from "./endpoint.types";
/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance;

  /**
   * Configurable options.
   */
  config: ApiConfig;
  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config;
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    var bearer_token = localStorage.getItem("auth_token");
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    });
  }
  async call(
    endpoint: API_ENDPOINT,
    payload: Object | FormData | String = {},
    id: String = ""
  ): Promise<any> {
    console.log(endpoint);
    const token = localStorage.getItem(this.config.token_key);
    if (token) {
      this.apisauce.setHeader("Authorization", "Bearer " + token);
    }
    switch (endpoint.method) {
      /**
       * GET REQUEST
       * */
      case REQUEST_METHOD.GET:
        if (endpoint.url.at(-1) != TRAILING_SLASH) {
          endpoint.url += TRAILING_SLASH;
        }
        var response: ApiResponse<any> = await this.apisauce.get(
          endpoint.url,
          payload
        );
        if (!response.ok) {
          break;
        }
        if (!(PAGINATION_FILTERS.DISABLE_PAGINATION in payload)) {
          if (endpoint.paginated) {
            response.data["results"].map((x) => {
              return transformObjectFromSchema(x, endpoint.response);
            });
          } else {
            response.data = transformObjectFromSchema(
              response.data,
              endpoint.response
            );
          }
        }
        if (endpoint.transformer) {
          if (endpoint.paginated) {
            response.data["results"].map(endpoint.transformer);
          } else {
            response.data=endpoint.transformer(response.data);
          }
        }
        console.log(response);
        return response;
      /**
       * POST REQUEST
       * */
      case REQUEST_METHOD.POST:
        var response: ApiResponse<any> = await this.apisauce.post(
          endpoint.url,
          payload
        );
        if (!response.ok) {
          break;
        }
        response.data = transformObjectFromSchema(
          response.data,
          endpoint.response
        );
        console.log(response);
        return response;
      /**
       * PATCH REQUEST
       */
      case REQUEST_METHOD.PATCH:
        // if (endpoint.data_fields.length > 0) {
        //   var new_payload = {};
        //   endpoint.data_fields.forEach((field) => {
        //     new_payload[field] = payload[field];
        //   });
        //   payload = new_payload;
        // }
        if(id){endpoint.url+= id + TRAILING_SLASH}
        var response: ApiResponse<any> = await this.apisauce.patch(
          endpoint.url,
          payload
        );
        if (!response.ok) {
          break;
        }
        response.data = transformObjectFromSchema(
          response.data,
          endpoint.response
        );
        console.log(response);
        return response;
      /**
       * DELETE REQUEST
       */
      case REQUEST_METHOD.DELETE:
        if (payload && payload["id"]) {
          endpoint.url += payload["id"] + TRAILING_SLASH;
        }
        var response: ApiResponse<any> = await this.apisauce.delete(
          endpoint.url
        );
        if (!response.ok) {
          break;
        }
        console.log(response);
        return response;
    }
    //handle error here
    console.error("error");
    console.log(response);
    return response;
  }
}