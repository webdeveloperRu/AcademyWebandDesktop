import store from '../store'

let authHeaderXWWW = function () {
    let header = {
        'apikey': store.state.auth.user.token,
        'Content-Type': 'application/x-www-form-urlencoded',

    };
    return header;
}
export {
    authHeaderXWWW
}