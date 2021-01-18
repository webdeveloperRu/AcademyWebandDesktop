import axios from 'axios';
import apiurl from './base_api_url'
import store from '../store'
import {
  authHeader
} from './authHeader'
const API_URL = apiurl.API_URL + 'lesson/';
class LessonService {
  /**
   * ---------get lesson list---------
   */
  getLessonList(category_id) {
    return axios
      .get(API_URL + category_id + '/cat', {
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
   * ---------add new lesson -----------------------
   */
  addLesson(lesson, category_id) {
    return axios
      .post(API_URL + category_id + '/cat',
        lesson, {
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
   * ---------get lesson by ID----------------
   */
  getLessonByID(lesson_id) {
    return axios
      .get(API_URL + lesson_id, {
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
   * ---------get comment by ID----------------
   */
  getCommentList(lesson_id) {
    return axios
      .get(API_URL + lesson_id + '/comments', {
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
   * ---------update lesson by ID-----------------
   */
  updateLessonByID(lesson) {
    let list = JSON.stringify(lesson);
    return axios
      .put(API_URL + lesson.id,
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
   * ---------update lesson List  -----------------
   */
  updateLessonListOrder(lesson_list, category_id) {
    let list = JSON.stringify(lesson_list);
    return axios
      .post(API_URL + category_id + '/list',
        list, {
          headers: authHeader()
        })
      .then(response => {
        return response;
      })
      .catch(err => {
        return err;
      });

    // var config = {
    //    method: 'post',
    //    url: API_URL + ':' + category_id +'/list',
    //    headers: { 
    //      'apikey': store.state.auth.user.token
    //    },
    //    data : lesson_list
    //  };
    //  return axios(config).then(response => {       
    //      return response;
    //    })
    //    .catch(err => {
    //      return err;
    //  });
  }

  /**
   * ---------delete lesson by ID---------------
   */
  deleteLessonByID(lesson_id) {
    return axios
      .delete(API_URL + lesson_id, {
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
  saveThumbNail(lesson_id, thumbnail) {
    var FormData = require('form-data');
    var data = new FormData()

    let header = {
      'apikey': store.state.auth.user.token,
      'Content-Type': 'multipart/form-data'
    };
    data.append('image', thumbnail);
    return axios
      .post(API_URL + lesson_id + '/thumbnail', data, {
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

  removeThumbNail(lesson_id) {
    return axios
      .delete(API_URL + lesson_id + '/thumbnail', {
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
   * ---------save Video-----------------
   */
  saveVideo(lesson_id, video) {
    var FormData = require('form-data');
    var data = new FormData()

    let header = {
      'apikey': store.state.auth.user.token,
      'Content-Type': 'multipart/form-data'
    };
    data.append('video', video);
    return axios
      .post(API_URL + lesson_id + '/video',
        data, {
          headers: header,
          onUploadProgress: function (progressEvent) {
            store.dispatch('loadingStatus', parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100)));
          }
        }).then(response => {
        return response;
      })
      .catch(err => {
        return err;
      });
  }

  /**
   * ---------delete Video by ID-----------------
   */

  removeVideo(lesson_id) {
    return axios
      .delete(API_URL + lesson_id + '/video', {
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
   * ---------save Download-----------------
   */
  saveDownloadFile(lesson_id, download_file) {
    var FormData = require('form-data');
    var data = new FormData()
    let header = {
      'apikey': store.state.auth.user.token,
      'Content-Type': 'multipart/form-data'
    };
    data.append('image', download_file);
    return axios
      .post(apiurl.API_URL + 'downloads/' + lesson_id, data, {
        headers: header
      }).then(response => {
        return response;
      })
      .catch(err => {
        return err;
      });
  }

  /**
   * ---------delete downlaod by ID-----------------
   */

  removeDownloadFile(file_id) {
    return axios
      .delete(apiurl.API_URL + 'downloads/file/' + file_id, {
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
   * ---------get downlaods-----------------
   */

  getDownloadFileList(lesson_id) {
    return axios
      .get(apiurl.API_URL + 'downloads/' + lesson_id, {
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
   * ---------get downlaod by id-----------------
   */

  getDownloadFile(file_id) {
    return axios
      .get(apiurl.API_URL + 'downloads/file/' + file_id, {
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
   * ---------change lesson status-----------------
   */
  changeCommentStatus(lesson_id, status) {
    return axios
      .put(API_URL + lesson_id + '/change-status-comments/' + status, {}, {
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
export default new LessonService();