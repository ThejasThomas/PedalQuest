// FilterButton.jsx
import React from 'react';
import PropTypes from 'prop-types';

export function FilterButton({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm rounded-lg transition-colors ${
        active ? 'bg-blue-500 text-white' : 'bg-white/10 text-white'
      } hover:bg-white/20`}
    >
      {children}
    </button>
  );
}

FilterButton.propTypes = {
  children: PropTypes.node.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};
