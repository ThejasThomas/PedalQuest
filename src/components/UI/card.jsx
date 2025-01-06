import React from "react";
import PropTypes from "prop-types";

export const Card = ({ children, className }) => {
  return (
    <div className={`border rounded-lg shadow-sm p-4 bg-white ${className}`}>
      {children}
    </div>
  );
};

export const CardContent = ({ children, className }) => {
  return (
    <div className={`p-2 ${className}`}>
      {children}
    </div>
  );
};

// Proptypes for validation
Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

CardContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
