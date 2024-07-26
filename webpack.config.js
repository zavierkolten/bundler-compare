const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const browserslist = [
  'chrome >= 87',
  'edge >= 88',
  'firefox >= 78',
  'safari >= 14',
];

module.exports = {
  context: __dirname,
  entry: {
    main: './src/main.ts',
  },
  resolve: {
    extensions: ['...', '.ts', '.vue'],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    new MiniCssExtractPlugin(),
		new webpack.ProgressPlugin(),
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
        test: /\.(js|jsx|mjs|cjs|ts|tsx|mts|cts)$/,
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
            loader: 'thread-loader',
          },
          {
            loader: 'babel-loader',
            options: {
              presets: [
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
            loader: MiniCssExtractPlugin.loader,
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
};
