import { types, flow } from "mobx-state-tree";
import { withEnvironment } from "../..";
import _ from "lodash";
import {
  API_ENDPOINT,
  REQUEST_METHOD,
  PAGINATION_FILTERS,
  UTILS,
  PaginatedSchemaBase,
  TRAILING_SLASH,
} from "../../api/endpoint.types";
// import * as OscarSchemas from "./schemas";
// import { API_ENDPOINTS } from "./endpoints";
import globalKeyStore from "../../api/global-key-store";

/**
 * Model description here for TypeScript hints.
 */
export const OscarStore = types
  .model("Oscar")
  .props({
    //productList:types.array(ProductBaseObject),
    // selectedProduct: types.maybeNull(OscarSchemas.ProductObject),
    // selectedProductQuantity: 0,
    // selectedProductOptions: types.array(
    //   OscarSchemas.SelectableProductOptionObject
    // ),
    // selectedProductOptionSelected: types.array(
    //   OscarSchemas.ProductOptionSelectObject
    // ),
    // paginatedProductList: types.maybeNull(OscarSchemas.PaginatedProductsObject),
    // paginatedFilteredProductList: types.maybeNull(
    //   OscarSchemas.PaginatedProductsObject
    // ),
    // current_page: types.maybeNull(types.number),
    // //categories:types.array(CategoryObject),
    // paginatedCategories: types.maybeNull(OscarSchemas.PaginatedCategoryObject),
    // baskets: types.array(OscarSchemas.BasketObject),
    // basketLines: types.array(OscarSchemas.BasketLineObject),
    // //----------------------
    // countries: types.array(OscarSchemas.CountryObject),
    // addresses: types.array(OscarSchemas.UserAddressObject),
    // //-----------------------
    // selectedAddressForDelivery: types.maybeNull(OscarSchemas.UserAddressObject),
    // selectedAddressForBilling: types.maybeNull(OscarSchemas.UserAddressObject),
    // selectedAddressForEditing: types.maybeNull(OscarSchemas.UserAddressObject),
    // billingAddressSameAsShippingAddress: false,
    // //----------
    // orders: types.array(OscarSchemas.OrderObject),
    // orderLines: types.array(OscarSchemas.OrderLineObject),
    // selectedOrder: types.maybeNull(OscarSchemas.OrderObject),
    // ProductReviews: types.array(OscarSchemas.ProductReviewObject),
    // UserReviews: types.maybeNull(OscarSchemas.UserReviewObject),
    // //------------------------------
    // vendors: types.array(OscarSchemas.VendorObject),
    // filteredVendors: types.array(OscarSchemas.VendorObject),
    // selectedVendor: types.maybeNull(OscarSchemas.VendorObject),
    // selectedVendorCategories: types.array(OscarSchemas.CategoryObject),
    // selectedVendorProducts: types.array(OscarSchemas.ProductBaseObject),
    // //------------------
    // wishlist: types.array(OscarSchemas.WishlistObject),
    // wishlistProductUrls: types.array(types.string),
    // //-----------------------
    // promotions: types.array(OscarSchemas.VendorPromotionObject),
    // StoreQuestions: types.array(OscarSchemas.StoreQuestionObject),
    // //----------------------------------------------
    // product3DList: types.array(OscarSchemas.ProductWise3D),
    // selectedProduct3DImageInputs: types.array(OscarSchemas.Product3DInputImage),
  })
  .extend(withEnvironment)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  // .actions((self) => ({
  //   _writeSelectedVendorVendorPromotion(id, values) {
  //     self.selectedVendor.vendorpromotion_set[
  //       self.selectedVendor.vendorpromotion_set.findIndex(
  //         (promotion) => promotion.id == id
  //       )
  //     ] = OscarSchemas.VendorPromotionObject.create({
  //       id: id,
  //       ...values,
  //     });
  //   },
  //   _deleteSelectedVendorVendorPromotion(id) {
  //     self.selectedVendor.vendorpromotion_set.splice(
  //       self.selectedVendor.vendorpromotion_set.findIndex(
  //         (promotion) => promotion.id == id
  //       ),
  //       1
  //     );
  //   },
  //   //local actions;
  //   _writeWishlistProductUrls(values) {
  //     self.wishlistProductUrls.replace(values);
  //   },
  //   _removeWishlistProductUrl(value) {
  //     self.wishlistProductUrls.remove(value);
  //   },
  //   _writeWishlist(values) {
  //     self.wishlist.replace(values);
  //   },
  //   _clearWishlist() {
  //     self.wishlist.clear();
  //   },
  //   _clearPromotions() {
  //     self.promotions.clear();
  //   },
  //   _writePromotions(values) {
  //     self.promotions.replace(values);
  //   },
  //   _writeVendors(values) {
  //     self.vendors.replace(values);
  //   },
  //   _writeFilteredVendors(values) {
  //     self.filteredVendors.replace(values);
  //   },
  //   _writeSelectedVendor(value) {
  //     if (value) self.selectedVendor = OscarSchemas.VendorObject.create(value);
  //     else self.selectedVendor = null;
  //   },
  //   _writeSelectedVendorCategories(values) {
  //     self.selectedVendorCategories.replace(values);
  //   },
  //   _clearSelectedVendorCategories() {
  //     self.selectedVendorCategories.clear();
  //   },
  //   _writeSelectedVendorProducts(values) {
  //     self.selectedVendorProducts.replace(values);
  //   },
  //   _clearSelectedVendorProducts() {
  //     self.selectedVendorProducts.clear();
  //   },
  //   _writeProductListPaginated(values) {
  //     values.results.forEach((value) => {
  //       value.children.sort((a, b) => {
  //         return a.price.incl_tax < b.price.incl_tax;
  //       });
  //     });
  //     self.paginatedProductList =
  //       OscarSchemas.PaginatedProductsObject.create(values);
  //   },
  //   _writeFilteredProductListPaginated(values) {
  //     self.paginatedFilteredProductList =
  //       OscarSchemas.PaginatedProductsObject.create(values);
  //   },
  //   _clearFilteredProductListPaginated() {
  //     self.paginatedFilteredProductList = null;
  //   },
  //   _writeSelectedProduct(data) {
  //     if (data) {
  //       self.selectedProduct = OscarSchemas.ProductObject.create(data);
  //       let multiSelectOptions = {};
  //       data["attributes"].filter((attr) => {
  //         if (typeof attr.value != "string" && attr.value.length) {
  //           multiSelectOptions[attr.code.toLowerCase()] = attr.value;
  //           return true;
  //         }
  //         return false;
  //       });
  //       //matches OPTION code with ATTRIBUTE CODE, hides it too if values aren't defined
  //       let selectableProductOptions = [];
  //       let selectableProductOptionsSelected = [];
  //       self.selectedProduct.options.filter((o) => {
  //         if (multiSelectOptions[o.code.toLowerCase()]) {
  //           selectableProductOptions.push({
  //             name: o.name,
  //             url: o.url,
  //             code: o.code,
  //             values: multiSelectOptions[o.code],
  //           });
  //           selectableProductOptionsSelected.push({
  //             option: o.url,
  //             value: multiSelectOptions[o.code][0],
  //           });
  //         } else {
  //           return false;
  //         }
  //       });
  //       self.selectedProductOptions.replace(selectableProductOptions);
  //       self.selectedProductOptionSelected.replace(
  //         selectableProductOptionsSelected
  //       );
  //     } else {
  //       self.selectedProduct = data;
  //     }
  //   },
  //   _selectProductOption(url, value) {
  //     self.selectedProductOptionSelected.find((o) =>
  //       o.option == url ? (o.value = value) : false
  //     );
  //   },
  //   _setProductQuantity(quantity) {
  //     self.selectedProductQuantity = quantity;
  //   },
  //   _writeCurrentPage(page) {
  //     self.current_page = page;
  //   },
  //   _writePaginatedCategories(values) {
  //     self.paginatedCategories =
  //       OscarSchemas.PaginatedCategoryObject.create(values);
  //   },
  //   _writeBaskets(values) {
  //     let baskets = [];
  //     values.map((value) => {
  //       baskets = baskets.concat(value);
  //     });

  //     self.baskets.replace(baskets);
  //   },
  //   _clearBaskets() {
  //     self.baskets.clear();
  //   },
  //   _clearBasket(url) {
  //     self.baskets.replace(self.baskets.filter((basket) => basket.url != url));
  //     self.basketLines.replace(
  //       self.basketLines.filter((basketLine) => basketLine.basket != url)
  //     );
  //   },
  //   _writeBasketLines(values) {
  //     self.basketLines.replace(values);
  //   },
  //   _clearBasketLines() {
  //     self.basketLines.clear();
  //   },
  //   _clearBasketLine(url) {
  //     self.basketLines.replace(
  //       self.basketLines.filter((basketLine) => basketLine.url != url)
  //     );
  //   },
  //   _addToBasketLines(values) {
  //     self.basketLines.replace(self.basketLines.concat(values));
  //   },
  //   _setBasketLineQuantity(url, quantity) {
  //     self.basketLines[
  //       self.basketLines.findIndex((basketLine) => basketLine.url == url)
  //     ].quantity = quantity;
  //   },
  //   _writeCountries(values) {
  //     self.countries.replace(values);
  //   },
  //   _writeAddresses(values) {
  //     self.addresses.replace(values);
  //   },
  //   _writeOrders(values) {
  //     self.orders.replace(values);
  //   },
  //   _clearOrders() {
  //     self.orders.clear();
  //   },
  //   _clearOrderLines() {
  //     self.orderLines.clear();
  //   },
  //   _addToOrderLines(values) {
  //     self.orderLines.replace(self.orderLines.concat(values));
  //   },
  //   _writeSelectedOrder(value) {
  //     if (value) self.selectedOrder = OscarSchemas.OrderObject.create(value);
  //     else self.selectedOrder = null;
  //   },
  //   _writeProductReviews(values) {
  //     values.forEach((value) => {
  //       self.ProductReviews.replace(self.ProductReviews.concat(value));
  //     });
  //   },
  //   _clearProductReviews() {
  //     self.ProductReviews.clear();
  //   },
  //   _clearUserReview() {
  //     self.UserReviews = null;
  //   },
  //   _writeUserReview(values) {
  //     self.UserReviews = values;
  //   },
  //   _writeStoreQuestions(values) {
  //     values.forEach((value) => {
  //       self.StoreQuestions.replace(self.StoreQuestions.concat(value));
  //     });
  //   },
  //   _clearStoreQuestions() {
  //     self.StoreQuestions.clear();
  //   },
  // }))
  // .actions((self) => ({
  //   async fetchVendors(filters = {}) {
  //     const response = await self.environment.api.call(
  //       API_ENDPOINTS.getVendors,
  //       {
  //         [PAGINATION_FILTERS.DISABLE_PAGINATION]: true,
  //         ...filters,
  //       }
  //     );
  //     switch (response.status) {
  //       case 200:
  //         if (VENDOR_FILTERS.VENDOR_SUBDOMAIN in filters)
  //           self._writeFilteredVendors(response.data);
  //         else self._writeVendors(response.data);
  //         break;
  //       default:
  //         break;
  //     }
  //   },
  //   async fetchVendorBySubdomain(subdomain) {
  //     self._writeSelectedVendor(null);
  //     globalKeyStore.toggleLoader(true);
  //     const response = await self.environment.api.call(
  //       API_ENDPOINTS.getVendors,
  //       {
  //         [VENDOR_FILTERS.VENDOR_SUBDOMAIN]: subdomain,
  //       }
  //     );
  //     globalKeyStore.toggleLoader(false);
  //     switch (response.status) {
  //       case 200:
  //         if (response.data["count"] == 1)
  //           self._writeSelectedVendor(response.data["results"][0]);
  //         else if (response.data["count"] > 1)
  //           console.error(
  //             "MULTIPLE RESULTS SHOULDN'T BE POSSIBLE FOR THIS API CALL"
  //           );
  //         break;
  //       default:
  //         console.error("UNHANDLED RESPONSE!");
  //         break;
  //     }
  //   },
  //   async fetchCategoriesFromSubdomain(subdomain) {
  //     self._clearSelectedVendorCategories();
  //     let endpoint = new API_ENDPOINT(API_ENDPOINTS.getCategories);
  //     endpoint.url =
  //       UTILS.injectSubdomain(subdomain, self.environment.api.config.url) +
  //       endpoint.url;
  //     endpoint.paginated = false;
  //     const response = await self.environment.api.call(endpoint);
  //     switch (response.status) {
  //       case 200:
  //         self._writeSelectedVendorCategories(response.data["results"]);
  //         break;
  //       default:
  //         console.error("UNHANDLED RESPONSE!");
  //         break;
  //     }
  //   },
  //   async fetchProductsFromSubdomain(subdomain) {
  //     self._clearSelectedVendorProducts();
  //     let endpoint = new API_ENDPOINT(API_ENDPOINTS.getProductList);
  //     endpoint.url =
  //       UTILS.injectSubdomain(subdomain, self.environment.api.config.url) +
  //       endpoint.url;
  //     globalKeyStore.toggleLoader(true);
  //     const response = await self.environment.api.call(endpoint);
  //     globalKeyStore.toggleLoader(false);
  //     switch (response.status) {
  //       case 200:
  //         self._writeSelectedVendorProducts(response.data["results"]);
  //         break;
  //       default:
  //         console.error("UNHANDLED RESPONSE!");
  //         break;
  //     }
  //   },
  //   async fetchProductList(filters = {}, page_number = 1) {
  //     self._clearFilteredProductListPaginated();
  //     var filtersApplied = false;
  //     if (Object.keys(filters).length) {
  //       filtersApplied = true;
  //     }
  //     //essential filters
  //     if (page_number > 1) {
  //       filters[PRODUCT_FILTERS.PAGE_NUMBER] = page_number;
  //     }
  //     let endpoint = new API_ENDPOINT(API_ENDPOINTS.getProductList);
  //     if (PRODUCT_FILTERS.VENDOR in filters) {
  //       endpoint.url =
  //         UTILS.injectSubdomain(
  //           filters[PRODUCT_FILTERS.VENDOR],
  //           self.environment.api.config.url
  //         ) + endpoint.url;
  //       delete filters[PRODUCT_FILTERS.VENDOR];
  //     }
  //     self.environment.globalKeyStore.toggleLoader(true);
  //     //calling api
  //     const response = await self.environment.api.call(endpoint, {
  //       ...filters,
  //     });
  //     self.environment.globalKeyStore.toggleLoader(false);
  //     //handling response
  //     switch (response.status) {
  //       case 200:
  //         console.log("FETCHING PRODUCTS...", filters);
  //         if (!filtersApplied) {
  //           self._writeProductListPaginated(response.data);
  //         }
  //         self._writeFilteredProductListPaginated(response.data);
  //         self._writeCurrentPage(
  //           UTILS.getPageNumber(response.data["next"]) - 1
  //         );
  //         break;
  //       default:
  //         console.error("UNHANDLED RESPONSE!");
  //         break;
  //     }
  //   },
  //   async fetchSelectedProductDetailsById(id) {
  //     self._writeSelectedProduct(null);
  //     //note: this could have been done via a filter as well, but the details api return a, well, more detailed result
  //     var endpoint = new API_ENDPOINT(API_ENDPOINTS.getProductDetails);
  //     endpoint.url += id;
  //     self.environment.globalKeyStore.toggleLoader(true);
  //     const response = await self.environment.api.call(endpoint);
  //     self.environment.globalKeyStore.toggleLoader(false);
  //     switch (response.status) {
  //       case 200:
  //         self._writeSelectedProduct(response.data);
  //         break;
  //       default:
  //         console.error("UNHANDLED RESPONSE!");
  //         break;
  //     }
  //   },
  //   async fetchSelectedProductDetailsByURL(url) {
  //     self._writeSelectedProduct(null);
  //     var endpoint = new API_ENDPOINT(API_ENDPOINTS.getProductDetails);
  //     endpoint.url = url;
  //     self.environment.globalKeyStore.toggleLoader(true);
  //     const response = await self.environment.api.call(endpoint);
  //     self.environment.globalKeyStore.toggleLoader(false);
  //     switch (response.status) {
  //       case 200:
  //         self._writeSelectedProduct(response.data);
  //         break;
  //       default:
  //         console.error("UNHANDLED RESPONSE!");
  //         break;
  //     }
  //   },
  //   async fetchSelectedProductDetailsByDomainAndID(pid, vid) {
  //     var endpoint = new API_ENDPOINT(API_ENDPOINTS.getProductDetails);
  //     self._writeSelectedProduct(null);
  //     let subdomain = vid;
  //     endpoint.url =
  //       UTILS.injectSubdomain(subdomain, self.environment.api.config.url) +
  //       endpoint.url +
  //       pid;
  //     self.environment.globalKeyStore.toggleLoader(true);
  //     const response = await self.environment.api.call(endpoint);
  //     self.environment.globalKeyStore.toggleLoader(false);
  //     switch (response.status) {
  //       case 200:
  //         self._writeSelectedProduct(response.data);
  //         return true;
  //         break;
  //       case 404:
  //         self._writeSelectedProduct(null);
  //         break;
  //       default:
  //         console.error("UNHANDLED RESPONSE!");
  //         break;
  //     }
  //   },
  //   async createUserReview(reviewObject) {
  //     self.environment.globalKeyStore.toggleLoader(true);
  //     const response = await self.environment.api.call(
  //       API_ENDPOINTS.createUserReview,
  //       reviewObject
  //     );
  //     self.environment.globalKeyStore.toggleLoader(false);
  //     switch (response.status) {
  //       case 201:
  //         console.log("the api is successfull!");
  //         return true;
  //         break;
  //       case 400:
  //         let error_msg = "";
  //         for (const key in response.data) {
  //           error_msg += key + ": " + response.data[key] + "\n";
  //         }
  //         error_msg = error_msg.replaceAll("null", "empty");
  //         error_msg = error_msg.replaceAll("_", " ");
  //         globalKeyStore.setGlobalModalContent(
  //           "Please correct the following errors:",
  //           error_msg
  //         );
  //         globalKeyStore.toggleGlobalModal(true);
  //         break;
  //       default:
  //         console.error("UNHANDLED RESPONSE!");
  //         break;
  //     }
  //   },
  //   async fetchProductReviews(vid, pid) {
  //     self._clearProductReviews();
  //     var endpoint = new API_ENDPOINT(API_ENDPOINTS.getProductReview);
  //     endpoint.url = endpoint.url + "?vid=" + vid + "&product_id=" + pid + "&";
  //     self.environment.globalKeyStore.toggleLoader(true);
  //     const response = await self.environment.api.call(endpoint);
  //     self.environment.globalKeyStore.toggleLoader(false);
  //     switch (response.status) {
  //       case 200:
  //         self._writeProductReviews(response.data.results);
  //         // return (response.data.results == [])
  //         break;
  //       default:
  //         break;
  //     }
  //   },
  //   async fetchUserReview(vid, pid) {
  //     self._clearUserReview();
  //     var endpoint = new API_ENDPOINT(API_ENDPOINTS.getUserReview);
  //     endpoint.url = endpoint.url + "?vid=" + vid + "&product_id=" + pid + "&";
  //     self.environment.globalKeyStore.toggleLoader(true);
  //     const response = await self.environment.api.call(endpoint);
  //     self.environment.globalKeyStore.toggleLoader(false);
  //     switch (response.status) {
  //       case 200:
  //         self._writeUserReview(response.data);
  //         return true;
  //         break;
  //       default:
  //         break;
  //     }
  //   },
  //   async deleteUserReview(vid, id) {
  //     var endpoint = new API_ENDPOINT(API_ENDPOINTS.deleteUserReview);
  //     endpoint.url = endpoint.url + id + "/?vid=" + vid;
  //     self.environment.globalKeyStore.toggleLoader(true);
  //     const response = await self.environment.api.call(endpoint);
  //     self.environment.globalKeyStore.toggleLoader(false);
  //     switch (response.status) {
  //       case 204:
  //         self._clearUserReview();
  //         console.log("delete api is working ");
  //         break;
  //       default:
  //         break;
  //     }
  //   },
  //   async fetchCategories() {
  //     const response = await self.environment.api.call(
  //       API_ENDPOINTS.getCategories
  //     );
  //     switch (response.status) {
  //       case 200:
  //         self._writePaginatedCategories(response.data);
  //         break;
  //       default:
  //         console.error("UNHANDLED RESPONSE!");
  //         break;
  //     }
  //   },
  //   async fetchBasketItems() {
  //     self._clearBasketLines();
  //     if (self.baskets.length == 0) {
  //       globalKeyStore.toggleLoader(false);
  //     }
  //     self.baskets.forEach((basket, idx) => {
  //       let endpoint = new API_ENDPOINT(API_ENDPOINTS.getBasketsLines);
  //       endpoint.url =
  //         UTILS.injectSubdomain(
  //           UTILS.getSubdomain(basket.url),
  //           self.environment.api.config.url
  //         ) +
  //         endpoint.url +
  //         basket.id +
  //         "/lines";
  //       self.environment.api
  //         .call(endpoint, {
  //           [PAGINATION_FILTERS.DISABLE_PAGINATION]: true,
  //         })
  //         .then((response) => {
  //           if (idx == self.baskets.length - 1) {
  //             globalKeyStore.toggleLoader(false);
  //           }
  //           switch (response.status) {
  //             case 200:
  //               self._addToBasketLines(response.data);
  //               break;
  //             default:
  //               console.error("UNHANDLED RESPONSE!");
  //               break;
  //           }
  //         });
  //     });
  //   },
  //   async addVoucherToBasketItems(vouchercode) {
  //     if (self.baskets.length == 0) {
  //       globalKeyStore.toggleLoader(false);
  //     }
  //     self.baskets.forEach((basket, idx) => {
  //       let endpoint = new API_ENDPOINT(API_ENDPOINTS.addVoucher);
  //       let voucherApplied = false;
  //       endpoint.url =
  //         UTILS.injectSubdomain(
  //           UTILS.getSubdomain(basket.url),
  //           self.environment.api.config.url
  //         ) + endpoint.url;
  //       self.environment.api
  //         .call(endpoint, {
  //           vouchercode: vouchercode,
  //           // [PAGINATION_FILTERS.DISABLE_PAGINATION]: true,
  //         })
  //         .then((response) => {
  //           if (idx == self.baskets.length - 1) {
  //             globalKeyStore.toggleLoader(false);
  //           }
  //           switch (response.status) {
  //             case 200:
  //               voucherApplied = true;
  //               //display that voucher is applied successfully
  //               //store applied coupon to show in ui
  //               return true;
  //               break;
  //             case 406:
  //               break;
  //             default:
  //               console.error("UNHANDLED RESPONSE!");
  //               break;
  //           }
  //         });
  //     });
  //   },
  //   async fetchBaskets(callback, silent = false) {
  //     self._clearBaskets();
  //     self._clearBasketLines();
  //     //fetch all baskets from all vendors
  //     if (!silent) globalKeyStore.toggleLoader(true);
  //     const response = await self.environment.api.call(
  //       API_ENDPOINTS.getBaskets,
  //       {
  //         [PAGINATION_FILTERS.DISABLE_PAGINATION]: true,
  //       }
  //     );
  //     //globalKeyStore.toggleLoader(false);
  //     switch (response.status) {
  //       case 200:
  //         self._writeBaskets(response.data);
  //         callback();
  //         break;
  //       default:
  //         console.error("UNHANDLED RESPONSE!");
  //         break;
  //     }
  //   },
  //   async addToBasket(url, quantity, options) {
  //     let endpoint = new API_ENDPOINT(API_ENDPOINTS.addToBasket);
  //     //adding the respective vendor's basket
  //     endpoint.url =
  //       UTILS.injectSubdomain(
  //         UTILS.getSubdomain(url),
  //         self.environment.api.config.url
  //       ) + endpoint.url;
  //     globalKeyStore.toggleLoader(true);
  //     const response = await self.environment.api.call(endpoint, {
  //       url: url,
  //       quantity: quantity,
  //       options: options,
  //     });
  //     globalKeyStore.toggleLoader(false);
  //     switch (response.status) {
  //       case 200:
  //         break;
  //       default:
  //         console.error("UNHANDLED RESPONSE!");
  //         break;
  //     }
  //   },
  //   async deleteSingleBasket(url) {
  //     let endpoint = new API_ENDPOINT(API_ENDPOINTS.deleteBasket);
  //     endpoint.url = url;
  //     const response = await self.environment.api.call(endpoint);
  //     switch (response.status) {
  //       case 204:
  //         self._clearBasket(url);
  //         break;
  //       default:
  //         console.error("UNHANDLED RESPONSE!");
  //         break;
  //     }
  //   },
  //   async deleteAllBaskets() {
  //     globalKeyStore.toggleLoader(true);
  //     self.baskets.forEach((basket, idx) => {
  //       let endpoint = new API_ENDPOINT(API_ENDPOINTS.deleteBasket);
  //       endpoint.url = basket.url;
  //       self.environment.api.call(endpoint).then((response) => {
  //         switch (response.status) {
  //           case 204:
  //             if (idx == self.baskets.length - 1) {
  //               globalKeyStore.toggleLoader(false);
  //               self._clearBasketLines();
  //               self._clearBaskets();
  //             }
  //             break;
  //           default:
  //             console.error("UNHANDLED RESPONSE!");
  //             break;
  //         }
  //       });
  //     });
  //   },
  //   async deleteBasketLine(url) {
  //     let endpoint = new API_ENDPOINT(API_ENDPOINTS.deleteBasketLine);
  //     endpoint.url = url;
  //     const response = await self.environment.api.call(endpoint);
  //     switch (response.status) {
  //       case 204:
  //         self._clearBasketLine(url);
  //         break;
  //       default:
  //         console.error("UNHANDLED RESPONSE!");
  //         break;
  //     }
  //   },
  //   async updateQuantity(url, quantity) {
  //     if (quantity <= 0) {
  //       return;
  //     }
  //     let endpoint = new API_ENDPOINT(API_ENDPOINTS.changeBasketLineQuantity);
  //     endpoint.url = url;
  //     //so that ui is updated instantly while the API does its thing, we rollback the value when we handle the rrror
  //     let old_quantity =
  //       self.basketLines[
  //         self.basketLines.findIndex((basketLine) => basketLine.url == url)
  //       ].quantity;
  //     self._setBasketLineQuantity(url, quantity);
  //     const response = await self.environment.api.call(endpoint, {
  //       quantity: quantity,
  //     });
  //     switch (response.status) {
  //       case 200:
  //         break;
  //       default:
  //         self._setBasketLineQuantity(url, old_quantity);
  //         console.error("UNHANDLED RESPONSE!");
  //         break;
  //     }
  //   },
  //   async fetchCountries() {
  //     const response = await self.environment.api.call(
  //       API_ENDPOINTS.getCountries,
  //       {
  //         [PAGINATION_FILTERS.PAGE_SIZE]: 249,
  //       }
  //     );
  //     switch (response.status) {
  //       case 200:
  //         self._writeCountries(response.data["results"]);
  //         break;
  //       default:
  //         console.error("UNHANDLED RESPONSE!");
  //         break;
  //     }
  //   },
  //   async fetchAddresses() {
  //     const response = await self.environment.api.call(
  //       API_ENDPOINTS.getAddresses
  //     );
  //     switch (response.status) {
  //       case 200:
  //         self._writeAddresses(response.data["results"]);
  //         break;
  //       default:
  //         console.error("UNHANDLED RESPONSE!");
  //         break;
  //     }
  //   },
  //   async createAddress(address, callback) {
  //     const response = await self.environment.api.call(
  //       API_ENDPOINTS.createAddress,
  //       address
  //     );
  //     switch (response.status) {
  //       case 201:
  //         self._writeAddresses(self.addresses.concat(response.data));
  //         callback();
  //         break;
  //       case 400:
  //         let error_msg = "";
  //         for (const key in response.data) {
  //           error_msg += key + ": " + response.data[key] + "\n";
  //         }
  //         error_msg = error_msg.replaceAll("null", "empty");
  //         error_msg = error_msg.replaceAll("_", " ");
  //         globalKeyStore.setGlobalModalContent(
  //           "Please correct the following errors:",
  //           error_msg
  //         );
  //         globalKeyStore.toggleGlobalModal(true);
  //         break;
  //       default:
  //         console.error("UNHANDLED RESPONSE!");
  //         break;
  //     }
  //   },
  //   async editAddress(id, address, callback) {
  //     let endpoint = new API_ENDPOINT(API_ENDPOINTS.editAddress);
  //     endpoint.url += id + TRAILING_SLASH;
  //     const response = await self.environment.api.call(endpoint, address);
  //     switch (response.status) {
  //       case 200:
  //         self._writeAddresses(
  //           self.addresses
  //             .filter((address) => address.id != id)
  //             .concat(response.data)
  //         );
  //         callback();
  //         break;
  //       case 400:
  //         let error_msg = "";
  //         for (const key in response.data) {
  //           error_msg += key + ": " + response.data[key] + "\n";
  //         }
  //         error_msg = error_msg.replaceAll("null", "empty");
  //         error_msg = error_msg.replaceAll("_", " ");
  //         globalKeyStore.setGlobalModalContent(
  //           "Please correct the following errors:",
  //           error_msg
  //         );
  //         globalKeyStore.toggleGlobalModal(true);
  //         break;
  //       default:
  //         console.error("UNHANDLED RESPONSE!");
  //         break;
  //     }
  //   },
  //   async checkoutBaskets(callback) {
  //     globalKeyStore.toggleLoader(true);
  //     self.baskets.forEach((basket, idx) => {
  //       let endpoint = new API_ENDPOINT(API_ENDPOINTS.checkoutBasket);
  //       endpoint.url =
  //         UTILS.injectSubdomain(
  //           UTILS.getSubdomain(basket.url),
  //           self.environment.api.config.url
  //         ) + endpoint.url;
  //       //ONLY FOR TESTING REMOVE LINES BETWEEN ----- BEFORE COMMIT
  //       // callback();
  //       // return;
  //       //--------------------------
  //       self.environment.api
  //         .call(endpoint, {
  //           basket: basket.url,
  //           shipping_address: self.selectedAddressForDelivery,
  //           billing_address: self.billingAddressSameAsShippingAddress
  //             ? self.selectedAddressForDelivery
  //             : self.selectedAddressForBilling,
  //         })
  //         .then((response) => {
  //           switch (response.status) {
  //             case 200:
  //               if (idx == self.baskets.length - 1) {
  //                 globalKeyStore.toggleLoader(false);
  //                 self._clearBasketLines();
  //                 self._clearBaskets();
  //                 callback();
  //               }
  //               break;
  //             default:
  //               console.error("UNHANDLED RESPONSE!");
  //               break;
  //           }
  //         });
  //     });
  //   },
  //   async fetchOrders(callback = null, silent = false) {
  //     self._clearOrders();
  //     self._clearOrderLines();
  //     if (!silent) globalKeyStore.toggleLoader(true);
  //     const response = await self.environment.api.call(API_ENDPOINTS.getOrders);
  //     // response.data.results.map((item) => {
  //     //   console.log('this is all orfers four djfl;ajd ', `${item.status}`, item.status)
  //     // })
  //     switch (response.status) {
  //       case 200:
  //         self._writeOrders(response.data["results"]);
  //         if (callback) callback();
  //         else globalKeyStore.toggleLoader(false);
  //         break;
  //       default:
  //         console.error("UNHANDLED RESPONSE!");
  //         break;
  //     }
  //   },
  //   async fetchOnGoingOrders(callback = null, silent = false) {
  //     self._clearOrders();
  //     self._clearOrderLines();
  //     if (!silent) globalKeyStore.toggleLoader(true);
  //     const response = await self.environment.api.call(API_ENDPOINTS.getOrders);
  //     switch (response.status) {
  //       case 200:
  //         self._writeOrders(response.data["results"]);
  //         if (callback) callback();
  //         else globalKeyStore.toggleLoader(false);
  //         break;
  //       default:
  //         console.error("UNHANDLED RESPONSE!");
  //         break;
  //     }
  //   },
  //   async fetchPreviosOrders(callback = null, silent = false) {
  //     self._clearOrders();
  //     self._clearOrderLines();
  //     if (!silent) globalKeyStore.toggleLoader(true);
  //     const response = await self.environment.api.call(API_ENDPOINTS.getOrders);
  //     switch (response.status) {
  //       case 200:
  //         self._writeOrders(response.data["results"]);
  //         if (callback) callback();
  //         else globalKeyStore.toggleLoader(false);
  //         break;
  //       default:
  //         console.error("UNHANDLED RESPONSE!");
  //         break;
  //     }
  //   },
  //   async fetchOrderItems() {
  //     self._clearOrderLines();
  //     self.orders.forEach((order, idx) => {
  //       let endpoint = new API_ENDPOINT(API_ENDPOINTS.getOrdersLines);
  //       endpoint.url =
  //         UTILS.injectSubdomain(
  //           UTILS.getSubdomain(order.url),
  //           self.environment.api.config.url
  //         ) +
  //         endpoint.url +
  //         order.id +
  //         "/lines";
  //       self.environment.api
  //         .call(endpoint, {
  //           [PAGINATION_FILTERS.DISABLE_PAGINATION]: true,
  //         })
  //         .then((response) => {
  //           if (idx == self.orders.length - 1) {
  //             globalKeyStore.toggleLoader(false);
  //           }
  //           switch (response.status) {
  //             case 200:
  //               self._addToOrderLines(response.data);
  //               break;
  //             default:
  //               console.error("UNHANDLED RESPONSE!");
  //               break;
  //           }
  //         });
  //     });
  //   },
  //   async fetchSelectedOrderDetailsByDomainAndID(oid, vid) {
  //     var endpoint = new API_ENDPOINT(API_ENDPOINTS.getOrderDetails);
  //     self._writeSelectedOrder(null);
  //     let subdomain = vid;
  //     endpoint.url =
  //       UTILS.injectSubdomain(subdomain, self.environment.api.config.url) +
  //       endpoint.url +
  //       oid;
  //     self.environment.globalKeyStore.toggleLoader(true);
  //     const response = await self.environment.api.call(endpoint);
  //     self.environment.globalKeyStore.toggleLoader(false);
  //     switch (response.status) {
  //       case 200:
  //         self._writeSelectedOrder(response.data);
  //         break;
  //       case 404:
  //         self._writeSelectedOrder(null);
  //         break;
  //       default:
  //         console.error("UNHANDLED RESPONSE!");
  //         break;
  //     }
  //   },
  //   async fetchWishlist() {
  //     const response = await self.environment.api.call(
  //       API_ENDPOINTS.getWishlist
  //     );
  //     switch (response.status) {
  //       case 200:
  //         self._writeWishlist(response.data["results"]);
  //         break;
  //       default:
  //         console.error("UNHANDLED RESPONSE!");
  //         break;
  //     }
  //   },
  //   async fetchWishlistProductUrls() {
  //     const response = await self.environment.api.call(
  //       API_ENDPOINTS.getWishlistProductUrls
  //     );
  //     switch (response.status) {
  //       case 200:
  //         self._writeWishlistProductUrls(response.data);
  //         break;
  //       default:
  //         console.error("UNHANDLED RESPONSE!");
  //         break;
  //     }
  //   },
  //   async addToWishlist(product_url) {
  //     const response = await self.environment.api.call(
  //       API_ENDPOINTS.addToWishlist,
  //       {
  //         product_url: product_url,
  //       }
  //     );
  //     switch (response.status) {
  //       case 201:
  //         if (!self.wishlistProductUrls.includes(product_url)) {
  //           self._writeWishlistProductUrls(
  //             self.wishlistProductUrls.concat(product_url)
  //           );
  //         }
  //         return true;
  //         break;
  //       case 400:
  //         console.error(response.data["message"]);
  //       default:
  //         console.error("UNHANDLED RESPONSE!");
  //         break;
  //     }
  //     return false;
  //   },
  //   async removeFromWishlist(product_url) {
  //     let endpoint = new API_ENDPOINT(API_ENDPOINTS.removeFromWishlist);
  //     endpoint.url += product_url;
  //     const response = await self.environment.api.call(endpoint);
  //     switch (response.status) {
  //       case 204:
  //         self._removeWishlistProductUrl(product_url);
  //         return true;
  //         break;
  //       case 400:
  //       case 404:
  //         console.error(response.data["message"]);
  //       default:
  //         console.error("UNHANDLED RESPONSE!");
  //         break;
  //     }
  //     return false;
  //   },
  //   async isProductInWishlist(product_url) {
  //     let endpoint = new API_ENDPOINT(API_ENDPOINTS.isInWishlist);
  //     endpoint.url += product_url;
  //     const response = await self.environment.api.call(endpoint);
  //     switch (response.status) {
  //       case 200:
  //         if (response.data["message"]) {
  //           if (!self.wishlistProductUrls.includes(product_url)) {
  //             self._writeWishlistProductUrls(
  //               self.wishlistProductUrls.concat(product_url)
  //             );
  //           }
  //         }
  //         break;
  //       case 400:
  //       default:
  //         console.error("UNHANDLED RESPONSE!");
  //         break;
  //     }
  //     return false;
  //   },
  //   async fetch3DModel(url) {
  //     let response = await fetch(url);
  //     switch (response.status) {
  //       case 200:
  //         return response.blob();
  //       default:
  //         return null;
  //     }
  //   },
  //   async fetchStoreQuestions() {
  //     self._clearStoreQuestions();
  //     self.environment.globalKeyStore.toggleLoader(true);
  //     const response = await self.environment.api.call(
  //       API_ENDPOINTS.fetchStoreQuestions
  //     );
  //     self.environment.globalKeyStore.toggleLoader(false);
  //     switch (response.status) {
  //       case 200:
  //         self._writeStoreQuestions(response.data.results);
  //         return true;
  //         break;
  //       default:
  //         console.error("UNHANDLED RESPONSE!");
  //         break;
  //     }
  //     return false;
  //   },
  //   async addStoreQuestion(data) {
  //     self.environment.globalKeyStore.toggleLoader(true);
  //     const response = await self.environment.api.call(
  //       API_ENDPOINTS.addStoreQuestion,
  //       // UTILS.packFormData(data)
  //       data
  //     );
  //     self.environment.globalKeyStore.toggleLoader(false);
  //     switch (response.status) {
  //       case 201:
  //         return true;
  //         break;
  //       default:
  //         console.error("UNHANDLED RESPONSE!");
  //         break;
  //     }
  //     return false;
  //   },
  //   async deleteStoreQuestion(id) {
  //     var endpoint = new API_ENDPOINT(API_ENDPOINTS.deleteStoreQuestion);
  //     endpoint.url = endpoint.url + id;
  //     self.environment.globalKeyStore.toggleLoader(true);
  //     const response = await self.environment.api.call(endpoint);
  //     self.environment.globalKeyStore.toggleLoader(false);
  //     switch (response.status) {
  //       case 204:
  //         return true;
  //         break;
  //       case 404:
  //         return false;
  //         break;
  //       default:
  //         console.error("UNHANDLED RESPONSE!");
  //         break;
  //     }
  //     return false;
  //   },
  //   async editStoreQuestion(
  //     id,
  //     data: {
  //       question: string;
  //       answer: string;
  //       next_question: any;
  //     }
  //   ) {
  //     console.log("dsfadf", data);
  //     var endpoint = new API_ENDPOINT(API_ENDPOINTS.editStoreQuestion);
  //     endpoint.url = endpoint.url + id + TRAILING_SLASH;
  //     self.environment.globalKeyStore.toggleLoader(true);
  //     const response = await self.environment.api.call(
  //       endpoint,
  //       data
  //       // UTILS.packFormData(data)
  //     );
  //     self.environment.globalKeyStore.toggleLoader(false);
  //     switch (response.status) {
  //       case 200:
  //         return true;
  //         break;
  //       default:
  //         console.error("UNHANDLED RESPONSE!");
  //         break;
  //     }
  //     return false;
  //   },
  //   async fetchPromotions() {
  //     const response = await self.environment.api.call(
  //       API_ENDPOINTS.getPromotionsWeb
  //     );
  //     switch (response.status) {
  //       case 200:
  //         self._writePromotions(response.data.results);
  //         break;
  //       default:
  //         console.error("UNHANDLED RESPONSE!");
  //         break;
  //     }
  //   },
  //   async fetchMyStore() {
  //     const response = await self.environment.api.call(
  //       API_ENDPOINTS.getMyStore
  //     );
  //     switch (response.status) {
  //       case 200:
  //         self._writeSelectedVendor(response.data);
  //         return true;
  //         break;
  //       default:
  //         self._writeSelectedVendor(null);
  //         console.error("UNHANDLED RESPONSE!");
  //         break;
  //     }
  //     return false;
  //   },
  //   async customizeStore(data: {
  //     store_name: string;
  //     store_description: string;
  //     store_address_line1: string;
  //     store_address_line2: string;
  //     store_address_city: string;
  //     store_address_country: string;
  //     store_logo: any;
  //     store_banner: any;
  //   }) {
  //     const response = await self.environment.api.call(
  //       API_ENDPOINTS.customizeStore,
  //       UTILS.packFormData(data)
  //     );
  //     switch (response.status) {
  //       case 200:
  //         self._writeSelectedVendor(response.data);
  //         return true;
  //       default:
  //         console.error("UNHANDLED RESPONSE!");
  //         break;
  //     }
  //     return false;
  //   },
  //   async addPromotion(data: {
  //     image: any;
  //     promotion_type: string;
  //     title: string;
  //     description: string;
  //     link: string;
  //   }) {
  //     const response = await self.environment.api.call(
  //       API_ENDPOINTS.addPromotion,
  //       UTILS.packFormData(data)
  //     );
  //     switch (response.status) {
  //       case 201:
  //         return true;
  //         break;
  //       default:
  //         console.error("UNHANDLED RESPONSE!");
  //         break;
  //     }
  //     return false;
  //   },
  //   async editPromotion(
  //     pk: BigInteger,
  //     data: {
  //       image: any;
  //       promotion_type: string;
  //       title: string;
  //       description: string;
  //       link: string;
  //     }
  //   ) {
  //     let endpoint = new API_ENDPOINT(API_ENDPOINTS.editPromotion);
  //     endpoint.url += pk;
  //     const response = await self.environment.api.call(
  //       endpoint,
  //       UTILS.packFormData(data)
  //     );
  //     switch (response.status) {
  //       case 200:
  //         self._writeSelectedVendorVendorPromotion(pk, response.data);
  //         return true;
  //         break;
  //       default:
  //         console.error("UNHANDLED RESPONSE!");
  //         break;
  //     }
  //     return false;
  //   },
  //   async deletePromotion(pk: BigInteger) {
  //     let endpoint = new API_ENDPOINT(API_ENDPOINTS.deletePromotion);
  //     endpoint.url += pk;
  //     const response = await self.environment.api.call(endpoint);
  //     switch (response.status) {
  //       case 204:
  //         self._deleteSelectedVendorVendorPromotion(pk);
  //         return true;
  //         break;
  //       default:
  //         console.error("UNHANDLED RESPONSE!");
  //         break;
  //     }
  //     return false;
  //   },
  //   uploadInputImageProduct3D: flow(function* (data: {
  //     image: any;
  //     product_url: string;
  //   }) {
  //     const response = yield self.environment.api.call(
  //       API_ENDPOINTS.uploadProduct3dInputImage,
  //       UTILS.packFormData(data)
  //     );
  //     switch (response.status) {
  //       case 201:
  //         return true;
  //       default:
  //         console.error("UNHANDLED RESPONSE!");
  //         break;
  //     }
  //     return false;
  //   }),
  //   uploadProductImage3DModelCreation: flow(function* (data) {
  //     console.log('this is data ', data)
  //     const response = yield self.environment.api.call(
  //       API_ENDPOINTS.uploadProduct3dInputImage,
  //       data
  //     );
  //     switch (response.status) {
  //       case 201:
  //         return true;
  //       default:
  //         console.error("UNHANDLED RESPONSE!");
  //         break;
  //     }
  //     return false;
  //   }),
  //   fetchProduct3dImagesForProductId: flow(function* (pid) {
  //     self.selectedProduct3DImageInputs.clear();
  //     const response = yield self.environment.api.call(
  //       API_ENDPOINTS.fetchProduct3dImages,
  //       {
  //         [PRODUCT3D_FILTERS.PRODUCT_ID]: pid,
  //       }
  //     );
  //     switch (response.status) {
  //       case 200:
  //         self.selectedProduct3DImageInputs.replace(response.data);
  //         return true;
  //       default:
  //         console.error("UNHANDLED RESPONSE!");
  //         break;
  //     }
  //     return false;
  //   }),
  //   fetchProduct3dImageProductWise: flow(function* () {
  //     const response = yield self.environment.api.call(
  //       API_ENDPOINTS.fetchProduct3dImages,
  //       {
  //         [PRODUCT3D_FILTERS.PRODUCT_WISE]: 1,
  //       }
  //     );
  //     switch (response.status) {
  //       case 200:
  //         self.product3DList.replace(response.data);
  //         return true;
  //       default:
  //         console.error("UNHANDLED RESPONSE!");
  //         break;
  //     }
  //     return false;
  //   }),
  //   deleteProduct3dImage: flow(function* (
  //     id: number,
  //     callback: Function,
  //     callback_param: number
  //   ) {
  //     let endpoint = new API_ENDPOINT(API_ENDPOINTS.deleteProduct3dImage);
  //     endpoint.url += id + TRAILING_SLASH;
  //     const response = yield self.environment.api.call(endpoint);
  //     switch (response.status) {
  //       case 204:
  //         self.selectedProduct3DImageInputs.splice(
  //           self.selectedProduct3DImageInputs.findIndex((obj) => obj.id == id),
  //           1
  //         );
  //         if (callback) callback(callback_param);
  //         return true;
  //       default:
  //         console.error("UNHANDLED RESPONSE!");
  //         break;
  //     }
  //     return false;
  //   }),
  // }))
  // .actions((self) => ({
  //   async toggleWishlist(product_url) {
  //     if (self.wishlistProductUrls.includes(product_url)) {
  //       let success = await self.removeFromWishlist(product_url);
  //       return success;
  //     } else {
  //       let success = await self.addToWishlist(product_url);
  //       return success;
  //     }
  //   },
  //   selectProductOption(url, value) {
  //     self._selectProductOption(url, value);
  //   },
  //   setProductQuantity(quantity) {
  //     self._setProductQuantity(quantity);
  //   },
  //   setSelectedAddressForDelivery(address) {
  //     if (address) self.selectedAddressForDelivery = address.toJSON();
  //     else self.selectedAddressForDelivery = address;
  //   },
  //   setSelectedAddressForBilling(address) {
  //     if (address) self.selectedAddressForBilling = address.toJSON();
  //     else self.selectedAddressForBilling = address;
  //   },
  //   setSelectedAddressForEditing(address) {
  //     if (address) self.selectedAddressForEditing = address.toJSON();
  //     else self.selectedAddressForEditing = address;
  //   },
  //   setBillingAddressSameAsShippingAddress(value) {
  //     self.billingAddressSameAsShippingAddress = value;
  //   },
  //   async fetchCart(silent = false, callback) {
  //     await self.fetchBaskets(self.fetchBasketItems, silent);
  //     if (callback) callback();
  //   },
  //   async fetchMyOrders(silent = false, callback) {
  //     console.warn("DEPRECATED");
  //     await self.fetchOrders(self.fetchOrderItems, silent);
  //     if (callback) callback();
  //   },
  //   async addSelectedProductToCart() {
  //     await self.addToBasket(
  //       self.selectedProduct.url,
  //       self.selectedProductQuantity,
  //       self.selectedProductOptionSelected
  //     );
  //     return;
  //   },
  //   //derivative actions, which use remote actions
  //   fetchNextProductListPage(filters = {}) {
  //     if (
  //       UTILS.getPageNumber(self.paginatedProductList.next) == self.current_page
  //     ) {
  //       return;
  //     }
  //     filters[PRODUCT_FILTERS.PAGE_NUMBER] = UTILS.getPageNumber(
  //       self.paginatedProductList.next
  //     );
  //     self.fetchProductList(filters);
  //   },
  //   fetchPreviousProductListPage(filters = {}) {
  //     if (
  //       UTILS.getPageNumber(self.paginatedProductList.previous) ==
  //       self.current_page
  //     ) {
  //       return;
  //     }
  //     filters[PRODUCT_FILTERS.PAGE_NUMBER] = UTILS.getPageNumber(
  //       self.paginatedProductList.previous
  //     );
  //     self.fetchProductList(filters);
  //   },
  // }
  // )
  // );
