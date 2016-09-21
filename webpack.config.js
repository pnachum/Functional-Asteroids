module.exports = {
  context: __dirname,
  entry: "./main.jsx",
  output: {
    path: "./",
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: "babel-loader",
      query: {
        presets: ['react', 'es2015', 'stage-0'],
        plugins: ['transform-flow-strip-types']
      }
    }]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ["", ".js", ".jsx"]
  }
};
