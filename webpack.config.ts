import path from 'path';
import Copy from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { IgnorePlugin } from 'webpack';

const isDev = process.env.NODE_ENV === 'development';

const config = [
  {
    name: 'main',
    target: 'electron-main',
    mode: isDev ? 'development' : 'production',
    entry: path.resolve(__dirname, 'app', 'electron/window.ts'),
    devtool: 'source-map',
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.(js|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js',
    },
    node: {
      __dirname: false,
      __filename: false,
    },
  },
  {
    name: 'renderer',
    target: 'electron-renderer',
    mode: isDev ? 'development' : 'production',
    entry: path.resolve(__dirname, 'lib', 'index.tsx'),
    devtool: 'source-map',
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      mainFields: ['main', 'module', 'browser'],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'renderer/bundle.js',
      publicPath: './',
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      historyApiFallback: true,
      compress: true,
      hot: true,
      port: 4000,
      publicPath: '/',
    },
    plugins: [
      process.platform !== 'darwin' &&
        new IgnorePlugin({ resourceRegExp: /^fsevents$/ }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'app/electron/index.html'),
        inject: 'body',
      }),
      new Copy({
        patterns: [
          {
            from: './yarn.lock',
            globOptions: { ignore: ['**/node_modules/**'] },
            to: 'yarn.lock',
          },
          {
            from: './*.json',
            globOptions: { ignore: ['**/node_modules/**'] },
            to: '[name][ext]',
          },
        ],
      }),
    ],
    externals: {
      'node-pty': 'commonjs2 node-pty',
    },
  },
];

export default config;
