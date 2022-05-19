const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const prepare = (mode, imageDir, outputPath) => {
  return {
    mode: mode,
    entry: {
      background: {
        import: './src/js/app-background/background.main.js',
        filename: 'background.js',
      },
      content: {
        import: './src/js/app-content/content.main.js',
        filename: 'js/content.js',
      },
      options: {
        import: './src/js/app-options/options.main.js',
        filename: 'js/options.js',
      },
      popup: {
        import: './src/js/app-popup/popup.main.js',
        filename: 'js/popup.js',
      },
      manifestV3: {
        import: './src/js/app/manifest.v3.main.js',
        filename: 'js/manifest.v3.js',
      },
    },
    plugins: [
      new webpack.ProgressPlugin(),
      new CopyPlugin({
        patterns: [
          {
            from: 'src/manifest.json',
            to: 'manifest.json',
          },
          {
            from: 'src/_locales',
            to: '_locales',
          },
          {
            from: 'src/html',
            to: 'html',
          },
          {
            from: 'src/' + imageDir,
            to: 'image',
          },
        ],
      }),
    ],
    output: {
      path: path.resolve(__dirname, outputPath),
      assetModuleFilename: 'resource/[hash][ext][query]',
    },
    module: {
      rules: [
        {
          test: /\.(js)$/,
          include: path.resolve(__dirname, 'src'),
          loader: 'babel-loader',
        },
        {
          test: /\.(css)$/,
          use: [
            'style-loader', {
              loader: 'css-loader',
            },
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
        {
          // More information here https://webpack.js.org/guides/asset-modules/
          test: /\.(svg|eot|ttf|woff|woff2)$/i,
          type: 'asset',
        },
      ],
    },
  };
};

module.exports.prepare = prepare;
