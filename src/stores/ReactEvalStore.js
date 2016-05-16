import { createStore } from 'redux';

const defaultBarCodes = [
    {
        code: 'Barcode 1',
        time: new Date().getTime(),
    },
];

const defaultStore = {
    barcodes: defaultBarCodes
};

function todoStore(state = defaultStore, action) {
    switch (action.type) {
    case 'ADD_QR_CODE':
        // Copy the element in front of array.
        console.log('State update called', action);
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
