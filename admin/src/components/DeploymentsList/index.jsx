/**
 *
 * DeploymentsList
 *
 */

import React from "react";
import { Table, Thead, Tbody, Tr, Td, Th, Typography, Tooltip, LinkButton, Badge, Loader } from "@strapi/design-system";
import { Eye, ExternalLink } from "@strapi/icons";


import SymmetricBox from "../SymmetricBox";
import FormattedMessage from "../FormattedMessage";

/**
 * @typedef {import('./typedefs').Props} Props
 * @typedef {import("../../../../types/typedefs").DeploymentState} DeploymentState
 */

const getDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

/**
 * @param {DeploymentState} deploymentState
 * @returns {string} Strapi color
 */
const getStateColor = (deploymentState) => {
  switch (deploymentState) {
    case "ERROR":
    case "CANCELED":
      return "danger700";

    case "READY":
      return "success700";

    default:
      return "neutral700";
  }
};

/**
 * @param {DeploymentState} deploymentState
 * @returns {string} Strapi color
 */
const getStateBackgroundColor = (deploymentState) => {
  switch (deploymentState) {
    case "ERROR":
    case "CANCELED":
      return "danger100";

    case "READY":
      return "success100";

    default:
      return "neutral100";
  }
};

/**
 * Displays the table with the deployments
 * @param {Props} props
 * @returns {JSX.Element}
 */
const DeploymentsList = ({ deployments, usePolling }) => {
  const ROW_COUNT = deployments.length + 1;
  const COL_COUNT = 5;

  const labelLoader = "Loading";

  const headerFontVariant = "sigma";
  const cellTextColor = "neutral800";

  return (
    <Table colCount={COL_COUNT} rowCount={ROW_COUNT}>
      <Thead>
        <Tr>
          <Th>
            <FormattedMessage
              variant={headerFontVariant}
              labelId="App name"
            />
          </Th>
          <Th>
            <FormattedMessage
              variant={headerFontVariant}
              labelId="State"
            />
            {usePolling && (
              <SymmetricBox paddingHorizontal={2} paddingVertical={0}>
                <Loader small>{labelLoader}</Loader>
              </SymmetricBox>
            )}
          </Th>
          <Th>
            <FormattedMessage
              variant={headerFontVariant}
              labelId="Creation date"
            />
          </Th>
          <Th />
        </Tr>
      </Thead>
      <Tbody>
        {deployments.map((entry) => (
          <Tr key={entry.uid}>
            <Td>
              <Typography textColor={cellTextColor}>{entry.name}</Typography>
            </Td>
            <Td>
              <Badge
                textColor={getStateColor(entry.state)}
                backgroundColor={getStateBackgroundColor(entry.state)}
              >
                {entry.state}
              </Badge>
            </Td>
            <Td>
              <Typography textColor={cellTextColor}>
                {getDate(entry.created)}
              </Typography>
            </Td>
            <Td>
              <Tooltip
                description={
                  <FormattedMessage labelId="Visit" />
                }
              >
                <LinkButton
                  href={`https://${entry.url}`}
                  variant="tertiary"
                  style={{ border: "none" }}
                >
                  <ExternalLink />
                </LinkButton>
              </Tooltip>
              <Tooltip
                description={
                  <FormattedMessage labelId="Inspect" />
                }
              >
                <LinkButton
                  href={entry.inspectorUrl}
                  variant="tertiary"
                  style={{ border: "none" }}
                >
                  <Eye />
                </LinkButton>
              </Tooltip>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default DeploymentsList;
