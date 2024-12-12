import axios from "./axiosInstance";
import pluginId from "../pluginId";

/**
 * @typedef {import('../../../types/typedefs').PluginConfig} PluginConfig
 * @typedef {import('../../../types/typedefs').RunDeployResponse} RunDeployResponse
 * @typedef {import('../../../types/typedefs').GetDeploymentsResponse} GetDeploymentsResponse
 * @typedef {import('../../../types/typedefs').DeployAvailabilityResponse} DeployAvailabilityResponse
 */

/**
 * Start a deploy
 * @returns {Promise<RunDeployResponse>}
 */
export const runDeploy = async (selectedSite) => {
  try {
    const data = await axios(
      `/${pluginId}/deploy/run?site=${selectedSite.appFilter}`,
      { method: "GET" }
    );
    return data.data;
  } catch (error) {
    console.error("[vercel-deploy] Error while running a deploy -", error);
    throw error;
  }
};

/**
 * Fetch and return plugin config
 * @returns {Promise<PluginConfig>}
 */
export const getConfig = async () => {
  try {
    const response = await axios(`/${pluginId}/config`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('jwtToken')}`,
        Accept: 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error("[vercel-deploy] Error while fetching configs -", error);
    throw error;
  }
};

/**
 * Fetch and return Deployments info
 * @returns {Promise<GetDeploymentsResponse>}
 */
export const getDeployments = async (selectedSite) => {
  try {
    const response = await axios(
      `/${pluginId}/deploy/list?site=${selectedSite.appFilter}`,
      { method: "GET" }
    );
    return response.data;
  } catch (error) {
    console.error(
      "[vercel-deploy] Error while fetching deployments list -",
      error
    );
    throw error;
  }
};

/**
 * Fetch the availability for each deploy feature
 * @returns {Promise<DeployAvailabilityResponse>}
 */
export const deployAvailability = async (selectedSite) => {
  try {
    const response = await axios(
      `/${pluginId}/deploy/availability?site=${selectedSite.appFilter}`,
      {
        method: "GET",
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "[vercel-deploy]: Error while fetching deploy availability -",
      error
    );
    throw error;
  }
};
