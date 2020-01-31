const path = require('path');
const outputFolder = "dist";
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
    mode: 'production', 
    entry: './src/Main.ts', 
    devServer: {
        contentBase: path.join(__dirname,outputFolder),
        port: 9000,
        hot:true
    },
    output: { 
        filename: "app.min.js",
        path: path.join(__dirname, outputFolder)
    },
    plugins:[
        new CopyPlugin([
            { from: 'public'}
        ])
    ],
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