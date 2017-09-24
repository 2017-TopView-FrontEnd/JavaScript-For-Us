Ext.define("BeginApp.store.User", {
	require: ['BeginApp.model.User'], //最好写
	extend: "Ext.data.Store",
  model: "BeginApp.model.User",
  data: [
    { name: "Tom", age: 5, phone: "123456" },
    { name: "Jerry", age: 3, phone: "654321" }
  ]
});