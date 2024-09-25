const { getDefaultConfig } = require("expo/metro-config");
const { assetExts } = require("metro-config/src/defaults/defaults");

// Get default Expo Metro configuration
const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push("ttf", "otf"); // Add font extensions

// Export the modified configuration
module.exports = config;
