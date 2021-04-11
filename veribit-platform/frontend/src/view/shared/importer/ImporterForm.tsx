import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import {
  EXCEL_EXTENSION,
  EXCEL_TYPE,
} from 'src/modules/shared/excel/excel';

export default (selectors, actions) => {
  function ImporterForm() {
    const dispatch = useDispatch();

    const errorMessage: string = useSelector(
      selectors.selectErrorMessage,
    );

    const input = useRef(null);

    const handleChange = (event) => {
      const files = event.target.files;

      if (!files || !files.length) {
        return;
      }

      let file = files[0];

      dispatch(actions.doReadFile(file));
    };

    return (
      <div>
        <label
          className="inline-block cursor-pointer text-sm mb-2 disabled:opacity-50 disabled:cursor-default px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          style={{ cursor: 'pointer' }}
        >
          <FontAwesomeIcon className="mr-2" icon={faPlus} />
          {i18n('fileUploader.upload')}
          <input
            style={{ display: 'none' }}
            accept={`${EXCEL_TYPE}, ${EXCEL_EXTENSION}`}
            type="file"
            onChange={handleChange}
            ref={input}
          />
        </label>
        <div className="text-red-600 text-sm mt-2">
          {errorMessage}
        </div>
      </div>
    );
  }

  return ImporterForm;
};
