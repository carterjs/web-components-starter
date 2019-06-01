const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        index: "./src/app-root.ts"
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /[^app]\.scss$/,
                use: [
                    {
                        loader: "lit-scss-loader",
                        options: {
                            minify: true
                        }
                    },
                    "extract-loader",
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            includePaths: ["./node_modules"]
                        }
                    }
                ]
            },
            {
                test: /app\.scss/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            includePaths: ["./node_modules"]
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new CopyWebpackPlugin([
            {
                from: "../node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js",
                to: "lib/webcomponents-bundle.js"
            }
        ])
    ],
    output: {
        filename: "[name].bundle.js",
        chunkFilename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/"
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    }
}