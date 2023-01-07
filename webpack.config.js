const path = require("path");

module.exports = {
    mode: "development",
    entry: "./app/app.jsx",
    output: {
        path: path.resolve(__dirname, "./public"),
        publicPath: "/public/",
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-react"]
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource'
            }
        ]
    }
}