import axios from 'axios';
import apiurl from './base_api_url'
import store from '../store'
const API_URL = apiurl.API_URL + 'auth/';
const API_STUDNET_URL = apiurl.API_URL_V3 + 'auth/';
class AuthService {
  login(user, rememberme) {
    return axios
      .post(API_URL + 'login', {
        email: user.email,
        password: user.password,
        otp: user.otp
      }, )
      .then(response => {
        if (response.data.token) {
          if (rememberme) {
            localStorage.setItem('user', JSON.stringify(response.data));
          }
        }
        return response;
      })
      .catch(err => {
        return err;
      });
  }

  logout() {
    return axios.get(API_URL + 'logout', {}, {
        headers: {
          'Auth': 'allow'
        }
      }).then(response => {
        localStorage.removeItem('user');
        return response;
      })
      .catch(err => {
        localStorage.removeItem('user');
        return err;
      });
  }

  register(user) {
    return axios.post(API_URL + 'register', {
        "email": user.email,
        "password": user.password,
        "otp": user.otp
      }, {
        headers: {
          'Auth': 'allow'
        }
      }).then(response => {
        return response;
      })
      .catch(err => {
        return err;
      });
  }

 


  forgotPassword(useremail) {
    return axios.post(API_URL + 'forgot-password', {
        email: useremail,
      }, {
        headers: {
          'Auth': 'allow'
        }
      }).then(response => {
        return response;
      })
      .catch(err => {
        return err;
      });
  }

  resetPassword(user, emailcode) {
    return axios.post(API_URL + 'reset-password?code=' + emailcode, {
        "email": user.email,
        "email-code": emailcode,
        "newpassword": user.password,
      }, {
        headers: {
          'Auth': 'allow'
        }
      }).then(response => {
        return response;
      })
      .catch(err => {
        return err;
      });
  }

  changePassword(password, newpassword) {
    return axios.post(API_URL + 'change-password', {
        "password": password,
        "new_password": newpassword
      }, {
        headers: {
          'apikey': store.state.auth.user.token
        }
      }).then(response => {
        return response.data;
      })
      .catch(err => {
        return err;
      });
  }

  userLog() {
    return axios.get(API_URL + 'userlog/', {
        headers: {
          'apikey': store.state.auth.user.token
        }
      }).then(response => {
        return response;
      })
      .catch(err => {
        return err;
      });
  }

  createNewStudent(user) {
    return axios
      .post(
        API_STUDNET_URL + "register",
        user,
        {
          headers: {
            Auth: "allow",
          },
        }
      )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }


}

export default new AuthService();