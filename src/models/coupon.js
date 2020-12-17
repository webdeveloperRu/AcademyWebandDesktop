export default class Coupon {
  constructor(offer_id, code, value, discount_type, end_on, use_limit, is_active) {
    this.offer_id = offer_id;
    this.code = code;
    this.value = value;
    this.discount_type = discount_type;
    this.end_on = end_on;
    this.use_limit = use_limit;
    this.is_active = is_active;
  }
}

 