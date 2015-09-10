'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = {
  dev: {
    entry: {
      app: './assets/scripts/main.js',
      vendor: ['jquery', 'handlebars', 'simplestorage.js']
    },

    output: {
      path: './',
      filename: 'bundle.js'
    },

    plugins: [
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
    ],

    module: {
      loaders: [
        { test: /\.handlebars$/, loader: 'handlebars-loader' }
      ]
    },

    resolve: {
      modulesDirectories: ['node_modules', 'src'],
      fallback: path.join(__dirname, 'node_modules'),
      alias: {
        'handlebars': 'handlebars/runtime.js'
      }
    },

    resolveLoader: {
      fallback: path.join(__dirname, 'node_modules'),
      alias: {
        'hbs': 'handlebars-loader'
      }
    },

    stats: {
      colors: true,
      modules: true,
      reasons: true
    },

    failOnError: false,
    watch: true,
    keepalive: true
  },

  prod: {
    entry: {
      app: './assets/scripts/main.js',
      vendor: ['jquery', 'handlebars', 'simplestorage.js']
    },

    output: {
      path: './',
      filename: 'bundle.js'
    },

    plugins: [
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
    ],

    resolve: {
      modulesDirectories: ['node_modules', 'src'],
      fallback: path.join(__dirname, 'node_modules'),
      alias: {
        'handlebars': 'handlebars/runtime.js'
      }
    },

    resolveLoader: {
      fallback: path.join(__dirname, 'node_modules'),
      alias: {
        'hbs': 'handlebars-loader'
      }
    },

    stats: {
      colors: true,
      modules: true,
      reasons: true
    },

    failOnError: true,
    watch: false,
    keepalive: false
  }
};
