import axios from 'axios';
import apiurl from './base_api_url'
import {authHeader} from './authHeader'
const API_URL = apiurl.API_URL+'comments/';
class CommentsService { 
  /**
   * ---------get comment list---------
   */
  getCommentList() {
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
   * ---------add new comment -----------------------
   */
  addComment(comment) {
    comment = JSON.stringify(comment);
    return axios
      .post(API_URL, 
        comment, 
        {headers:  authHeader()})
      .then(response => {       
        return response;
      })
      .catch(err => {
        return err;
    });
  }

  /**
   * ---------get comment by ID----------------
   */
  getCommentByID(comment_id) {
    return axios
      .get(API_URL+comment_id, 
        {headers:  authHeader()})
      .then(response => {   
        return response;
      })
      .catch(err => {
        return err;
    });
  }

   /**
   * ---------get comment by lesson_id----------------
   */
  getCommentByLessonID(lesson_id) {
    return axios
      .get(API_URL + '?lesson_id=' + lesson_id, 
        {headers:  authHeader()})
      .then(response => {   
        return response;
      })
      .catch(err => {
        return err;
    });
  }

  /**
   * ---------get comment by product_id----------------
   */
  getCommentByProductID(product_id) {
    return axios
      .get(API_URL + '?product_id=' + product_id, 
        {headers:  authHeader()})
      .then(response => {   
        return response;
      })
      .catch(err => {
        return err;
    });
  }

  /**
   * ---------update comment by ID-----------------
   */
  updateCommentByID(comment) {
    let data = JSON.stringify(comment);
    return axios
      .put(API_URL+comment.id, 
        data, 
        {headers:  authHeader()})
      .then(response => {       
        return response;
      })
      .catch(err => {
        return err;
    });
  }

  /**
   * ---------delete comment by ID---------------
   */
  deleteCommentByID(comment_id) {
    return axios
      .delete(API_URL+comment_id, 
        {headers:  authHeader()})
      .then(response => {       
        return response;
      })
      .catch(err => {
        return err;
    });
    
  }

  /**
   * ---------change comment status-----------------
   */
  changeCommentStatus(comment) {
    let data = JSON.stringify(comment);
    return axios
      .put(API_URL+comment.id +'/change-status/' + comment.status, data , {headers:  authHeader()}).then(response => {       
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
      .delete(API_URL+offer_id +'/thumbnail', 
        {headers:  authHeader()})
      .then(response => {       
        return response;
      })
      .catch(err => {
        return err;
    });
    
  }

}
export default new CommentsService();