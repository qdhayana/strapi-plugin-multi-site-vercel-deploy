/**
 *
 * FormattedMessage
 *
 */

import React from "react";

import { Typography } from "@strapi/design-system";


/**
 * @typedef {import('./typedefs').Props} Props
 */

/**
 * Displays a translated message
 * @param {Props} props
 * @returns {JSX.Element}
 */
const FormattedMessage = ({ labelId, variant, textColor }) => {
  const label = labelId;

  if (variant || textColor) {
    return (
      <Typography variant={variant} textColor={textColor}>
        {label}
      </Typography>
    );
  }

  return label;
};

export default FormattedMessage;
