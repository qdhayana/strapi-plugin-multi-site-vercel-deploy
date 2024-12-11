/**
 *
 * DeploymentsContainer
 *
 */

import React from "react";
import { Loader, Flex, Box, Typography } from "@strapi/design-system";

import { useDeployments } from "../../hooks/useDeployments";
import DeploymentsEmptyState from "../DeploymentsEmptyState";
import DeploymentsList from "../DeploymentsList";

/**
 * @typedef {import('./typedefs').Deployment} Deployment
 * @typedef {import('./typedefs').Props} Props
 */

/**
 * Displays the of deployments
 * @param {Props} props
 * @returns {JSX.Element}
 */
const DeploymentsContainer = ({
  selectedSite,
  usePolling,
  onDeploymentsFetched,
}) => {
  const labelLoader = "Loading";

  const [isLoadingDeployments, deployments, hasDeploymentsError] =
    useDeployments(selectedSite, usePolling, onDeploymentsFetched);

  const hasEmptyDeployments = !deployments || deployments?.length <= 0;

  if (isLoadingDeployments && hasEmptyDeployments) {
    return (
      <Flex justifyContent="center">
        <Loader>{labelLoader}</Loader>
      </Flex>
    );
  }

  if (hasDeploymentsError) {
    return <DeploymentsEmptyState type="ERROR_DEPLOYMENTS" />;
  }

  if (hasEmptyDeployments) {
    return <DeploymentsEmptyState type="MISSING_DEPLOYMENTS" />;
  }

  return (
    <>
      {selectedSite ? (
        <Box paddingBottom={4}>
          <Typography variant="beta">{selectedSite.displayName}</Typography>
        </Box>
      ) : null}
      <DeploymentsList deployments={deployments} usePolling={usePolling} />;
    </>
  );
};

export default DeploymentsContainer;
