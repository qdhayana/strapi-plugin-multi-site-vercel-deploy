"use strict";

const getPluginConfig = require("../helpers/pluginConfig");

/**
 * @typedef {import('../../types/typedefs').PluginConfigMap} PluginConfigMap
 * @typedef {import('../../types/typedefs').FeatureAvailability} FeatureAvailability
 */

/**
 * Build config map object
 * @returns {PluginConfigMap}
 */
const buildConfig = (strapi, hideSensitiveInfo = false) => {
  const pluginConfig = getPluginConfig(strapi);

  /** @type {string | null} */
  const sites = pluginConfig("sites");

  return sites.map((site) => {
    const apiToken = hideSensitiveInfo
      ? site.apiToken?.substring(0, 6)
      : site.apiToken;
    console.log(site, "buildConfig")
    return {
      ...site,
      apiToken,
    };
  });
};

/**
 * Return the availability for the input feature
 * @param {PluginConfigMap} configObj Configuration file
 * @param {keyof PluginConfigMap} configName Name of the config prop, it is a key of the object {@link PluginConfigMap}
 * @returns {FeatureAvailability}
 */
const getFeatureAvailability = (configObj, configName) => {
  if (!configObj) {
    return "MISSING_CONFIG_OBJECT";
  }

  if (!configObj[configName]) {
    return "MISSING_CONFIG_VARIABLE";
  }

  return "AVAILABLE";
};

module.exports = {
  buildConfig,
  getFeatureAvailability,
};
