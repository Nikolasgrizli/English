const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");
const fetch = require('node-fetch');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const pug = require('pug');


// Main const
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#main-const
const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../../build'),
    distData: path.join(__dirname, '../../'),
    assets: 'assets/'
};

// Pages const for HtmlWebpackPlugin
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#html-dir-folder
// const PAGES_DIR = PATHS.src
const PAGES_DIR = `${PATHS.src}/pug/pages/`;
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'));




module.exports = {
    // BASE config
    devtool: 'source-map',
    externals: {
        paths: PATHS
    },
    entry: {
        app: PATHS.src,
    },
    output: {
        filename: `${PATHS.assets}js/[name].js`,
        path: PATHS.dist,
        publicPath: ''
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendors',
                    test: /node_modules/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [{
            test: /\.pug$/,
            // use: ['html-loader?attributes=false', 'pug-html-loader']
            loader: 'pug-loader',
            options: {
                pretty: true,
            }
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/node_modules/',
            options: {
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            targets: {
                                ie: 11,
                            },
                        }
                    ]
                ]
            }
        }, {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file-loader',
            exclude: /svg/,
            include: `${PATHS.src}/${PATHS.assets}fonts/`,
            options: {
                name: '[path][name].[ext]',
                context: `${PATHS.src}/${PATHS.assets}`,
                outputPath: PATHS.assets,
                publicPath: '../'
            }
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            exclude: /svg/,
            options: {
                name: '[path][name].[ext]',
                useRelativePath: true,
                context: `${PATHS.src}/${PATHS.assets}`,
                outputPath: PATHS.assets,
                publicPath: '../'
            }
        }, {
            test: /\.svg$/,
            exclude: /node_modules/,
            loader: 'svg-sprite-loader',
            options: {}
        }, {
            test: /\.scss$/,
            use: [
                'style-loader',
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                        url: false
                    }
                }, {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true,
                        config: {
                            path: `./postcss.config.js`
                        }
                    }
                }, {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }
            ]
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                        url: false
                    }
                }, {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true,
                        config: {
                            path: `./postcss.config.js`
                        }
                    }
                }
            ]
        }]
    },
    resolve: {
        alias: {
            '~': PATHS.src,
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].css`,
        }),
        new CopyWebpackPlugin({
            patterns: [{
                    from: `${PATHS.src}/${PATHS.assets}img`,
                    to: `${PATHS.assets}img`
                },
                {
                    from: `${PATHS.src}/${PATHS.assets}fonts`,
                    to: `${PATHS.assets}fonts`
                },
                {
                    from: `${PATHS.src}/${PATHS.assets}media`,
                    to: `${PATHS.assets}`
                },
            ]
        }),
        new SpriteLoaderPlugin({
            plainSprite: true
        }),
        new ImageminWebpWebpackPlugin({
            detailedLogs: true,
            overrideExtension: true,
            config: [{
                test: /\.(jpe?g|png|gif)/,
                // exclude: /media/,
                options: {
                    quality: 85
                }
            }],
        }),
        // new BundleAnalyzerPlugin(),
        // Automatic creation any html pages (Don't forget to RERUN dev server)
        // see more: https://github.com/vedees/webpack-template/blob/master/README.md#create-another-html-files
        // best way to create pages: https://github.com/vedees/webpack-template/blob/master/README.md#third-method-best
        ...PAGES.map(page => new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/${page}`,
			templateParameters: {
				pug: pug
			},
            filename: `./${page.replace(/\.pug/, '.html')}`,
            inject: false,
            minimize: false
        }))
    ],
};
