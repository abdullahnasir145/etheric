const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const {
    resolver: { sourceExts, assetExts },
  } = config;

  // 1. Filter out svg from assetExts and add to sourceExts
  config.resolver.assetExts = assetExts.filter((ext) => ext !== "svg");
  config.resolver.sourceExts = [...sourceExts, "svg"];

  // 2. Add the svg transformer
  config.transformer.babelTransformerPath =
    require.resolve("react-native-svg-transformer");

  // 3. Wrap with NativeWind
  return withNativeWind(config, { input: "./global.css" });
})();
