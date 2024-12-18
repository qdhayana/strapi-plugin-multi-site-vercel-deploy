/*
 *
 * DeployButton
 *
 */

import React, { useState, useEffect } from "react";

import { useNotification } from "@strapi/strapi/admin";
import { Button, Loader } from "@strapi/design-system";
import { Plus } from "@strapi/icons";

import SymmetricBox from "../SymmetricBox";
import { getErrorNotification } from "./ErrorUtils";
import { runDeploy } from "../../utils/api";

/**
 * @typedef {import('./typedefs').Props} Props
 * @typedef {import('./typedefs').FeatureAvailability} FeatureAvailability
 * @typedef {import('./typedefs').ApiErrorType} ApiErrorType
 * @typedef {import('./typedefs').ErrorStateType} DeployErrorStateType
 * @typedef {import('../Notifications/typedefs').NotificationConfig} NotificationConfig
 */

/**
 *
 * @param {boolean} hasDeployError
 * @param {ApiErrorType} availabilityApiError
 * @param {FeatureAvailability} runDeployAvailability
 * @returns {DeployErrorStateType}
 */
const getDeployErrorState = (
  hasDeployError,
  availabilityApiError,
  runDeployAvailability
) => {
  if (hasDeployError) return "ERROR_DEPLOY";
  if (availabilityApiError) {
    switch (availabilityApiError) {
      case "FORBIDDEN":
        return "ERROR_FORBIDDEN";

      case "GENERIC_ERROR":
      default:
        return "ERROR_AVAILABILITY";
    }
  }
  return runDeployAvailability;
};

/**
 * Display a button to deploy together with an error message
 * @param {Props} props
 * @returns {JSX.Element}
 */
const DeployButton = ({
  selectedSite,
  availabilityApiError,
  runDeployAvailability,
  onDeployed,
}) => {
  /** @type {(config: NotificationConfig) => void} */
  const toggleNotification = useNotification();
  const labelLoader = "Loading";

  const [isLoading, setIsLoading] = useState(false);
  const [hasDeployError, setHasDeployError] = useState(false);

  const canDeploy = runDeployAvailability == "AVAILABLE";
  const deployErrorState = getDeployErrorState(
    hasDeployError,
    availabilityApiError,
    runDeployAvailability
  );

  useEffect(() => {
    const hasDeployedSuccessfully = deployErrorState === "AVAILABLE";
    if (!hasDeployedSuccessfully && deployErrorState) {
      const notification = getErrorNotification(deployErrorState);
      toggleNotification(notification);
    }
  }, [deployErrorState, toggleNotification, getErrorNotification]);

  const runDeployHandler = async () => {
    try {
      setHasDeployError(false);
      setIsLoading(true);
      await runDeploy(selectedSite);
      if (onDeployed) onDeployed(false);
    } catch (error) {
      console.error("[vercel-deploy] Error while running deploy", error);
      if (onDeployed) onDeployed(true);
      setHasDeployError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {isLoading && (
        <SymmetricBox paddingHorizontal={4}>
          <Loader small>{labelLoader}</Loader>
        </SymmetricBox>
      )}
      <SymmetricBox paddingHorizontal={4}>
        <Button onClick={runDeployHandler} disabled={!canDeploy || isLoading}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Plus />
            <span style={{ width: "8px" }} />
            Deploy
          </div>
        </Button>
      </SymmetricBox>
    </div>
  );
};

export default DeployButton;
