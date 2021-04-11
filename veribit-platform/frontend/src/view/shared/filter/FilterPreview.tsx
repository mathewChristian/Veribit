import {
  faChevronDown,
  faChevronRight,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { i18n } from 'src/i18n';

export default function FilterPreview(props) {
  const { values, renders, onClick, onRemove } = props;

  const itemsNotEmpty = Object.keys(values || {})
    .map((key) => {
      if (!renders[key]) {
        return {
          value: null,
        };
      }

      return {
        key: key,
        label: renders[key].label,
        value: renders[key].render(values[key]),
      };
    })
    .filter(
      (item) =>
        item.value ||
        item.value === 0 ||
        item.value === false,
    );

  return (
    <div
      onClick={onClick}
      className={`${
        props.expanded
          ? 'border-gray-200 dark:border-gray-600 border-b mb-4'
          : ''
      } flex items-center justify-between cursor-pointer p-4`}
    >
      {!itemsNotEmpty.length || props.expanded ? (
        <div className="flex items-center  font-medium">
          {i18n('common.filters')}
        </div>
      ) : (
        <div className="flex items-center ">
          <span className="font-medium">
            {i18n('common.filters')}
          </span>
          :
          <span className="ml-2 flex justify-start flex-wrap">
            {itemsNotEmpty.map((item) => (
              <span
                key={item.label}
                className="bg-gray-700 text-white p-1 text-xs rounded-md flex items-center mr-1"
                style={{ cursor: 'default' }}
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                {`${item.label}: ${item.value}`}{' '}
                {onRemove && (
                  <FontAwesomeIcon
                    onClick={
                      onRemove
                        ? () => onRemove(item.key)
                        : undefined
                    }
                    className="text-base rounded-full ml-1 bg-gray-900 cursor-pointer"
                    style={{ padding: 2 }}
                    icon={faTimes}
                  />
                )}
              </span>
            ))}
          </span>
        </div>
      )}

      <div>
        {props.expanded ? (
          <FontAwesomeIcon icon={faChevronRight} />
        ) : (
          <FontAwesomeIcon icon={faChevronDown} />
        )}
      </div>
    </div>
  );
}
