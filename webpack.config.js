const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV,  

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",
  entry: './src/client/index.tsx',

  resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".ts", ".tsx"]
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        include: [path.resolve(__dirname, "./")],
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/typescript",
            ],
          },
        }
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
          enforce: "pre",
          test: /\.js$/,
          loader: "source-map-loader"
      },

      {
        test: /\.s[ac]ss$/i,
        use: [ 'style-loader', 'css-loader','sass-loader' ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({}),
  ],

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
      "react": "React",
      "react-dom": "ReactDOM"
  }
};