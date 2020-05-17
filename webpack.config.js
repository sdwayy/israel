/* eslint-disable */

const path = require(`path`);

module.exports = {
  mode: `development`,
  devtool: `source-map`,
  entry: {
    main: `./source/js/main.js`,
  },
  output: {
    filename: `[name].js`,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: `babel-loader`,
        exclude: /node_modules/,
        options: {
          presets: [`@babel/preset-env`]
        }
      }
    ]
  },
}
