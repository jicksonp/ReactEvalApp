import { createStore } from 'redux';

const defaultBarCodes = [
    {
        code: 'Barcode 1',
    },
];

const defaultStore = {
    barcodes: defaultBarCodes,
};

function todoStore(state = defaultStore, action) {
    switch (action.type) {
    default:
        return state;
    }
}

export default createStore(todoStore);
