const createExpoWebpackConfig = require('@expo/webpack-config');
const getMode = require('@expo/webpack-config/webpack/utils/getMode');
const merge = require('webpack-merge');

module.exports = async function(env, argv) {
  let config = await createExpoWebpackConfig(env, argv);
  if (env /*&& env.debug*/) {   //<---------------------- [*]
                                //echoSettings();
    console.log('webpack.config: ', config);
  }
  // Customize the config before returning it.
  // Refer https://webpack.js.org/configuration/dev-server/
  const mode = getMode(env);
  if (mode === 'development') {
    config = merge(config, {
      devServer: {
        hot: false,
        // hotOnly: true  // if hot is enabled this one will disable fallback to page refresh

        // a script will be inserted in your bundle to take care of live reloading, and build messages will appear in the browser console
        // inline mode and iframe mode are two modes
        inline: false,
        overlay: true,
        //watchContentBase: true,
        // if hot is disabled, this will reload/refresh the page when file changes are detected
        //liveReload: false
      }
    });
  }

  if (env /*&& env.debug*/) {   //<---------------------- [*]
    //echoSettings();
    console.log('webpack.config: ', config);
  }

  return config;
};


