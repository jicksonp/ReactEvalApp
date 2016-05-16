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
        component: require('./scenes/Avatars').default,
    },

    github: {
        title: 'Github API',
        component: require('./scenes/Avatars').default,
    },

    logout: {
        title: 'Github API',
        component: require('./scenes/Avatars').default,
    },

};
