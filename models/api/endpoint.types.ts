import { types } from "mobx-state-tree";
export enum REQUEST_METHOD {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  DELETE = "DELETE",
}
export const PaginatedSchemaBase = {
  count: types.number,
  next: types.maybeNull(types.string),
  previous: types.maybeNull(types.string),
};
export const PAGINATION_FILTERS = {
  PAGE_NUMBER: "page",
  PAGE_SIZE: "page_size",
  DISABLE_PAGINATION: "all_pages",
};
export const UTILS = {
  getPageNumber(url_string) {
    if (url_string) {
      let url = new URL(url_string);
      return parseInt(url.searchParams.get(PAGINATION_FILTERS.PAGE_NUMBER));
    } else {
      return 1;
    }
  },
  getSubdomain(url_string) {
    if (url_string) {
      let url = new URL(url_string);
      if (url.hostname.includes("www")) {
        return url.hostname.split(".")[1];
      }
      return url.hostname.split(".")[0];
    } else {
      return null;
    }
  },
  getCurrentHttpPrefix() {
    return;
  },
  injectSubdomain(subdomain, url) {
    const http_prefix = window.location.href.split(":")[0] + "://";
    const baseURL = new URL(url);
    if (baseURL.host.includes("www")) {
      subdomain = baseURL.host.replace("www", subdomain);
    } else {
      subdomain += "." + baseURL.host;
    }
    return http_prefix + subdomain;
  },
  packFormData(data): FormData {
    let formData = new FormData();
    for (const field in data) {
      formData.append(field, data[field]);
    }
    return formData;
  },
};
export const TRAILING_SLASH = "/";
export class API_ENDPOINT {
  url: string; //the url
  method: REQUEST_METHOD; //the request method
  response: any; //the expected response in JSON
  transformer: Function; //transforming the response if needed
  paginated: boolean; //is this a paginated response
  data_fields: Array<string>; //expected list of fields in PATCH and POST request data
  public constructor(init?: Partial<API_ENDPOINT>) {
    const required_fields = ["url", "method", "paginated"];
    var missing_fields = [];
    required_fields.forEach((field) => {
      field in init ? null : missing_fields.push(field);
    });
    if (missing_fields.length > 0) {
      console.error(
        missing_fields.toString(),
        "are required fields for API Endpoint, currently you have",
        Object.keys(init).toString()
      );
    }
    if (init.data_fields == null) {
      init.data_fields == [];
    }
    Object.assign(this, init);
  }
}
export function transformObjectFromSchema(object, schema) {
  if (!schema) return object;
  for (const field in object) {
    switch (schema[field]) {
      case types.Date:
        object[field] = new Date(object[field]);
        break;
      case types.integer:
        object[field] = parseInt(object[field]);
        break;
      case types.number:
      case types.identifierNumber:
        object[field] = parseFloat(object[field]);
        break;
      case types.boolean:
        object[field] = Boolean(object[field]);
    }
  }
  return object;
}
export type API_SCHEMA = typeof API_ENDPOINT;
