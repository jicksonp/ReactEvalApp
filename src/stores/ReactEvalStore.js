import { createStore } from 'redux';

const defaultBarCodes = [
    {
        code: 'Barcode 1',
        time: new Date().getTime(),
    },
];

const defaultStore = {
    barcodes: defaultBarCodes,
    drawer: null,
    navigator: null,
};

function todoStore(state = defaultStore, action) {
    switch (action.type) {
    case 'ADD_QR_CODE':
        // Copy the element in front of array.
        const newArray = [{
            code: action.qrcode,
            time: new Date().getTime(),
        }];
        return Object.assign({}, state, {
            barcodes: newArray.concat(state.barcodes),
        });
    default:
        return state;
    }
}

export default createStore(todoStore);
