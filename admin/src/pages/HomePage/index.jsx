/*
 *
 * HomePage
 *
 */

import React, { memo, useState, useEffect } from "react";

import {
  Box,
  Flex,
  Typography,
  Link,
  Button
} from "@strapi/design-system"; import { Page } from "@strapi/strapi/admin";

import { ArrowLeft } from "@strapi/icons";

import Notifications from "../../components/Notifications";
import SymmetricBox from "../../components/SymmetricBox";
import DeployButton from "../../components/DeployButton";
import DeploymentsContainer from "../../components/DeploymentsContainer";
import DeploymentsEmptyState from "../../components/DeploymentsEmptyState";
import SitePicker from "../../components/SitePicker";
import { useDeployAvailability } from "../../hooks/useDeployAvailability";
import { getSites } from "../../utils/getSites";

/**
 * @typedef {import('../../../../types/typedefs').DeploymentsFetched} DeploymentsFetched
 * @typedef {import('../../../../types/typedefs').ApiErrorType} ApiErrorType
 * @typedef {import('../../../../types/typedefs').FeatureAvailability} FeatureAvailability
 * @typedef {import('../../components/DeploymentsEmptyState/typedefs').EmptyStateType} EmptyStateType
 */

/**
 *
 * @param {ApiErrorType} availabilityApiError
 * @param {FeatureAvailability} listDeployAvailability
 * @returns {EmptyStateType}
 */
const getDeploymentsEmptyStateType = (
  availabilityApiError,
  listDeployAvailability
) => {
  if (availabilityApiError) {
    switch (availabilityApiError) {
      case "FORBIDDEN":
        return "ERROR_AVAILABILITY_FORBIDDEN";

      case "GENERIC_ERROR":
      default:
        return "ERROR_AVAILABILITY_GENERIC";
    }
  }

  return listDeployAvailability;
};

const HomePage = () => {
  const headerTitle = "Vercel Deploy";
  const headerSubtitle = "Manual deploy - Start a deployment on Vercel using the webhook you configured";

  const [useDeploymentsPolling, setUseDeploymentsPolling] = useState(false);
  const [sites, setSites] = useState([]);
  const [selectedSite, setSelectedSite] = useState({});
  const [isLoadingAvailability, availability, apiError] =
    useDeployAvailability(selectedSite);

  useEffect(async () => {
    const sitesFromConfig = await getSites();
    setSites(sitesFromConfig);
    setSelectedSite(sitesFromConfig[0]);
  }, []);

  /** @type {DeploymentsFetched} */
  const onDeploymentsFetched = (hasNonFinalState) => {
    // I want to keep fetching deployments if there is a deployment in progress until it finishes
    setUseDeploymentsPolling(hasNonFinalState);
  };

  if (isLoadingAvailability && !selectedSite) {
    return <Page.Loading />;
  }

  const canListDeploy = availability?.listDeploy == "AVAILABLE";

  const onDeployed = (hasError) => {
    if (hasError) return;
    setUseDeploymentsPolling(true);
  };

  return (
    <Notifications>
      <Box background="neutral100">
        <Box padding={4} background="neutral100">
          <Box>
            <Link to="/" startIcon={<ArrowLeft />}>
              Go back
            </Link>
          </Box>

          <Flex justifyContent="between">
            <Flex>
              <Typography variant="alpha" as="h2">
                {headerTitle}
              </Typography>
              <SymmetricBox paddingHorizontal={10} paddingVertical={2}>
                {canListDeploy ? (
                  <DeploymentsContainer
                    selectedSite={selectedSite}
                    usePolling={useDeploymentsPolling}
                    onDeploymentsFetched={onDeploymentsFetched}
                  />
                ) : (
                  <DeploymentsEmptyState
                    type={getDeploymentsEmptyStateType(
                      apiError,
                      availability?.listDeploy
                    )}
                  />
                )}
              </SymmetricBox>
            </Flex>
            <Box>
              <DeployButton
                selectedSite={selectedSite}
                availabilityApiError={apiError}
                runDeployAvailability={availability?.runDeploy}
                onDeployed={onDeployed}
              />
            </Box>
          </Flex>
          <Box>
            {headerSubtitle && (
              <Typography variant="epsilon">
                {headerSubtitle}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>

    </Notifications>
  );
};

export default memo(HomePage);
