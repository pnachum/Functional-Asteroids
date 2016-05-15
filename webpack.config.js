module.exports = {
  context: __dirname,
  entry: "./app.js",
  output: {
    path: "./",
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader",
      query: {
        presets: ['es2015', 'stage-0']
      }
    }]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ["", ".js"]
  }
};
