module.exports = {
    entry: "./src/js/entry.js",
    output: {
        path: __dirname,
        filename: "/dist/js/bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};