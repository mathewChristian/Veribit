import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

function Breadcrumb(props) {
  const isLink = (item) => {
    return item.length > 1;
  };
  return (
    <ol className="text-sm flex items-center">
      {props.items.map((item, index) => {
        const isFirst = index === 0;
        const isLast = props.items.length - 1 === index;

        return (
          <li
            key={item[0]}
            className={`${
              isLast
                ? 'text-gray-800 dark:text-white'
                : 'text-gray-500 dark:text-gray-200 mr-2'
            }`}
          >
            {!isFirst && (
              <FontAwesomeIcon
                className="mr-2 font-normal text-gray-400 dark:text-gray-200"
                icon={faChevronRight}
              />
            )}
            {isLink(item) ? (
              <Link
                className="hover:underline"
                to={item[1]}
              >
                {item[0]}
              </Link>
            ) : (
              item[0]
            )}
          </li>
        );
      })}
    </ol>
  );
}

export default Breadcrumb;
