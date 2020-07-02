module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@config': './src/config',
        '@models': './src/models',
        '@controllers': './src/controllers',
        '@middlewares': './src/middlewares',
        '@routes': './src/routes',
        '@entities': './src/entities',
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
