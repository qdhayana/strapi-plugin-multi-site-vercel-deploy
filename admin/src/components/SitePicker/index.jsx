import React from "react";
import { Select, Option } from "@strapi/design-system";
import {
  SingleSelect,
  SingleSelectOption,
} from '@strapi/design-system';
const SitePicker = ({ sites, selectedSite, setSelectedSite }) => {
  const handleChange = (value) => {
    if (value === selectedSite.appFilter) return;

    const changedSite = sites.find((site) => site.appFilter === value);
    setSelectedSite(changedSite);
  };

  return (
    <SingleSelect size="M" value={selectedSite.appFilter} onChange={handleChange}>
      {sites.map((site) => (
        <SingleSelectOption key={site.appFilter} value={site.appFilter}>
          {site.displayName}
        </SingleSelectOption>
      ))}
    </SingleSelect>
  );
};

export default SitePicker;
