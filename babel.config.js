export default function () {
  const presets = ['@babel/preset-env']
  const plugins = ['@babel/plugin-syntax-dynamic-import', 'transform-remove-console']

  // if (process.env.NODE_ENV === 'production') {
  //   plugins.push()
  // }

  return {
    presets,
    plugins,
  }
}
