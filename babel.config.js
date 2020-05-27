export default function () {
  const presets = ['@babel/preset-env']
  const plugins = [
    '@babel/plugin-syntax-dynamic-import',
    'transform-remove-console',
    [
      'babel-plugin-module-resolver',
      {
        root: ['./merged-locales'],
        alias: {
          mobile: './mobile',
          web: './web',
        },
      },
    ],
  ]

  // if (process.env.NODE_ENV === 'production') {
  //   plugins.push()
  // }

  return {
    presets,
    plugins,
  }
}
