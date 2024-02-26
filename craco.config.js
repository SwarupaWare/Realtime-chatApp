
const nodeExternals = require("webpack-node-externals");

// With CRACO, you can override the configurations for tasks like react-scripts start,
// react-scripts build, and react-scripts test.

module.exports = {
  webpack: {
    configure: {
      target: "electron-renderer",
      externals: [
        nodeExternals({
          allowlist: [/webpack(\/.*)?/, "electron-devtools-installer"],
        }),
      ],
    },
  },
};