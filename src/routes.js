export default {

    qrcodelist: {
        initialRoute: true,
        title: 'QR Code Scanner',
        component: require('./barcodelist/BarcodeList').default,

        children: {
            example: {
                title: 'Scan QR Code',
                component: require('./barcodescanner/BarcodeScanner').default,
            },
        },
    },

    github: {
        title: 'Github API',
        component: require('./barcodescanner/BarcodeScanner').default,
    },

    logout: {
        title: 'Github API',
        component: require('./barcodescanner/BarcodeScanner').default,
    },

};
