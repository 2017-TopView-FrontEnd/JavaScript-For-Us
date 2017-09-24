Ext.define('BeginApp.Application', {
    name: 'BeginApp',

    extend: 'Ext.app.Application',

    views: [
        'BeginApp.view.User',
        'BeginApp.view.UserWin'
    ],

    controllers: [
        'BeginApp.controller.User'
        // TODO: add controllers here
    ],

    stores: [
        // TODO: add stores here
    ]
});
