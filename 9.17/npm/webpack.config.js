var path = require('path')

module.exports = {
	entry: './index.js',
	output: {
		// path: path.resolve(__dirname, 'dist'),
		filename: 'dist.js'
	},
	// devtool: 'source-map',
	// module: {
	// 	rules: [{
	// 		test: /\.js/,
	// 		use: [
	// 			loader: 'babel-loader',
	// 			options: {
	// 				/* ... */
	// 			}
	// 		]
	// 	}]
	// },
	// resolve: {
	// 	modules: [
	// 		'node_modules',
	// 		path.resolve(__dirname, 'dist')
	// 	],
	// 	extensions: ['.js', '.json', '.jsx', '.css']
	// }
}