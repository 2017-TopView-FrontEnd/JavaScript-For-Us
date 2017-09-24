Ext.define('BeginApp.controller.User', {
  extend: 'Ext.app.Controller',
  views: ['User', 'UserWin'],
  init: function () {
    this.control({
      'userPanel#user_aaa': {
        itemdblclick: this.editUser,
      },
      'userWin button#save': {
        click: this.saveUser
      }
    });
  },
  editUser: function (grid, record) {
    var win = Ext.create('BeginApp.view.UserWin'); 
    win.down('form').loadRecord(record);
    win.show();
  },
  saveUser: function (btn) {
    var win = btn.up('window'),
        form = win.down('form');
    form.updateRecord();
    win.close();
  }

});