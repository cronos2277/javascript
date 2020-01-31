const path = require('path');
const outputFile = "dist";
module.exports = {
    mode: 'production', 
    entry: './src/Main.ts', 
    output: { 
        filename: "app.min.js",
        path: path.join(__dirname, outputFile)
    },
    resolve: {
        extensions: ['.ts','.js']
    },
    module:{
        rules:[{
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    }
}