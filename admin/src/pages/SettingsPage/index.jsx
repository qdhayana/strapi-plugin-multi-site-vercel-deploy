/*
 *
 * SettingsPage
 *
 */

import React, { memo, useEffect, useState } from "react";

import { Box, Flex, Loader, Flex, Typography, Divider, TextInput } from "@strapi/design-system";


import DeploymentsEmptyState from "../../components/DeploymentsEmptyState";
import { getConfig } from "../../utils/api";
import FormattedMessage from "../../components/FormattedMessage";
import ExternalLink from "../../components/ExternalLink";
import { useFormattedMessage } from "../../hooks/useFormattedMessage";

/**
 * @typedef {import('../../../../types/typedefs').PluginConfigMap} PluginConfigMap
 * @typedef {import('../../../../types/typedefs').ApiErrorType} ApiErrorType
 * @typedef {import('../../components/DeploymentsEmptyState/typedefs').EmptyStateType} EmptyStateType
 */

const BoxField = ({ fieldName, fieldHint, children }) => {
  const horizontalPadding = 10;
  const verticalPadding = 2;
  return (
    <Box
      paddingLeft={horizontalPadding}
      paddingRight={horizontalPadding}
      paddingTop={verticalPadding}
      paddingBottom={verticalPadding}
    >
      <Box name={fieldName}>
        {children}
        {fieldHint && (
          <Typography variant="pi" textColor="neutral600" paddingTop={2}>
            {fieldHint}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

const SettingsContainer = () => {
  const deployHookPlaceholder = useFormattedMessage(
    "settings-page.deploy-hook.placeholder"
  );
  const apiTokenPlaceholder = useFormattedMessage(
    "settings-page.api-token.placeholder"
  );
  const appNamePlaceholder = useFormattedMessage(
    "settings-page.app-name.placeholder"
  );
  const teamIdPlaceholder = useFormattedMessage(
    "settings-page.team-id.placeholder"
  );
  const labelLoader = useFormattedMessage(
    "settings-page.settings-container.loader"
  );

  /** @type {[ApiErrorType?, (error: ApiErrorType?) => void]} */
  const [apiError, setApiError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  /** @type {PluginConfigMap} */
  const initialConfig = {};
  const [pluginConfig, setPluginConfig] = useState(initialConfig);

  useEffect(() => {
    getConfig()
      .then((response) => {
        setPluginConfig(response.data);
      })
      .catch((error) => {
        console.error(
          "[vercel-deploy] error while retrieving plugin config",
          error
        );
        setPluginConfig({});
        if (error && error.response && error.response.status === 403) {
          setApiError("FORBIDDEN");
        } else {
          setApiError("GENERIC_ERROR");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [setIsLoading, setPluginConfig, setApiError]);

  const deployHook = pluginConfig.deployHook || "";
  const apiToken = pluginConfig.apiToken ? `${pluginConfig.apiToken}[...]` : "";
  const appFilter = pluginConfig.appFilter || "";
  const teamFilter = pluginConfig.teamFilter || "";

  if (isLoading) {
    return (
      <Flex justifyContent="center">
        <Loader>{labelLoader}</Loader>
      </Flex>
    );
  }

  if (apiError) {
    /** @type {EmptyStateType} */
    const emptyStateType =
      apiError === "FORBIDDEN"
        ? "ERROR_AVAILABILITY_FORBIDDEN"
        : "ERROR_CONFIG";

    return (
      <Box padding={8} background="neutral100">
        <DeploymentsEmptyState type={emptyStateType} />
      </Box>
    );
  }

  return (
    <>
      {pluginConfig.map((config) => (
        <>
          <BoxField paddingTop={2} paddingLeft={4}>
            <Typography variant="beta">{config.displayName}</Typography>
          </BoxField>
          <BoxField
            fieldName="vercel-deploy-hook"
            fieldHint={
              <>
                <FormattedMessage labelId="settings-page.deploy-hook.learn-more-intro" />
                <ExternalLink href="https://vercel.com/docs/git/deploy-hooks">
                  <FormattedMessage labelId="settings-page.deploy-hook.learn-more-link-text" />
                </ExternalLink>
              </>
            }
          >
            <Flex direction="column" gap={1}>
              <Typography variant="sigma" textColor="neutral800" as="label" required>
                <FormattedMessage labelId="settings-page.deploy-hook.label" />
              </Typography>
              <TextInput
                type="text"
                placeholder={deployHookPlaceholder}
                value={config.deployHook}
                disabled={true}
                aria-label="Deploy Hook"
              />
            </Flex>
          </BoxField>

          <BoxField
            fieldName="vercel-deploy-api-token"
            fieldHint={
              <>
                <FormattedMessage labelId="settings-page.api-token.learn-more-intro" />
                <ExternalLink href="https://vercel.com/account/tokens">
                  <FormattedMessage labelId="settings-page.api-token.learn-more-link-text" />
                </ExternalLink>
              </>
            }
          >
            <Flex direction="column" gap={1}>
              <Typography variant="sigma" textColor="neutral800" as="label" required>
                <FormattedMessage labelId="settings-page.api-token.label" />
              </Typography>
              <TextInput
                type="text"
                placeholder={apiTokenPlaceholder}
                value={config.apiToken}
                disabled={true}
                aria-label="API Token"
              />
            </Flex>
          </BoxField>

          <BoxField
            fieldName="vercel-deploy-app-name"
            fieldHint={
              <>
                <FormattedMessage labelId="settings-page.app-name.learn-more-intro" />
                <ExternalLink href="https://vercel.com/dashboard">
                  <FormattedMessage labelId="settings-page.app-name.learn-more-link-text" />
                </ExternalLink>
                <FormattedMessage labelId="settings-page.app-name.learn-more-outro" />
              </>
            }
          >
            <Flex direction="column" gap={1}>
              <Typography variant="sigma" textColor="neutral800" as="label">
                <FormattedMessage labelId="settings-page.app-name.label" />
              </Typography>
              <TextInput
                type="text"
                placeholder={appNamePlaceholder}
                value={config.appFilter}
                disabled={true}
                aria-label="App Name"
              />
            </Flex>
          </BoxField>

          <BoxField
            fieldName="vercel-deploy-team-id"
            fieldHint={
              <>
                <FormattedMessage labelId="settings-page.team-id.learn-more-intro" />
                <ExternalLink href="https://vercel.com/dashboard">
                  <FormattedMessage labelId="settings-page.team-id.learn-more-link-text" />
                </ExternalLink>
                <FormattedMessage labelId="settings-page.team-id.learn-more-outro" />
              </>
            }
          >
            <Flex direction="column" gap={1}>
              <Typography variant="sigma" textColor="neutral800" as="label">
                <FormattedMessage labelId="settings-page.team-id.label" />
              </Typography>
              <TextInput
                type="text"
                placeholder={teamIdPlaceholder}
                value={config.teamFilter}
                disabled={true}
                aria-label="Team ID"
              />
            </Flex>
          </BoxField>
          <Divider />
        </>
      ))}
    </>
  );
};

const SettingsPage = () => {
  const headerTitle = useFormattedMessage("settings-page.header.title");
  const headerSubtitle = useFormattedMessage("settings-page.header.subtitle");

  return (
    <>
      <Box background="neutral100">
        <Box paddingBottom={4}>
          <Flex direction="column" gap={2}>
            <Typography variant="alpha" as={"h2"}>
              {headerTitle}
            </Typography>
            {headerSubtitle && (
              <Typography variant="epsilon" textColor="neutral600">
                {headerSubtitle}
              </Typography>
            )}
          </Flex>
        </Box>
      </Box>
      <SettingsContainer />
    </>
  );
};

export default memo(SettingsPage);
