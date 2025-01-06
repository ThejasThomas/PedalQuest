// @/components/ui/alert.jsx
import React from "react";
import PropTypes from "prop-types";
import { cn } from "../../utils/classNames"; // Utility for conditional class names if needed.

const Alert = ({ type = "info", message = "Default alert message", className, ...props }) => {
  const alertStyles = {
    info: "bg-blue-100 text-blue-800 border-blue-300",
    success: "bg-green-100 text-green-800 border-green-300",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-300",
    error: "bg-red-100 text-red-800 border-red-300",
  };

  return (
    <div
      className={cn(
        "p-4 rounded-md border-l-4",
        alertStyles[type] || alertStyles.info,
        className
      )}
      role="alert"
      {...props}
    >
      {message}
    </div>
  );
};

const AlertDescription = ({ children, className, ...props }) => {
  return (
    <p
      className={cn("text-sm text-gray-700 mt-2", className)}
      {...props}
    >
      {children}
    </p>
  );
};

Alert.propTypes = {
  type: PropTypes.oneOf(["info", "success", "warning", "error"]),
  message: PropTypes.string, // Optional since we set a default value
  className: PropTypes.string,
};

AlertDescription.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

// Export both components
export { Alert, AlertDescription };
