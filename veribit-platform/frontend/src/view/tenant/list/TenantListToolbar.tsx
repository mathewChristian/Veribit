import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';

function TenantToolbar(props) {
  return (
    <div className="mb-4">
      <Link to="/tenant/new">
        <button
          className="mb-2 mr-2 text-sm disabled:opacity-50 disabled:cursor-default px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          type="button"
        >
          <FontAwesomeIcon className="mr-2" icon={faPlus} />
          {i18n('common.new')}
        </button>
      </Link>
    </div>
  );
}

export default TenantToolbar;
