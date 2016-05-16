export default {

    qrcodelist: {
        initialRoute: true,
        title: 'QR Code Scanner',
        component: require('./scenes/BarcodeList').default,

        children: {
            scanqrcode: {
                title: 'Scan QR Code',
                component: require('./scenes/BarcodeScanner').default,
            },
        },
    },

    github: {
        title: 'Github Api',
        component: require('./scenes/GithubApis').default,
    },

    logout: {
        title: 'Logout',
        component: require('./scenes/GithubApis').default,
    },

};
