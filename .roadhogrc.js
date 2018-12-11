export default {
  entry: "src/index.js",
  disableCSSModules: true,
  publicPath: "./",
  proxy: {
    "/score": {
      target: "http://127.0.0.1:3002/",
      changeOrigin: true,
      secure: false
    }
  },
  env: {
    development: {
      extraBabelPlugins: [
        "dva-hmr",
        "transform-runtime",
        [
          "import",
          { libraryName: "antd", libraryDirectory: "es", style: "css" }
        ]
      ]
    },
    production: {
      extraBabelPlugins: [
        "transform-runtime",
        [
          "import",
          { libraryName: "antd", libraryDirectory: "es", style: "css" }
        ]
      ]
    }
  }
};
