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

const SettingsApp = () => {
  return (
    <div>
      <Routes>
        <Route path={`/settings/${pluginId}`} element={<SettingsPage />} />
        <Route path="*" element={<Page.NoData />} />
      </Routes>
    </div>
  );
};

export default SettingsApp;
