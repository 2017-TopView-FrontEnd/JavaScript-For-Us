Ext.define('BeginApp.view.UserWin', {
  extend: 'Ext.window.Window',
  alias: 'widget.userWin',
  title: '编辑用户',
  width: 300,
  height: 200,
  layout: 'fit',
  items: [{
    xtype: 'form',
    margin: 5,
    border: false,
    fieldDefaults: {
      labelAlign: 'left',
      labelWidth: 60
    },
    items: [
      { xtype: 'textfield', name: 'name', fieldLabel: '姓名' },
      // { xtype: 'numberfield', name: 'age', fieldLabel: '年龄' },
      { xtype: 'textfield', name: 'phone', fieldLabel: '电话' }
    ]
  }],
  buttons: [
    {
      text: '保存', 
      itemId: 'save'
    },
    {text: 'q', itemId: 'q'}
  ]
});