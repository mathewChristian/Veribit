import {
  faSortDown,
  faSortUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

const TableColumnHeaderStyled = styled.th`
  cursor: pointer;
  opacity: 1;
  transition: opacity 0.15s ease-in;

  &:hover,
  &:focus {
    opacity: 0.5;
    transition: opacity 0.15s ease-in;
  }

  &:active {
    opacity: 0.8;
    transition: opacity 0.15s ease-out;
  }
`;

const TableColumnHeader = (props) => {
  const {
    sorter,
    onSort,
    name,
    label,
    hasRows,
    children,
    align = 'left',
  } = props;

  if (!hasRows || !onSort) {
    return (
      <th
        className={`${
          props.className || ''
        } whitespace-nowrap align-middle px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200  text-xs font-semibold text-gray-600 uppercase tracking-wider`}
        style={{ textAlign: align }}
        scope="col"
      >
        {children || label || ''}
      </th>
    );
  }

  return (
    <TableColumnHeaderStyled
      onClick={() => onSort(name)}
      className={`${
        props.className || ''
      } whitespace-nowrap align-middle px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 uppercase tracking-wider`}
      style={{ textAlign: align }}
      scope="col"
    >
      <div
        className="flex"
        style={{
          justifyContent:
            align === 'right'
              ? 'flex-end'
              : align === 'center'
              ? 'center'
              : 'flex-start',
        }}
      >
        {children || label || ''}

        {sorter.field === name &&
          sorter.order === 'descend' && (
            <FontAwesomeIcon
              className="ml-2"
              icon={faSortUp}
            />
          )}
        {sorter.field === name &&
          sorter.order === 'ascend' && (
            <FontAwesomeIcon
              className="ml-2"
              icon={faSortDown}
            />
          )}
      </div>
    </TableColumnHeaderStyled>
  );
};

export default TableColumnHeader;
