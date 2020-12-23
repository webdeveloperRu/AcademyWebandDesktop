import axios from 'axios';
import apiurl from './base_api_url'
import store from '../store'
import {
  authHeader
} from './authHeader'
const API_URL = apiurl.API_URL + 'offers/';
const API_URL_V3 = apiurl.API_URL_V3;
class OfferService {
  /**
   * ---------get offer list---------
   */
  getOfferList() {
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
   * ---------add new offer -----------------------
   */
  addOffer(offer) {
    offer = JSON.stringify(offer);
    return axios
      .post(API_URL,
        offer, {
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
   * ---------get offer by ID----------------
   */
  getOfferByID(offer_id) {
    return axios
      .get(API_URL + offer_id, {
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
   * ---------update offer by ID-----------------
   */
  updateOfferByID(offer) {
    let data = JSON.stringify(offer);
    return axios
      .put(API_URL + offer.id,
        data, {
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
   * ---------delete offer by ID---------------
   */
  deleteOfferByID(offer_id) {
    return axios
      .delete(API_URL + offer_id, {
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
  saveThumbNail(offer_id, thumbnail) {
    var FormData = require('form-data');
    var data = new FormData()

    let header = {
      'apikey': store.state.auth.user.token,
      'Content-Type': 'multipart/form-data'
    };
    data.append('image', thumbnail);
    return axios
      .post(API_URL + offer_id + '/thumbnail', data, {
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

  removeThumbNail(offer_id) {
    return axios
      .delete(API_URL + offer_id + '/thumbnail', {
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
   *  addTestimonial
   */
  addTestimonial(testimonial, offer_id) {
    var FormData = require('form-data');
    var data = new FormData()
    data.append('title', testimonial.title);
    data.append('author_name', testimonial.author_name);
    data.append('quote_text', testimonial.quote_text);
    data.append('avatar_img', testimonial.avatar_img);
    return axios
      .post(API_URL + offer_id + '/testimonials',
        data, {
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
   *  get Testimonail
   */
  getTestimonial(offer_id) {
    return axios
      .get(API_URL + offer_id + '/testimonials', {
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
   *  get Testimonail
   */
  getServiceAgreement(offer_id) {
    return axios
      .get(API_URL + offer_id + '/agreement', {
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
   * 
   * save service agreement
   */
  saveServiceAgreement(agreement, offer_id) {
    return axios
      .put(API_URL + offer_id + '/agreement',
        agreement, {
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
   *  get extra contact information
   */
  getExtraContactInformation(offer_id) {
    return axios
      .get(API_URL + offer_id + '/ecinfo', {
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
   *  save extra contact information
   */
  saveExtraContactInformation(extra_info, offer_id) {
    return axios
      .put(API_URL + offer_id + '/ecinfo',
        extra_info, {
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
   * ---------save banner-----------------
   */
  saveBanner(offer_id, banner) {
    var FormData = require('form-data');
    var data = new FormData()

    let header = {
      'apikey': store.state.auth.user.token,
      'Content-Type': 'multipart/form-data'
    };
    data.append('banner_enable', banner.banner_enable);
    data.append('banner_height', banner.banner_height);
    data.append('banner', banner.banner);

    return axios
      .put(API_URL + offer_id + '/banner', data, {
        headers: header
      }).then(response => {
        return response;
      })
      .catch(err => {
        return err;
      });
  }

  /**
   * ---------delete banner by ID-----------------
   */

  removeBanner(offer_id) {
    return axios
      .delete(API_URL + offer_id + '/banner', {
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
   * ------- get offer stats id ----------
   */
  getOfferStats(offer_id, days) {
    return axios
      .get(API_URL + offer_id + '/stats/' + days, {
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
   * ---------get public offer by ID----------------
   */
  getPublicOfferByID(offer_id) {
    return axios
      .get(API_URL_V3 + 'public/offer/' + offer_id, )
      .then(response => {
        return response;
      })
      .catch(err => {
        return err;
      });
  }



}
export default new OfferService();