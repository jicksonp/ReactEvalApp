import { createStore } from 'redux';

const defaultStore = {
    qrcodes: [],
    isLoaded: false,
};

function todoStore(state = defaultStore, action) {
    switch (action.type) {
    case 'ADD_QR_CODE':
        // Copy the element in front of array.
        //console.log('State update called', action);
        const newArray = [{
            code: action.qrcode.code,
            time: action.qrcode.time,
        }];
        return Object.assign({}, state, {
            qrcodes: newArray.concat(state.qrcodes),
            isLoaded: true,
        });
    case 'UPDATE_ALL_QR_CODES':
        //console.log('State update called UPDATE_ALL_QR_CODES ', action);
        return Object.assign({}, state, {
            qrcodes: action.qrcodes,
            isLoaded: true,
        });
    default:
        return state;
    }
}

export default createStore(todoStore);
