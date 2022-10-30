import { types, Instance } from "mobx-state-tree";
import {
  API_ENDPOINT,
  REQUEST_METHOD,
  PAGINATION_FILTERS,
  UTILS,
  PaginatedSchemaBase,
  TRAILING_SLASH,
} from "../../api/endpoint.types";
/**
 * Product Attribute: Custom key-values assigned by vendor
 */
export const ProductAttributeSchema = {
  name: types.string,
  value: types.union(types.string, types.array(types.string)),
  code: types.string,
};
export const ProductAttributeObject = types
  .model("UserObject")
  .props(ProductAttributeSchema);
/**
 * Product Images: Images of a product with the order they are to be displayed in
 */
export const ProductImageSchema = {
  id: types.identifierNumber,
  original: types.string,
  caption: types.string,
  display_order: types.number,
  date_created: types.Date,
};
export const ProductImageObject = types
  .model("ProductImage")
  .props(ProductImageSchema);
/**
 * This is what goes in the basket
 */
export const ProductOptionSelectSchema = {
  option: types.string, //url
  value: types.string,
};
export const ProductOptionSelectObject = types
  .model("ProductOptionSelect")
  .props(ProductOptionSelectSchema);
/**
 * Custom data type to allow product options essentially
 */
export const SelectableProductOptionSchema = {
  url: types.string,
  name: types.string,
  code: types.string,
  values: types.array(types.string),
};
export const SelectableProductOptionObject = types
  .model("SelectableProductOption")
  .props(SelectableProductOptionSchema);
export const ProductOptionSchema = {
  url: types.string,
  code: types.string,
  name: types.string,
  type: types.string,
  required: types.boolean,
};
/**
 * Product Option for a specific Product Type
 */
export const ProductOptionObject = types
  .model("ProductOption")
  .props(ProductOptionSchema);

export const PriceSchema = {
  currency: types.maybeNull(types.string),
  excl_tax: types.maybeNull(types.string),
  incl_tax: types.maybeNull(types.string),
  tax: types.string,
};
export const PriceObject = types.model("PriceObject").props(PriceSchema);
export const ProductVariantSchema = {
  url: types.string,
  upc: types.string,
  id: types.identifierNumber,
  title: types.string,
  description: types.string,
  structure: types.string,
  images: types.array(ProductImageObject),
  price: types.maybeNull(PriceObject),
};
export const ProductVariantObject = types
  .model("ProductVariant")
  .props(ProductVariantSchema);
/**
 * Base Product which shows in GET List
 */
export const ProductBaseSchema = {
  url: types.string,
  id: types.identifierNumber,
  upc: types.string,
  title: types.string,
  description: types.string,
  images: types.array(ProductImageObject),
  product_class: types.maybeNull(types.string),
  price: types.maybeNull(PriceObject),
  categories: types.array(types.string),
  distributed_ratings: types.array(types.number),
  rating: types.maybeNull(types.number),
  structure: types.maybeNull(types.string),
  vendor_user: types.maybeNull(types.integer),
  vendor_name: types.maybeNull(types.string),
  children: types.array(ProductVariantObject),
  options: types.array(ProductOptionObject),
  model_3d: types.maybeNull(types.string),
};
export const ProductBaseObject = types
  .model("ProductBase")
  .props(ProductBaseSchema);
export const PaginatedProductSchema = {
  ...PaginatedSchemaBase,
  results: types.array(ProductBaseObject),
};
export const PaginatedProductsObject = types
  .model("PaginatedProduct")
  .props(PaginatedProductSchema);
export const StockRecordSchema = {
  id: types.identifierNumber,
  url: types.string,
  partner_sku: types.maybeNull(types.string),
  price_currency: types.maybeNull(types.string),
  price: types.maybeNull(types.number),
  num_in_stock: types.maybeNull(types.number),
  num_allocated: types.maybeNull(types.number),
  low_stock_threshold: types.maybeNull(types.number),
  date_created: types.Date,
  date_updated: types.Date,
  product: types.integer,
  partner: types.maybeNull(types.integer),
};
export const StockRecordSchemaObject = types
  .model("StockRecord")
  .props(StockRecordSchema);
/**
 * Specifically to show in Basket's response
 */
export const BasketProductSchema = {
  ...ProductBaseSchema,
};
export const BasketProductObject = types
  .model("BasketProduct")
  .props(BasketProductSchema);
export const VendorPromotionTypes = ["SCREEN", "BILLBOARD", "WEB"];
export const VendorPromotionSchema = {
  id: types.identifierNumber,
  image: types.string,
  promotion_type: types.enumeration(VendorPromotionTypes),
  title: types.string,
  description: types.maybeNull(types.string),
  link: types.maybeNull(types.string),
  is_active: types.maybeNull(types.boolean),
};
export const VendorPromotionObject = types
  .model("VendorPromotionObject")
  .props(VendorPromotionSchema);

export const VendorStoreTypes = ["SMALL", "MEDIUM", "LARGE", "XLARGE"];
export const VendorSchema = {
  id: types.identifierNumber,
  schema_name: types.maybeNull(types.string),
  slug: types.maybeNull(types.string),
  created: types.maybeNull(types.union(types.string, types.Date)),
  modified: types.maybeNull(types.union(types.string, types.Date)),
  store_name: types.maybeNull(types.string),
  store_description: types.maybeNull(types.string),
  store_address_line1: types.maybeNull(types.string),
  store_address_line2: types.maybeNull(types.string),
  store_address_city: types.maybeNull(types.string),
  store_address_country: types.maybeNull(types.string),
  store_logo: types.maybeNull(types.string),
  store_banner: types.maybeNull(types.string),
  name: types.maybeNull(types.string),
  owner: types.maybeNull(types.integer),
  store_type: types.enumeration(VendorStoreTypes),
  vendorpromotion_set: types.maybeNull(types.array(VendorPromotionObject)),
};
export const VendorObject = types.model("VendorObject").props(VendorSchema);
/**
 * Product detail,equivalent to product children (variants)
 */
export const ProductDetailSchema = {
  ...ProductBaseSchema,
  structure: types.string,
  date_created: types.Date,
  date_updated: types.Date,
  recommended_products: types.array(types.string), //array of urls
  attributes: types.array(ProductAttributeObject),
  availability: types.string,
  stockrecords: types.array(
    types.union(StockRecordSchemaObject, types.integer)
  ),
  options: types.array(ProductOptionObject),
  vendor: types.maybeNull(VendorObject),
};
export const ProductDetailObject = types
  .model("ProductChildObject")
  .props(ProductDetailSchema);
/**
 * Product detail root object, shows children as well
 */
export const ProductSchema = {
  ...ProductDetailSchema,
  children: types.array(ProductDetailObject),
};
export const ProductObject = types.model("ProductObject").props(ProductSchema);
export const CategorySchema = {
  url: types.string,
  breadcrumbs: types.string,
  children: types.string,
  name: types.string,
  description: types.string,
  meta_title: types.maybeNull(types.string),
  meta_description: types.string,
  image: types.maybeNull(types.string),
  slug: types.string,
  is_public: types.boolean,
  ancestors_are_public: types.boolean,
};
export const CategoryObject = types
  .model("CategoryObject")
  .props(CategorySchema);
export const PaginatedCategorySchema = {
  ...PaginatedSchemaBase,
  results: types.array(CategoryObject),
};
export const PaginatedCategoryObject = types
  .model("PaginatedCategoryObject")
  .props(PaginatedCategorySchema);
export const VoucherSchema = {
  name: types.string,
  code: types.string,
  start_datetime: types.Date,
  end_datetime: types.Date,
};
export const VoucherObject = types.model("VoucherObject").props(VoucherSchema);
export const VoucherDiscountSchema = {
  description: types.string,
  name: types.string,
  amount: types.string,
  voucher: VoucherObject,
};
export const VoucherDiscountObject = types
  .model("VoucherDiscountObject")
  .props(VoucherDiscountSchema);
export const OfferSchema = {
  description: types.string,
  name: types.string,
  amount: types.string,
};
export const OfferObject = types.model("OfferObject").props(OfferSchema);

export const BasketSchema = {
  id: types.identifierNumber,
  owner: types.string, //url
  status: types.string,
  lines: types.string, //url
  url: types.string,
  total_excl_tax: types.number,
  total_excl_tax_excl_discounts: types.number,
  total_incl_tax: types.number,
  total_incl_tax_excl_discounts: types.number,
  total_tax: types.number,
  currency: types.maybeNull(types.string),
  voucher_discounts: types.array(VoucherDiscountObject),
  offer_discounts: types.array(OfferObject),
  is_tax_known: types.boolean,
  vendor: types.maybeNull(VendorObject),
};
export const BasketObject = types.model("BasketObject").props(BasketSchema);

export const BasketLineAttributeSchema = {
  url: types.string,
  value: types.string,
  option: types.string,
};
export const BasketLineAttributeObject = types
  .model("BasketLineAttributes")
  .props(BasketLineAttributeSchema);
export const BasketLineSchema = {
  url: types.string,
  product: BasketProductObject,
  quantity: types.number,
  attributes: types.array(BasketLineAttributeObject),
  price_currency: types.string,
  price_excl_tax: types.number,
  price_incl_tax: types.number,
  price_incl_tax_excl_discounts: types.number,
  price_excl_tax_excl_discounts: types.number,
  is_tax_known: types.boolean,
  warning: types.maybeNull(types.string),
  basket: types.string,
  stockrecord: types.string,
  date_created: types.Date,
  date_updated: types.Date,
  extra_attributes: types.maybeNull(types.string),
};
export const BasketLineObject = types
  .model("BasketLineObject")
  .props(BasketLineSchema);
export const CountrySchema = {
  url: types.string,
  iso_3166_1_a3: types.string,
  iso_3166_1_numeric: types.integer,
  printable_name: types.string,
  name: types.string,
  display_order: types.integer,
  is_shipping_country: types.boolean,
};
export const CountryObject = types.model("Country").props(CountrySchema);
export const UserAddressSchema = {
  country: types.string, //url from country select
  first_name: types.string,
  last_name: types.string,
  line1: types.string,
  line2: types.maybeNull(types.string),
  line3: types.maybeNull(types.string),
  line4: types.maybeNull(types.string),
  notes: types.maybeNull(types.string),
  phone_number: types.maybeNull(types.string),
  postcode: types.string,
  state: types.maybeNull(types.string),
  title: types.maybeNull(types.string),
  id: types.maybeNull(types.identifierNumber),
  search_text: types.maybeNull(types.string),
};
export const UserAddressObject = types
  .model("UserAddress")
  .props(UserAddressSchema);
export const BillingAddressSchema = {
  ...UserAddressSchema,
  search_text: types.string,
};
export const BillingAddressObject = types
  .model("BillingAddress")
  .props(BillingAddressSchema);
export const ShippingAddressSchema = {
  ...BillingAddressSchema,
  notes: types.maybeNull(types.string),
};
export const ShippingAddressObject = types
  .model("ShippingAddress")
  .props(ShippingAddressSchema);
export const OrderProductOptionSchema = {
  ...ProductOptionSelectSchema,
  option: types.string, //TODO currently url, change it to full object later
};
export const OrderProductOptionObject = types
  .model("OrderProductOptionObject")
  .props(OrderProductOptionSchema);

export const ReviewUserSchema = {
  id: types.identifierNumber,
  profile_picture: types.maybeNull(types.string),
  first_name: types.maybeNull(types.string),
  last_name: types.maybeNull(types.string),
};
export const ReviewUserObject = types
  .model("ReviewUserObject")
  .props(ReviewUserSchema);

export const ProductReviewImageSchema = {
  id: types.identifierNumber,
  image: types.string,
  product_review: types.number,
};
export const ProductReviewImageObjects = types
  .model("ProductReviewImageObjects")
  .props(ProductReviewImageSchema);

export const ProductReviewSchema = {
  score: types.maybeNull(types.number),
  title: types.maybeNull(types.string),
  user: types.maybeNull(ReviewUserObject),
  date_created: types.Date,
  body: types.maybeNull(types.string),
  productreviewimage_set: types.array(ProductReviewImageObjects),
};
export const ProductReviewObject = types
  .model("ProductReviewObject")
  .props(ProductReviewSchema);

export const UserReviewSchema = {
  // ...ProductReviewSchema,
  id: types.identifierNumber,
};
export const UserReviewObject = types
  .model("UserReviewObject")
  .props(UserReviewSchema);

export const OrderLineSchema = {
  attributes: types.array(OrderProductOptionObject),
  url: types.string,
  product: types.maybeNull(ProductBaseObject),
  stockrecord: types.string,
  quantity: types.integer,
  price_currency: types.string,
  price_excl_tax: types.number,
  price_incl_tax: types.number,
  price_incl_tax_excl_discounts: types.number,
  price_excl_tax_excl_discounts: types.number,
  order: types.string,
};
export const OrderLineObject = types
  .model("OrderLineObject")
  .props(OrderLineSchema);

export const OrderSchema = {
  number: types.number,
  basket: types.string, //url
  url: types.string, //url
  lines: types.array(OrderLineObject),
  owner: types.string, //url
  billing_address: types.maybeNull(BillingAddressObject),
  currency: types.string,
  total_incl_tax: types.number,
  total_excl_tax: types.number,
  shipping_incl_tax: types.number,
  shipping_excl_tax: types.number,
  shipping_address: ShippingAddressObject,
  shipping_method: types.string,
  shipping_code: types.string,
  status: types.string,
  email: types.string,
  date_placed: types.Date,
  payment_url: types.string,
  offer_discounts: types.array(OfferObject),
  voucher_discounts: types.array(VoucherDiscountObject),
  surcharges: types.maybeNull(types.array(types.string)),
  id: types.identifierNumber,
  vendor: types.maybeNull(VendorObject),
};

export const OrderObject = types.model("OrderObject").props(OrderSchema);
export const WishlistSchema = {
  id: types.identifierNumber,
  product_url: types.string,
  user: types.integer,
  product: types.maybeNull(ProductObject),
};
export const WishlistObject = types
  .model("WishlistObject")
  .props(WishlistSchema);

export const NextQuestionsSchema = {
  id: types.identifierNumber,
  question: types.string,
  answer: types.string,
  starting_question: types.boolean,
  next_question: types.array(types.number),
};
export const NextQuestionsObject = types
  .model("NextQuestionsObject")
  .props(NextQuestionsSchema);

export const StoreQuestionSchema = {
  id: types.identifierNumber,
  question: types.string,
  answer: types.string,
  starting_question: types.boolean,
  next_question: types.array(NextQuestionsObject),
};
export const StoreQuestionObject = types
  .model("StoreQuestionObject")
  .props(StoreQuestionSchema);

export const VendorBasic = types.model({
  id: types.identifierNumber,
  name: types.string,
  created: types.Date,
  modified: types.Date,
  slug: types.string,
});
export const Product3DInputImage = types.model({
  id: types.identifierNumber,
  product_id: types.number,
  image: types.string,
  product_url: types.string,
});
export const ProductWise3D = types.model({
  product_id: types.identifierNumber,
  product_url: types.string,
  count: types.integer,
  title: types.string,
  description: types.string,
  model_3d: types.maybeNull(types.string),
  image: types.string,
});
