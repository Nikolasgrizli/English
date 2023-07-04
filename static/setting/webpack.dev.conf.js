const webpack = require("webpack");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");

const devWebpackConfig = merge(baseWebpackConfig, {
    // DEV config
    mode: "development",
    devtool: "eval-cheap-source-map",
    devServer: {
        // contentBase: baseWebpackConfig.externals.paths.dist,
        // host: "0.0.0.0",
        port: 8081,
        hot: false,
        // overlay: {
        // warnings: true,
        // errors: true,
        // },
        // useLocalIp: true,
        // disableHostCheck: true,
        devMiddleware: {
            writeToDisk: true,
        }
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: "[file].map",
        }),
    ],
});

module.exports = new Promise((resolve, reject) => {
    resolve(devWebpackConfig);
});
