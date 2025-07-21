module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      "babel-plugin-styled-components",
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          safe: true,
          allowUndefined: false,
        },
      ],
      [
        "module-resolver",
        {
          alias: {
            "@src": "./src",
            "@assets": "./assets",
            "@screens": "./src/screens",
            "@navigation": "./src/navigation",
            "@hooks": "./src/hooks",
            "@store": "./src/store",
            "@utils": "./src/utils",
            "@auth": "./src/screens/auth",
            "@Console": "./src/screens/Console",
            "@components": "./src/components",
          },
          extensions: [
            ".ts",
            ".tsx",
            ".js",
            ".jsx",
            ".json",
          ],
        },
      ],
    ],
  };
};
