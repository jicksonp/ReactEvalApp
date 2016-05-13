import { createStore } from 'redux';

const defaultBarCodes = [
    {
        code: 'Barcode 1',
    },
    {
        code: 'Barcode 2',
    },
    {
        code: 'Barcode 3',
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
            }]),
        });

    default:
        return state;
    }
}

export default createStore(todoStore);
