import React from 'react'


import {
  API_ENDPOINT,
  REQUEST_METHOD,
  PAGINATION_FILTERS,
  UTILS,
  PaginatedSchemaBase,
  TRAILING_SLASH,
} from "../../api/endpoint.types";
import * as OscarSchemas from "./schemas";

export const API_ENDPOINTS = {
  getProductList: new API_ENDPOINT({
    url: "/api/products/",
    method: REQUEST_METHOD.GET,
    paginated: true,
    response: OscarSchemas.ProductBaseSchema,
    transformer: (x) => {
      x["images"].forEach((i) => {
        i["date_created"] = new Date(i["date_created"]);
      });
      x["children"].forEach((i) => {
        i["images"].forEach((j) => {
          j["date_created"] = new Date(j["date_created"]);
        });
      });
      return x;
    },
  }),
  getProductDetails: new API_ENDPOINT({
    url: "/api/products/",
    method: REQUEST_METHOD.GET,
    paginated: false,
    response: OscarSchemas.ProductSchema,
    transformer: (x) => {
      x["images"].forEach((i) => {
        i["date_created"] = new Date(i["date_created"]);
      });
      x["stockrecords"].forEach((i) => {
        i["date_created"] = new Date(i["date_created"]);
        i["date_updated"] = new Date(i["date_updated"]);
        i["price"] = parseFloat(i["price"]);
      });
      if (x["structure"] == "parent") {
        x["children"].forEach((v) => {
          v["date_created"] = new Date(v["date_created"]);
          v["date_updated"] = new Date(v["date_updated"]);
          v["images"].forEach((j) => {
            j["date_created"] = new Date(j["date_created"]);
          });
          return v;
        });
      }
      return x;
    },
  }),
  getCategories: new API_ENDPOINT({
    url: "/api/categories/",
    method: REQUEST_METHOD.GET,
    paginated: true,
    response: OscarSchemas.CategorySchema,
  }),
  getBaskets: new API_ENDPOINT({
    url: "/api/baskets/",
    method: REQUEST_METHOD.GET,
    paginated: false,
    response: OscarSchemas.BasketSchema,
    transformer: (x) => {
      x.forEach((y) => {
        y.forEach((z) => {
          console.log(z);
          z["total_excl_tax"] = parseFloat(z["total_excl_tax"]);
          z["total_incl_tax"] = parseFloat(z["total_incl_tax"]);
          z["total_incl_tax_excl_discounts"] = parseFloat(
            z["total_incl_tax_excl_discounts"]
          );
          z["total_excl_tax_excl_discounts"] = parseFloat(
            z["total_excl_tax_excl_discounts"]
          );
          z["total_tax"] = parseFloat(z["total_tax"]);
        });
      });
      return x;
    },
  }),
  addVoucher: new API_ENDPOINT({
    url: "/api/basket/add-voucher/",
    method: REQUEST_METHOD.POST,
    paginated: false,
  }),
  getBasketsLines: new API_ENDPOINT({
    url: "/api/baskets/", //append /lines/ in url
    method: REQUEST_METHOD.GET,
    paginated: false,
    response: OscarSchemas.BasketLineObject,
    transformer: (x) => {
      x.forEach((y) => {
        y["price_excl_tax"] = parseFloat(y["price_excl_tax"]);
        y["price_incl_tax"] = parseFloat(y["price_incl_tax"]);
        y["price_incl_tax_excl_discounts"] = parseFloat(
          y["price_incl_tax_excl_discounts"]
        );
        y["price_excl_tax_excl_discounts"] = parseFloat(
          y["price_excl_tax_excl_discounts"]
        );
        y["date_created"] = new Date(y["date_created"]);
        y["date_updated"] = new Date(y["date_updated"]);
        y["product"]["date_created"] = new Date(y["date_created"]);
        y["product"]["date_updated"] = new Date(y["date_updated"]);
        y["product"]["images"].forEach((i) => {
          i["date_created"] = new Date(i["date_created"]);
        });
      });

      return x;
    },
  }),
  addToBasket: new API_ENDPOINT({
    url: "/api/basket/add-product/",
    method: REQUEST_METHOD.POST,
    paginated: false,
    data_fields: ["url", "quantity", "options"],
  }),
  deleteBasket: new API_ENDPOINT({
    url: "/api/baskets/", //append id
    method: REQUEST_METHOD.DELETE,
    paginated: false,
  }),
  deleteBasketLine: new API_ENDPOINT({
    url: "/api/baskets/", //append basket id followed by lines and then basketLine id
    method: REQUEST_METHOD.DELETE,
    paginated: false,
  }),
  changeBasketLineQuantity: new API_ENDPOINT({
    url: "/api/baskets/", //append basket id followed by lines and then basketLine id
    method: REQUEST_METHOD.PATCH,
    paginated: false,
    data_fields: ["quantity"],
  }),
  checkoutBasket: new API_ENDPOINT({
    url: "/api/checkout/",
    method: REQUEST_METHOD.POST,
    paginated: false,
    data_fields: ["basket", "shipping_address", "billing_address"],
  }),
  getCountries: new API_ENDPOINT({
    url: "/api/countries/",
    method: REQUEST_METHOD.GET,
    paginated: true, //use page_size=249
    response: OscarSchemas.CountrySchema,
  }),
  createAddress: new API_ENDPOINT({
    url: "/api/useraddresses/",
    method: REQUEST_METHOD.POST,
    paginated: false,
    response: OscarSchemas.UserAddressSchema,
  }),
  editAddress: new API_ENDPOINT({
    url: "/api/useraddresses/", //append id
    method: REQUEST_METHOD.PATCH,
    paginated: false,
    response: OscarSchemas.UserAddressSchema,
  }),
  getAddresses: new API_ENDPOINT({
    url: "/api/useraddresses/",
    method: REQUEST_METHOD.GET,
    paginated: true,
    response: OscarSchemas.UserAddressSchema,
  }),
  getOrders: new API_ENDPOINT({
    url: "/api/orders/",
    method: REQUEST_METHOD.GET,
    paginated: true,
    response: OscarSchemas.OrderSchema,
    transformer: (x) => {
      x["lines"].forEach((y) => {
        y["price_excl_tax"] = parseFloat(y["price_excl_tax"]);
        y["price_incl_tax"] = parseFloat(y["price_incl_tax"]);
        y["price_incl_tax_excl_discounts"] = parseFloat(
          y["price_incl_tax_excl_discounts"]
        );
        y["price_excl_tax_excl_discounts"] = parseFloat(
          y["price_excl_tax_excl_discounts"]
        );
        y["date_created"] = new Date(y["date_created"]);
        y["date_updated"] = new Date(y["date_updated"]);
        y["product"]["date_created"] = new Date(y["date_created"]);
        y["product"]["date_updated"] = new Date(y["date_updated"]);
        y["product"]["images"].forEach((i) => {
          i["date_created"] = new Date(i["date_created"]);
        });
      });
      return x;
    },
  }),
  getOrderDetails: new API_ENDPOINT({
    url: "/api/orders/", //append id
    method: REQUEST_METHOD.GET,
    paginated: false,
    response: OscarSchemas.OrderSchema,
    transformer: (x) => {
      x["lines"].forEach((y) => {
        y["price_excl_tax"] = parseFloat(y["price_excl_tax"]);
        y["price_incl_tax"] = parseFloat(y["price_incl_tax"]);
        y["price_incl_tax_excl_discounts"] = parseFloat(
          y["price_incl_tax_excl_discounts"]
        );
        y["price_excl_tax_excl_discounts"] = parseFloat(
          y["price_excl_tax_excl_discounts"]
        );
        y["date_created"] = new Date(y["date_created"]);
        y["date_updated"] = new Date(y["date_updated"]);
        y["product"]["date_created"] = new Date(y["date_created"]);
        y["product"]["date_updated"] = new Date(y["date_updated"]);
        y["product"]["images"].forEach((i) => {
          i["date_created"] = new Date(i["date_created"]);
        });
      });

      return x;
    },
  }),
  getOrdersLines: new API_ENDPOINT({
    url: "/api/orders/", //append /lines/ in url
    method: REQUEST_METHOD.GET,
    paginated: false,
    response: OscarSchemas.OrderLineSchema,
    transformer: (x) => {
      x.forEach((y) => {
        y["price_excl_tax"] = parseFloat(y["price_excl_tax"]);
        y["price_incl_tax"] = parseFloat(y["price_incl_tax"]);
        y["price_incl_tax_excl_discounts"] = parseFloat(
          y["price_incl_tax_excl_discounts"]
        );
        y["price_excl_tax_excl_discounts"] = parseFloat(
          y["price_excl_tax_excl_discounts"]
        );
        y["date_created"] = new Date(y["date_created"]);
        y["date_updated"] = new Date(y["date_updated"]);
        y["product"]["date_created"] = new Date(y["date_created"]);
        y["product"]["date_updated"] = new Date(y["date_updated"]);
        y["product"]["images"].forEach((i) => {
          i["date_created"] = new Date(i["date_created"]);
        });
      });
      return x;
    },
  }),
  createUserReview: new API_ENDPOINT({
    url: "/api/user/product/review/",
    method: REQUEST_METHOD.POST,
    paginated: false,
    // response: OscarSchemas.ProductReviewSchema,
  }),
  getProductReview: new API_ENDPOINT({
    url: "/api/product/review/",
    method: REQUEST_METHOD.GET,
    paginated: true,
    response: OscarSchemas.ProductReviewSchema,
  }),
  getUserReview: new API_ENDPOINT({
    url: "/api/user/product/review/",
    method: REQUEST_METHOD.GET,
    paginated: false,
    response: OscarSchemas.UserReviewSchema,
  }),
  deleteUserReview: new API_ENDPOINT({
    url: "/api/user/product/review/",
    method: REQUEST_METHOD.DELETE,
    paginated: false,
    response: null,
  }),
  getVendors: new API_ENDPOINT({
    url: "/api/vendor-apis/vendors/",
    method: REQUEST_METHOD.GET,
    paginated: false,
    response: OscarSchemas.VendorSchema,
    transformer: (x) => {
      x["id"] = parseInt(x["id"]);
      x["owner"] = parseInt(x["owner"]);
      x["created"] = new Date(x["created"]);
      x["modified"] = new Date(x["modified"]);
      return x;
    },
  }),
  getWishlist: new API_ENDPOINT({
    url: "/api/wishlist/",
    method: REQUEST_METHOD.GET,
    paginated: true,
    response: OscarSchemas.WishlistSchema,
    transformer: (x) => {
      x["product"]["images"].forEach((i) => {
        i["date_created"] = new Date(i["date_created"]);
      });
      x["product"]["date_created"] = new Date(x["product"]["date_created"]);
      x["product"]["date_updated"] = new Date(x["product"]["date_updated"]);
      delete x["product"]["price"];
      delete x["product"]["stockrecords"];
      if ("children" in x["product"]) delete x["product"]["children"];
      return x;
    },
  }),
  addToWishlist: new API_ENDPOINT({
    url: "/api/wishlist/",
    method: REQUEST_METHOD.POST,
    paginated: false,
    response: OscarSchemas.WishlistSchema,
  }),
  // removeFromWishlist: new API_ENDPOINT({
  //   url: "/api/wishlist/", //append id
  //   method: REQUEST_METHOD.DELETE,
  //   paginated: false,
  //   response: null,
  // }),
  isInWishlist: new API_ENDPOINT({
    url: "/api/wishlist/is_in_wishlist/?product_url=", //append product_url
    method: REQUEST_METHOD.GET,
    paginated: false,
    response: null,
  }),
  removeFromWishlist: new API_ENDPOINT({
    url: "/api/wishlist/delete_via_url/?product_url=", //append product_url
    method: REQUEST_METHOD.DELETE,
    paginated: false,
    response: null,
  }),
  getWishlistProductUrls: new API_ENDPOINT({
    url: "/api/wishlist/all_product_urls/",
    method: REQUEST_METHOD.GET,
    paginated: false,
    response: null,
  }),
  //ONLY FOR VENDORS--------
  getMyStore: new API_ENDPOINT({
    url: "/api/vendor-apis/vendors/my_store/",
    method: REQUEST_METHOD.GET,
    paginated: false,
    response: OscarSchemas.VendorSchema,
  }),
  customizeStore: new API_ENDPOINT({
    url: "/api/vendor-apis/vendors/customize_store/",
    method: REQUEST_METHOD.PATCH,
    paginated: false,
    response: null,
  }),
  addPromotion: new API_ENDPOINT({
    url: "/api/vendor-apis/vendors/add_promotion/",
    method: REQUEST_METHOD.POST,
    paginated: false,
    response: null,
  }),
  deletePromotion: new API_ENDPOINT({
    url: "/api/vendor-apis/vendors/remove_promotion/?pk=", //append promotion pk
    method: REQUEST_METHOD.DELETE,
    paginated: false,
    response: null,
  }),
  editPromotion: new API_ENDPOINT({
    url: "/api/vendor-apis/vendors/edit_promotion/?pk=", //append promotion pk
    method: REQUEST_METHOD.PATCH,
    paginated: false,
    response: null,
  }),
  getPromotionsWeb: new API_ENDPOINT({
    url: "/api/vendor-apis/promotion/web/",
    method: REQUEST_METHOD.GET,
    paginated: true,
    response: OscarSchemas.VendorPromotionSchema,
  }),
  fetchStoreQuestions: new API_ENDPOINT({
    url: "/api/vendor-apis/store-question/",
    method: REQUEST_METHOD.GET,
    paginated: false,
    response: OscarSchemas.StoreQuestionObject,
  }),
  addStoreQuestion: new API_ENDPOINT({
    url: "/api/vendor-apis/store-question/",
    method: REQUEST_METHOD.POST,
    paginated: false,
    response: null,
  }),
  deleteStoreQuestion: new API_ENDPOINT({
    url: "/api/vendor-apis/store-question/",
    method: REQUEST_METHOD.DELETE,
    paginated: false,
    response: null,
  }),
  editStoreQuestion: new API_ENDPOINT({
    url: "/api/vendor-apis/store-question/",
    method: REQUEST_METHOD.PATCH,
    paginated: false,
    response: null,
  }),
  fetchProduct3dImages: new API_ENDPOINT({
    url: "/api/vendor-apis/product3dimage/",
    method: REQUEST_METHOD.GET,
    paginated: false,
    response: null,
  }),
  uploadProduct3dInputImage: new API_ENDPOINT({
    url: "/api/vendor-apis/product3dimage/",
    method: REQUEST_METHOD.POST,
    paginated: false,
    response: null,
  }),
  deleteProduct3dImage: new API_ENDPOINT({
    url: "/api/vendor-apis/product3dimage/",
    method: REQUEST_METHOD.DELETE,
    paginated: false,
    response: null,
  }),
  //-------------
};
