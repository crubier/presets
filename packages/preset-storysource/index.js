function webpack(webpackConfig = {}, options = {}) {
  const { module = {} } = webpackConfig;
  const { loaderOptions, rule = {} } = options;

  return {
    ...webpackConfig,
    module: {
      ...module,
      rules: [
        ...(module.rules || []),
        {
          test: [/\.stories\.(jsx?$|tsx?$)/],
          ...rule,
          enforce: 'pre',
          use: [
            {
              loader: require.resolve('@storybook/addon-storysource/loader'),
              options: loaderOptions,
            },
          ],
        },
      ],
    },
  };
}

function addons(entry = []) {
  return [...entry, require.resolve('@storybook/addon-storysource/register')];
}

module.exports = { webpack, addons };
