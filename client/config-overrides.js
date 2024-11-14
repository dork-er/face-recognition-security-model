const webpack = require('webpack');

module.exports = function override(config) {
	config.resolve.fallback = {
		...config.resolve.fallback,
		assert: require.resolve('assert/'),
		zlib: require.resolve('browserify-zlib'),
		path: require.resolve('path-browserify'),
		crypto: require.resolve('crypto-browserify'),
		stream: require.resolve('stream-browserify'),
		process: require.resolve('process/browser.js'),
		http: require.resolve('stream-http'),
		buffer: require.resolve('buffer'),
		util: require.resolve('util'),
		url: require.resolve('url'),
		vm: require.resolve('vm-browserify'),
		// Remove fs and net if not used
		fs: false,
		net: false,
	};

	config.plugins = (config.plugins || []).concat([
		new webpack.ProvidePlugin({
			process: 'process/browser.js',
		}),
	]);

	return config;
};
