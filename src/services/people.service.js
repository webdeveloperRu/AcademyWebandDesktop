import axios from 'axios';
import apiurl from './base_api_url'
import {authHeader} from './authHeader'
const API_URL = apiurl.API_URL+'people/';
class PeopleService { 
  /**
   * ---------get people list---------
   */
  getPeopleList() {
    return axios
      .get(API_URL,  {headers:  authHeader()})
      .then(response => {
        return response;
      })
      .catch(err => {
        return err;
    });
  }

   /**
   * ---------add new people -----------------------
   */
  addPeople(people) {
    people = JSON.stringify(people);
    return axios
      .post(API_URL, 
        people, 
        {headers:  authHeader()})
      .then(response => {       
        return response;
      })
      .catch(err => {
        return err;
    });
  }

  /**
   * ---------get people by ID----------------
   */
  getPeopleByID(people_id) {
    return axios
      .get(API_URL+people_id, 
        {headers:  authHeader()})
      .then(response => {   
        return response;
      })
      .catch(err => {
        return err;
    });
  }

  /**
   * ---------update people by ID-----------------
   */
  updatePeopleByID(people, people_id) {
    people = JSON.stringify(people);
    return axios
      .put(API_URL+people_id, 
        people, 
        {headers:  authHeader()})
      .then(response => {       
        return response;
      })
      .catch(err => {
        return err;
    });
  }

  /**
   * ---------delete people by ID---------------
   */
  deletePeopleByID(people_id) {
    return axios
      .delete(API_URL+people_id, 
        {headers:  authHeader()})
      .then(response => {       
        return response;
      })
      .catch(err => {
        return err;
    });
    
  }

}
export default new PeopleService();