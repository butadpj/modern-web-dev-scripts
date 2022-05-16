import path from 'path';
import {
  getPageTemplatesChunkEntryPoints,
  getPageTemplatesWithChunk,
  htmlWebpackPluginTemplates,
  createPageTemplates,
  getScriptFoldersIn,
  getPageNamesIn,
} from 'modern-web-dev-utils';

import CopyWebpackPlugin from 'copy-webpack-plugin';

const __dirname = path.resolve();

export default {
  entry: getPageTemplatesChunkEntryPoints(
    getPageTemplatesWithChunk('./pages', './scripts'),
    './scripts',
  ),
  output: {
    path: path.resolve(__dirname, 'build/'),
    filename: 'js/[name].js',
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: './public' }],
    }),
    ...htmlWebpackPluginTemplates(
      createPageTemplates(
        getPageNamesIn('./pages'),
        getScriptFoldersIn('./scripts'),
      ),
    ),
  ],
};
