var path = require('path'),
    webpack = require("webpack"),
    assetsPath = path.join(__dirname, 'assets'),
    pkg = require('./package.json'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

var bundleCss = "bundle-[hash:6].css";

module.exports = {
    entry: [
        "./src/index.tsx",
        "./assets/css/style.css",
        "./assets/images/logo.png"
    ],
    output: {
        filename: "bundle-[hash:6].js",
        path: __dirname + "/dist"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json", ".css"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: "css-loader"
                })
            },{
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader?name=img/[name].[ext]' // inline base64 URLs for <=10kb images, direct URLs for the rest
            },
        ],
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
    plugins: [
        new ExtractTextPlugin(bundleCss),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            pkg: pkg,
            template: path.join(assetsPath, 'html/index.html')
        })
    ]
};
