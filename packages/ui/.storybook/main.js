// .storybook/main.js

const react = require("@vitejs/plugin-react");
const macrosPlugin = require("vite-plugin-babel-macros");

module.exports = {
  features: {
    babelModeV7: true, //https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#babel-mode-v7
    // interactionsDebugger: true, // 👈 Enable playback controls
  },
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  /** Expose public folder to storybook as static */
  // staticDirs: ['../public'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    // '@storybook/addon-interactions',
    'storybook-dark-mode',
    'storybook-mobile',
    {
      /**
       * Fix Storybook issue with PostCSS@8
       * @see https://github.com/storybookjs/storybook/issues/12668#issuecomment-773958085
       */
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  framework: "@storybook/react",
  core: {
    builder: '@storybook/builder-vite',
  },
  async viteFinal(config, { configType }) {
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    config.plugins = [
      // ...config.plugins,
      ...config.plugins.filter((plugin) => {
        return !(
          Array.isArray(plugin) && plugin[0].name === "vite:react-babel"
        );
      }),
      react({
        exclude: [/\.stories\.(t|j)sx?$/, /node_modules/],
        fastRefresh: true,
        // jsxImportSource: "@stitches/react",
        // jsxRuntime: "automatic",
        // babel: { plugins: ["@emotion/babel-plugin"], babelrc: false },
      }),

      macrosPlugin.default(),
      // WindiCSS.default(),
      // svgr()
    ];
    return config;
  },
};
