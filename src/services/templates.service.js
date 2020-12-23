import axios from 'axios';
import apiurl from './base_api_url'
import {
  authHeaderV2
} from './authHeaderV2'
const API_URL = apiurl.API_URL_V2 + 'templates/';
class TemplatesService {
  /**
   * ---------add new email template---------
   */
  addTemplate(template) {
    template = JSON.stringify(template);
    return axios
      .post(API_URL, template, {
        headers: authHeaderV2()
      })
      .then(response => {
        return response;
      })
      .catch(err => {
        return err;
      });
  }

  /**
   * ---------get all email templates-----------------------
   */
  getTemplateList() {
    return axios
      .get(API_URL, {
        headers: authHeaderV2()
      })
      .then(response => {
        return response;
      })
      .catch(err => {
        return err;
      });
  }

  /**
   * ---------get template by ID----------------
   */
  getTemplateByID(template_id) {
    return axios
      .get(API_URL + template_id, {
        headers: authHeaderV2()
      })
      .then(response => {
        return response;
      })
      .catch(err => {
        return err;
      });
  }

  /**
   * ---------update template by ID-----------------
   */
  updateTemplate(template) {
    return axios
      .post(API_URL,
        template, {
          headers: authHeaderV2()
        })
      .then(response => {
        return response;
      })
      .catch(err => {
        return err;
      });
  }

  /**
   * ---------delete template by ID---------------
   */
  resetTemplate(template) {
    return axios
      .delete(API_URL + 'reset/' + template.slug, {
        headers: authHeaderV2()
      })
      .then(response => {
        return response;
      })
      .catch(err => {
        return err;
      });

  }

  /**
   * ---------send Test Email---------
   */
  sendTestEmail(template, email) {
    return axios
      .post(API_URL + 'send-test-email', {
        email: email,
        slug: template.slug
      }, {
        headers: authHeaderV2()
      })
      .then(response => {
        return response;
      })
      .catch(err => {
        return err;
      });
  }




}
export default new TemplatesService();