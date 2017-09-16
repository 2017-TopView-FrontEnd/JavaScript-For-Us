var module = {}

;(function() {
	var min = 1
	var max = 6

	function add () {
		console.log(min + max)
	}

	module.add = add
})()

console.log(module)

// 在其他JS中这样使用
module.add()