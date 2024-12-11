/*
 *
 * DeploymentsEmptyState
 *
 */

import React, { memo } from "react";

import { EmptyStateLayout, LinkButton } from "@strapi/design-system";
import { File, Lock, WarningCircle, EmotionUnhappy, ArrowRight } from "@strapi/icons";

/**
 * @typedef {import('./typedefs').Props} Props
 * @typedef {import('./typedefs').EmptyStateType} DeploymentsAvailability
 */

const wrapIcon = (icon) => <div style={{ fontSize: "6rem" }}>{icon}</div>;

/**
 * @param {DeploymentsAvailability} listDeployAvailability
 * @returns {JSX.Element}
 */
const getIcon = (listDeployAvailability) => {
  switch (listDeployAvailability) {
    case "MISSING_CONFIG_OBJECT":
      return wrapIcon(<WarningCircle />);

    case "MISSING_CONFIG_VARIABLE":
      return wrapIcon(<Lock />);

    case "MISSING_DEPLOYMENTS":
      return wrapIcon(<File />);

    case "ERROR_DEPLOYMENTS":
    case "ERROR_AVAILABILITY_GENERIC":
    case "ERROR_AVAILABILITY_FORBIDDEN":
    case "ERROR_CONFIG":
    default:
      return wrapIcon(<EmotionUnhappy />);
  }
};

/**
 * @param {DeploymentsAvailability} listDeployAvailability
 * @returns {string}
 */
const getTextId = (listDeployAvailability) => {
  switch (listDeployAvailability) {
    case "MISSING_CONFIG_OBJECT":
      return "The config object is empty and this is unexpected";

    case "MISSING_CONFIG_VARIABLE":
      return "You did not set the Vercel API Token. Go to Plugin settings for more info";

    case "MISSING_DEPLOYMENTS":
      return "There isn't any deployment in your account";

    case "ERROR_DEPLOYMENTS":
      return "There was an error while fetching the deployments. Please, retry.";

    case "ERROR_AVAILABILITY_GENERIC":
      return "There was an error while fetching the features availability. Please, retry.";

    case "ERROR_AVAILABILITY_FORBIDDEN":
      return "You may not have the correct permissions";

    case "ERROR_CONFIG":
      return "There was an error while fetching the configurations. Please, retry.";

    default:
      return "There was an unexpected error";
  }
};

/**
 * Displays an empty state for the list of containers
 * @param {Props} props
 * @returns {JSX.Element}
 */
const DeploymentsEmptyState = ({ type }) => {
  if (type === "AVAILABLE") {
    return <></>;
  }

  const messageId = getTextId(type);
  const message = messageId;

  const linkText = "See plugin settings";
  const action = type === "MISSING_CONFIG_VARIABLE" && (
    <LinkButton
      variant={"secondary"}
      startIcon={<ArrowRight />}
      to="/settings/vercel-deploy"
    >
      {linkText}
    </LinkButton>
  );

  return (
    <EmptyStateLayout icon={getIcon(type)} content={message} action={action} />
  );
};

export default memo(DeploymentsEmptyState);
