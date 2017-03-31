process.env.NODE_ENV = process.env.NODE_ENV || 'development';

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import config from 'config';
import webpackConfig from './webpack.config';

const host = 'localhost';
const appPort = 3000;
const devServerPort = 3001;

new WebpackDevServer(webpack(webpackConfig), {
  contentBase: [ config.get('buildDirectory'), '/' ].join(''),
  headers: { 'Access-Control-Allow-Origin': '*' },
  historyApiFallback: true,
  hot: true,
  noInfo: false,
  publicPath: webpackConfig.output.publicPath,
  proxy: {
    '*': 'http://' + host + ':' + appPort
  }
}).listen(devServerPort, host, function (err) {
  if (err) {
    console.log(err);
  }

  console.log('Webpack Dev Server running at ' + host + ':' + devServerPort);
});
