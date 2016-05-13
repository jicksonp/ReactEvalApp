import { createStore } from 'redux';

const defaultBarCodes = [
    {
        code: 'Barcode 1',
        time: new Date().getTime(),
    },
];

const defaultStore = {
    barcodes: defaultBarCodes,
};

function todoStore(state = defaultStore, action) {
    switch (action.type) {
    case 'ADD_QR_CODE':
        return Object.assign({}, state, {
            barcodes: state.barcodes.concat([{
                code: action.qrcode,
                time: new Date().getTime(),
            }]),
        });

    default:
        return state;
    }
}

export default createStore(todoStore);
