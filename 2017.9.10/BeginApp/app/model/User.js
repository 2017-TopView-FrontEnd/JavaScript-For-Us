// BeginApp.model.school.User ==  User.js 

Ext.define("BeginApp.model.User", {
  extend: "Ext.data.Model",
  fields: [
    { name: 'name', type: 'string' },
    { name: 'age', type: 'int' },
    { name: 'phone', type: 'string' }
  ]
});