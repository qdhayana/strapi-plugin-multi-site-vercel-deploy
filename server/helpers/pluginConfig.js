const pluginId = require("./pluginId");

/**
 * @typedef {import('../../types/typedefs').PluginConfigMap} PluginConfigMap
 */

const getPluginConfig = (strapi) => {
  console.log(strapi.plugin(pluginId), pluginId, "getPluginConfig")
  return strapi.plugin(pluginId).config;
};

module.exports = getPluginConfig;
