const { defineConfig } = require('@rspack/cli');
const { rspack } = require('@rspack/core');
const { VueLoaderPlugin } = require('vue-loader');
const autoprefixer = require('autoprefixer');

const browserslist = [
  'chrome >= 87',
  'edge >= 88',
  'firefox >= 78',
  'safari >= 14',
];

module.exports = defineConfig({
  context: __dirname,
  entry: {
    main: './src/main.ts',
  },
  resolve: {
    extensions: ['...', '.ts', '.vue'],
  },
  plugins: [
    new VueLoaderPlugin(),
    new rspack.HtmlRspackPlugin({
      template: './index.html',
    }),
    new rspack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    new rspack.CssExtractRspackPlugin(),
    new rspack.ProgressPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          experimentalInlineMatchResource: true,
        },
      },
      {
        test: /\.(js|ts)$/,
        include: [
          {
            and: [
              { not: /[\\/]node_modules[\\/]/ },
              /\.(?:ts|tsx|jsx|mts|cts)$/,
            ],
          },
        ],
        use: [
          {
            loader: 'builtin:swc-loader',
            options: {
              sourceMap: true,
              jsc: {
                parser: {
                  syntax: 'typescript',
                },
              },
              env: {
                targets: browserslist,
              },
            },
          },
        ],
      },
      {
        test: /\.(j|t)sx$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              preset: [
                [
                  require.resolve('@babel/preset-typescript'),
                  {
                    allowNamespaces: true,
                    allExtensions: true,
                    allowDeclareFields: true,
                    optimizeConstEnums: true,
                    isTSX: true,
                  },
                ],
                [
                  '@babel/preset-env',
                  {
                    bugfixes: true,
                    shippedProposals: true,
                  },
                ],
              ],
              plugins: [
                '@vue/babel-plugin-jsx',
                [
                  '@babel/plugin-transform-runtime',
                  {
                    corejs: { version: 3, proposals: true },
                    useESModules: true,
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.(?:css|postcss|pcss)$/,
        sideEffects: true,
        use: [
          {
            loader: rspack.CssExtractRspackPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                namedExport: false,
                exportOnlyLocals: false,
                // @ts-ignore
                auto: (path, query) => {
                  if (/\.vue$/.test(path)) {
                    return (
                      query.includes('type=style') && query.includes('module=')
                    );
                  }
                  return /\.modules?\.\w+$/i.test(path);
                },
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: [
                  autoprefixer({
                    flexbox: 'no-2009',
                    overrideBrowserslist: browserslist,
                  }),
                ],
              },
            },
          },
        ],
        resolve: {
          preferRelative: true,
        },
      },
      {
        test: /\.svg/,
        type: 'asset/resource',
      },
    ],
  },
  experiments: {
    css: false,
  },
});
