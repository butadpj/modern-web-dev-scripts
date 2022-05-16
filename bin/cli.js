#!/usr/bin/env node

import { execSync } from 'child_process';
import colors from 'colors';
import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackDevConfig from '../configs/webpack.dev.js';
import webpackProdConfig from '../configs/webpack.prod.js';

const environment = process.argv[2];

if (process.argv.length < 3) {
  console.log(
    `Select what webpack config you want to use: ${colors.brightGreen(
      'dev',
    )} or ${colors.brightMagenta('prod')} `,
  );
  console.log('For example :');
  console.log(colors.bold('    npx modern-web-dev-configs dev'));
  process.exit(1);
}

function main() {
  if (environment == 'start') {
    // Run wepback server

    console.log(colors.brightMagenta('Starting development server...'));

    const compiler = Webpack(webpackDevConfig);
    const devServerOptions = { ...webpackDevConfig.devServer };
    const server = new WebpackDevServer(devServerOptions, compiler);

    const runServer = async () => {
      await server.start();
    };

    runServer();
  }

  if (environment == 'build') {
    console.log(
      colors.brightMagenta('Building the minified bundle for production...'),
    );

    execSync('npx rimraf ./build');

    Webpack(webpackProdConfig, (error, stats) => {
      if (error) {
        console.error(error.stack || error);
        if (error.details) {
          console.error(error.details);
        }
        return;
      }

      const info = stats.toJson();

      if (stats.hasErrors()) {
        console.error(info.errors);
      }

      if (stats.hasWarnings()) {
        console.warn(info.warnings);
      }

      console.log(
        stats.toString({
          // Add console colors
          colors: true,
        }),
      );

      console.log(colors.brightGreen('\n\n    App compiled successfuly!'));
    });
  }
}

main();
