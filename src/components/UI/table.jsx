// table.jsx
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Table = ({ children, className }) => (
  <div className={classNames('overflow-x-auto', className)}>
    <table className="min-w-full divide-y divide-gray-200">{children}</table>
  </div>
);

export const TableHeader = ({ children, className }) => (
  <thead className={classNames('bg-gray-50', className)}>{children}</thead>
);

export const TableHead = ({ children, className }) => (
  <th className={classNames(
    'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
    className
  )}>
    {children}
  </th>
);

export const TableRow = ({ children, className }) => (
  <tr className={className}>{children}</tr>
);

export const TableBody = ({ children, className }) => (
  <tbody className={className}>{children}</tbody>
);

export const TableCell = ({ children, className }) => (
  <td className={classNames('px-6 py-4 whitespace-nowrap text-sm text-gray-900', className)}>
    {children}
  </td>
);

// PropTypes
Table.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

TableHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

TableHead.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

TableRow.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

TableBody.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

TableCell.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};