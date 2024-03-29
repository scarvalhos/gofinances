module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'inline-dotenv',
      [
        'module-resolver', {
            root: ['.'],
            extensions: [
              ".js",
              ".jsx",
              ".ts",
              ".tsx",
              ".android.js",
              ".android.tsx",
              ".ios.js",
              ".ios.tsx",
            ],
            alias: {
              "@components": "./src/components",
              "@contexts": "./src/contexts",
              "@screens": "./src/screens",
              "@assets": "./src/assets",
              "@hooks": "./src/hooks",
              "@utils": "./src/utils",
            }
        }
      ]
    ]
  };
};
