import React from "react";
import { Select, Option } from "@strapi/design-system";

const SitePicker = ({ sites, selectedSite, setSelectedSite }) => {
  const handleChange = (value) => {
    if (value === selectedSite.appFilter) return;

    const changedSite = sites.find((site) => site.appFilter === value);
    setSelectedSite(changedSite);
  };

  return (
    <Select size="M" value={selectedSite.appFilter} onChange={handleChange}>
      {sites.map((site) => (
        <Option key={site.appFilter} value={site.appFilter}>
          {site.displayName}
        </Option>
      ))}
    </Select>
  );
};

export default SitePicker;
