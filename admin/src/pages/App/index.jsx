/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import pluginId from '../../pluginId';
import HomePage from '../HomePage';
import { Page } from "@strapi/strapi/admin";
import { IntlProvider } from 'react-intl';
import en from "../../translations/en.json"
const App = () => {
  return (
    <IntlProvider locale="en" messages={en}>
      <div>
        <Routes>
          <Route path={`/plugins/${pluginId}`} element={<HomePage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </IntlProvider>

  );
};

export default App;
