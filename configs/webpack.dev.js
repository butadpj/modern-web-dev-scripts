import { merge } from 'webpack-merge';
import common from './webpack.common.js';

export default merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 3005,
    compress: true,
    static: ['./public', './pages'],
    hot: true,
    open: true,
  },
  optimization: {
    runtimeChunk: 'single',
  },
});
