import {
  faDownload,
  faPlus,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { i18n } from 'src/i18n';
import Errors from 'src/modules/shared/error/errors';
import FileUploader from 'src/modules/shared/fileUpload/fileUploader';

function FilesUploader(props) {
  const [loading, setLoading] = useState(false);
  const input = useRef<any>();

  const value = () => {
    const { value } = props;

    if (!value) {
      return [];
    }

    return Array.isArray(value) ? value : [value];
  };

  const fileList = () => {
    return value().map((item) => ({
      uid: item.id || undefined,
      name: item.name,
      status: 'done',
      url: item.downloadUrl,
    }));
  };

  const handleRemove = (id) => {
    props.onChange(
      value().filter((item) => item.id !== id),
    );
  };

  const handleChange = async (event) => {
    try {
      const files = event.target.files;

      if (!files || !files.length) {
        return;
      }

      let file = files[0];

      FileUploader.validate(file, {
        storage: props.storage,
        formats: props.formats,
      });

      setLoading(true);

      file = await FileUploader.upload(file, {
        storage: props.storage,
        formats: props.formats,
      });

      input.current.value = '';

      setLoading(false);
      props.onChange([...value(), file]);
    } catch (error) {
      input.current.value = '';
      console.error(error);
      setLoading(false);
      Errors.showMessage(error);
    }
  };

  const formats = () => {
    const { schema } = props;

    if (schema && schema.formats) {
      return schema.formats
        .map((format) => `.${format}`)
        .join(',');
    }

    return undefined;
  };

  const { max, readonly } = props;

  const uploadButton = (
    <label
      className={`${
        loading
          ? 'opacity-50 cursor-default'
          : 'cursor-pointer'
      } inline-block mt-2 mb-2 text-sm px-4 py-2 tracking-wide dark:border-gray-800 dark:bg-gray-800 dark:hover:bg-gray-600 dark:text-white text-gray-700 border border-gray-300 transition-colors duration-200 transform bg-white rounded-md hover:bg-gray-100 focus:outline-none focus:bg-gray-100`}
    >
      <FontAwesomeIcon className="mr-2" icon={faPlus} />
      {i18n('fileUploader.upload')}
      <input
        style={{ display: 'none' }}
        disabled={loading || readonly}
        accept={formats()}
        type="file"
        onChange={handleChange}
        ref={input}
      />
    </label>
  );

  return (
    <div>
      {readonly || (max && fileList().length >= max)
        ? null
        : uploadButton}

      {value() && value().length ? (
        <div>
          {value().map((item) => {
            return (
              <div
                className="flex items-center"
                key={item.id}
              >
                <div className="flex items-center text-blue-500 dark:text-blue-400 focus:text-blue-400 hover:text-blue-400">
                  <a
                    href={item.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    <FontAwesomeIcon
                      className="text-sm mr-1"
                      icon={faDownload}
                    />
                    {item.name}
                  </a>
                </div>

                {!readonly && (
                  <button
                    type="button"
                    className="ml-3"
                    onClick={() => handleRemove(item.id)}
                    title={i18n('common.destroy')}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

FilesUploader.propTypes = {
  readonly: PropTypes.bool,
  max: PropTypes.number,
  formats: PropTypes.arrayOf(PropTypes.string),
  storage: PropTypes.object,
  value: PropTypes.any,
  onChange: PropTypes.func,
};

export default FilesUploader;
