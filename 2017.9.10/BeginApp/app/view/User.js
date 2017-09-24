Ext.define('BeginApp.view.User', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.userPanel',
  itemId: 'user_aaa',
  require: [
    'BeginApp.store.User'
  ],
  title: '用户面板',
  layout: 'fit',
  initComponent: function() {
    this.store = Ext.create('BeginApp.store.User');
    this.columns = [
      { text: '姓名', dataIndex: 'name' },
      { text: '年龄', dataIndex: 'age', xtype: 'numbercolumn', format: '0' },
      { text: '电话', dataIndex: 'phone' }
    ]
    this.callParent(arguments);
  }
});