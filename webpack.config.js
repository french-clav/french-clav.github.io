const path = require("path");

module.exports = {
    mode: "production",
    entry: "./app/app.jsx",
    output: {
        path: path.resolve(__dirname, "./public"),
        publicPath: "/public/",
        filename: "bundle.js"
    },
    optimization: {
        chunkIds: 'named',
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
            },
            {
                test: /\.csv$/,
                loader: 'csv-loader',
                options: {
                    header: true,
                    skipEmptyLines: true
                }
            },
            {
                test: /\.(png|jpe?g|svg|gif)$/,
                type: "asset/resource",
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
}