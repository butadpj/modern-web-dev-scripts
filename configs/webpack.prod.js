import { merge } from 'webpack-merge';
import common from './webpack.common.js';

import CopyWebpackPlugin from 'copy-webpack-plugin';

export default merge(common, {
  mode: 'production',
  plugins: [
    ...common.plugins,
    new CopyWebpackPlugin({
      patterns: [{ from: './public' }],
    }),
  ],
});
