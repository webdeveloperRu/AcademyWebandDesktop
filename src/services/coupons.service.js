import axios from 'axios';
import apiurl from './base_api_url'
import {
  authHeader
} from './authHeader'
const API_URL = apiurl.API_URL + 'coupons/';
class CouponService {
  /**
   * ---------get coupon list---------
   */
  getCouponList() {
    return axios
      .get(API_URL, {
        headers: authHeader()
      })
      .then(response => {
        return response;
      })
      .catch(err => {
        return err;
      });
  }

  /**
   * ---------add new coupon -----------------------
   */
  addCoupon(coupon) {
    coupon = JSON.stringify(coupon);
    return axios
      .post(API_URL,
        coupon, {
          headers: authHeader()
        })
      .then(response => {
        return response;
      })
      .catch(err => {
        return err;
      });
  }

  /**
   * ---------get coupon by ID----------------
   */
  getCouponByID(coupon_id) {
    return axios
      .get(API_URL + coupon_id, {
        headers: authHeader()
      })
      .then(response => {
        return response;
      })
      .catch(err => {
        return err;
      });
  }

  /**
   * ---------update coupon by ID-----------------
   */
  updateCouponByID(coupon) {
    coupon = JSON.stringify(coupon);
    return axios
      .put(API_URL + coupon.id,
        coupon, {
          headers: authHeader()
        })
      .then(response => {
        return response;
      })
      .catch(err => {
        return err;
      });
  }

  /**
   * ---------delete coupon by ID---------------
   */
  deleteCouponByID(coupon_id) {
    return axios
      .delete(API_URL + coupon_id, {
        headers: authHeader()
      })
      .then(response => {
        return response;
      })
      .catch(err => {
        return err;
      });

  }


}
export default new CouponService();