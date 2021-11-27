const path = require('path');
const fs = require('fs');
const CopyPlugin = require("copy-webpack-plugin");

const nodeModules = {};
fs.readdirSync('node_modules')
  .filter(x  =>{
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(mod => {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  mode: 'production',
  entry: './src/server.js',
  target: 'node',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'server.js'
  },
  externals: nodeModules,
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, 'src/data'),
          to: path.join(__dirname, 'build/data'),
        },
      ],
    }),
  ],
}
