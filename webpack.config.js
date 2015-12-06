//Plugins
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var Clean = require('clean-webpack-plugin');

module.exports = {
  //enable source-maps
  devtool: 'source-map',

  module: {
    loaders: [
      { test: /\.html$/, loader: "file!html-loader" },
      { test: /\.json$/, loader: "json-loader" },
      { test: /\.jade$/, loader: "jade-loader" },
      { test: /\.css$/,
         //loader: "style-loader!css-loader"
         loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
      { test: /\.less$/, loader: "style-loader!css-loader!less-loader"},
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      //special loader for modernizer, see: https://github.com/webpack/webpack/issues/512#issuecomment-58324622
      { test: /[\\\/]bower_components[\\\/]modernizr[\\\/]modernizr\.js$/,
           loader: "imports?this=>window!exports?window.Modernizr" }
    ],
  },

  entry: {
    //'site-generator': 'static-site-loader!./content',
    'background': './src/background',
    'frontend': './src/frontend',
    'frontend.html': './src/frontend/frontend.html',
    'styles': './src/css'
  },

  output: {
    filename: "[name].js",
    chunkFilename: "[id].js",
    path: 'built',
    libraryTarget: 'umd'
  },

  externals: {
    // require("jquery") is external and available
    //  on the global var jQuery
    //"jquery": "jQuery"
  },

  plugins: [
    new Clean(['built']),
    new ExtractTextPlugin("[name].css", { allChunks: true }),
    new CopyWebpackPlugin([
      //manifest file
      { from: 'src/manifest.json', to: 'manifest.json' },
      //{ from: 'src/src', to: 'src' },
      { from: 'src/_locales', to: '_locales' },
      //{ from: 'src/css', to: 'css' },
      { from: 'src/icons', to: 'icons' },
      { from: 'src/background/background.html', to: 'background.html' },
      { from: 'src/frontend/frontend.html', to: 'frontend.html' }
    ]),
  ],

  resolve: {
    alias: {
      'net': 'chrome-net',
      'fs': 'chrome-fs',
    }
  }
};
