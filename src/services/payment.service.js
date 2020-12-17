import axios from 'axios';
import apiurl from './base_api_url'
import {authHeader} from './authHeader'
const API_URL = apiurl.API_URL + 'payments/';
const API_URL_V3= apiurl.API_URL_V3 + 'payment/';
class PaymentService { 
  
  /**
   * ---------get details payment ID---------
   */
  getDetailsPaymentID(id) {
    return axios
      .get(API_URL + 'i/' + id,  {headers:  authHeader()})
      .then(response => {
        return response;
      })
      .catch(err => {
        return err;
    });
  }

  /**
   * --------get payment list---------
   */
  getPaymentList() {
    return axios
      .get(API_URL + 'list',  {headers:  authHeader()})
      .then(response => {
        return response;
      })
      .catch(err => {
        return err;
    });
  }

   /**
   * ---------create new payment -----------------------S
   */
  createPaymentStripe(stripe) {
    return axios
      .post(API_URL_V3+'new', 
        stripe, 
       )
      .then(response => {       
        return response;
      })
      .catch(err => {
        return err;
    });
  }

  /**
   * ---------update payment by ID-----------------
   */
  updatePaymentID(payment) {
    return axios
      .put(API_URL + 'i/' + payment.id,
        payment, 
        {headers:  authHeader()})
      .then(response => {       
        return response;
      })
      .catch(err => {
        return err;
    });
  }

  

}
export default new PaymentService();