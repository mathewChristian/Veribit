import React from 'react';
import { Link } from 'react-router-dom';
import ErrorWrapper from 'src/view/shared/errors/styles/ErrorWrapper';
import { i18n } from 'src/i18n';

const Error403Page = () => {
  return (
    <ErrorWrapper>
      <div className="exception">
        <div className="imgBlock">
          <div
            className="imgEle"
            style={{
              backgroundImage: `url(/images/403.svg)`,
            }}
          />
        </div>
        <div className="content">
          <h1>403</h1>
          <div className="desc">{i18n('errors.403')}</div>
          <div className="actions">
            <Link to="/">
              <button
                className="text-sm disabled:opacity-50 disabled:cursor-default px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                type="button"
              >
                {i18n('errors.backToHome')}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </ErrorWrapper>
  );
};

export default Error403Page;
