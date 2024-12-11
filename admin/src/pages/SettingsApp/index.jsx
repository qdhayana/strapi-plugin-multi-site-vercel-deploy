/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from "react";
import { Routes, Route } from "react-router-dom";
import pluginId from "../../pluginId";
import SettingsPage from "../SettingsPage";
import { Page } from "@strapi/strapi/admin";
import { IntlProvider } from 'react-intl';

const SettingsApp = () => {
  return (
    <IntlProvider locale="en">
      <div>
        <Routes>
          <Route path={`/settings/${pluginId}`} element={<SettingsPage />} />
          <Route path="*" element={<SettingsPage />} />
        </Routes>
      </div>
    </IntlProvider>

  );
};

export default SettingsApp;
