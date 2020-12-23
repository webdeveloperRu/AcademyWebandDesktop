import store from '../store'

let authHeaderV2 = function () {
    let header = {
        'apikey': store.state.auth.user.token,
        'Content-Type': 'application/json'
    };
    return header;
}
export {
    authHeaderV2
}