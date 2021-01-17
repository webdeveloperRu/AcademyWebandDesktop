import axios from "axios";
import apiurl from "./base_api_url";
import { authHeader } from "./authHeader";
import { authHeaderXWWW } from "./authHeader_xwww";
const API_URL = apiurl.API_URL + "prod-customize/";
class ProdCustomizeService {
  /**
   * ---------save Product Customize Header -------------------
   */
  saveProdHeader(header, product_id) {
    var qs = require('qs');
    var data = qs.stringify(header);
    return axios
      .post(API_URL + product_id + "/header", data, {
        headers: authHeaderXWWW(),
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  /**
   * ---------get product customize header -----------------------
   */
  getProdHeader(product_id) {
    
    return axios
      .get(API_URL + product_id + "/header", {
        headers: authHeader(),
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  /**
   * ---------save product Customize footer -------------------
   */
  saveProdFooter(footer, product_id) {
    return axios
      .post(API_URL + product_id + "/footer", footer, {
        headers: authHeader(),
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  /**
   * ---------get product customize footer -----------------------
   */
  getProdFooter(product_id) {
    return axios
      .get(API_URL + product_id + "/footer", {
        headers: authHeader(),
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  /**
   * ---------save product Customize hero -------------------
   */
  saveProdHero(hero, product_id) {  
    var qs = require('qs');
    var data = qs.stringify(hero);
    return axios
      .post(API_URL + product_id + "/hero", data, {
        headers: authHeaderXWWW(),
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  /**
   * ---------get product customize hero -----------------------
   */
  getProdHero(product_id) {
    return axios
      .get(API_URL + product_id + "/hero", {
        headers: authHeader(),
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  /**
   * ---------save product Customize settings -------------------
   */
  saveProdSettings(settings, product_id) {
    return axios
      .post(API_URL + product_id + "/settings", settings, {
        headers: authHeader(),
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  /**
   * ---------get product customize settings -----------------------
   */
  getProdSettings(product_id) {
    return axios
      .get(API_URL + product_id + "/settings", {
        headers: authHeader(),
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  /**
   * ---------save product Customize slidebar -------------------
   */
  saveProdSlidebar(slidebar, product_id) {
    slidebar = JSON.stringify(slidebar)
    return axios
      .post(API_URL + product_id + "/slidebar", slidebar, {
        headers: authHeader(),
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  /**
   * ---------get product customize sldiebar -----------------------
   */
  getProdSlidebar(product_id) {
    return axios
      .get(API_URL + product_id + "/slidebar", {
        headers: authHeader(),
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  /**
   * ---------save product Customize wellcome -------------------
   */
  saveProdWellcome(wellcome, product_id) {
    wellcome = JSON.stringify(wellcome)
    return axios
      .post(API_URL + product_id + "/wellcome", wellcome, {
        headers: authHeader(),
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  /**
   * ---------get product customize wellcome -----------------------
   */
  getProdWellcome(product_id) {
    return axios
      .get(API_URL + product_id + "/wellcome", {
        headers: authHeader(),
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  /**
   * ---------save product Customize syllabus -------------------
   */
  saveProdSyllabus(syllabus, product_id) {
    return axios
      .post(API_URL + product_id + "/syllabus", syllabus, {
        headers: authHeader(),
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  /**
   * ---------get product customize syllabus -----------------------
   */
  getProdSyllabus(product_id) {
    return axios
      .get(API_URL + product_id + "/syllabus", {
        headers: authHeader(),
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }
}
export default new ProdCustomizeService();
