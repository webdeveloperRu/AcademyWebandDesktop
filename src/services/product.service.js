import axios from 'axios';
import apiurl from './base_api_url'
import store from '../store'
import {
  authHeader
} from './authHeader'
const API_URL = apiurl.API_URL + 'products/';
class ProductService {
  /**
   * ---------get proudct list---------
   */
  getProductList() {
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
   * ---------add proudct -----------------------
   */
  addProduct(product) {
    return axios
      .post(API_URL, {
        title: product.title,
        description: product.description
      }, {
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
   * ---------get proudct by ID----------------
   */
  getProductByID(product_id) {
    return axios
      .get(API_URL + product_id, {
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
   * ---------save ThumbNail-----------------
   */
  saveThumbNail(product_id, thumbnail) {
    var FormData = require('form-data');
    var data = new FormData()

    let header = {
      'apikey': store.state.auth.user.token,
      'Content-Type': 'multipart/form-data'
    };
    data.append('image', thumbnail);
    return axios
      .post(API_URL + product_id + '/thumbnail', data, {
        headers: header
      }).then(response => {
        return response;
      })
      .catch(err => {
        return err;
      });
  }

  /**
   * ---------delete thumbnail by ID-----------------
   */

  removeThumbNail(product_id) {
    return axios
      .delete(API_URL + product_id + '/thumbnail', {
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
   * ---------update proudct by ID-----------------
   */
  updateProductByID(product) {
    let list = JSON.stringify(product);
    return axios
      .put(API_URL + product.id,
        list, {
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
   * ---------delete proudct by ID---------------
   */
  deleteProductByID(id) {
    return axios
      .delete(API_URL + id, {
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
   * ---------get Categories for product ID----------
   */
  getCategoriesForProductID(product_id) {
    return axios
      .get(API_URL + product_id + '/categories', {
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
   * ---------get Offers for product ID---------------
   */
  getOffersForProductID() {

  }

  /**
   * ---------get voushers for product ID ------------
   */
  getVoushersForProductID() {

  }

  /**
   * get product progress details
   */
  getProductProgressID(product_id) {
    return axios
      .get(API_URL + product_id + '/progress', {
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
   * get product progress details
   */
  getStudentProgress(product_id, student_id) {
    return axios
      .get(API_URL + product_id + '/progress/' + student_id + '?demo', {
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
export default new ProductService();