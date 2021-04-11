import {
  faPlus,
  faSearch,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { i18n } from 'src/i18n';
import Errors from 'src/modules/shared/error/errors';
import FileUploader from 'src/modules/shared/fileUpload/fileUploader';
import ImageModal from 'src/view/shared/modals/ImageModal';

function ImagesUploader(props) {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<any>(null);
  const input = useRef<any>();
  const [mouseOver, setMouseOver] = useState(null);

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
        image: true,
      });

      setLoading(true);

      file = await FileUploader.upload(file, {
        storage: props.storage,
        image: true,
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

  const doPreviewImage = (image) => {
    setImage({
      src: image.downloadUrl,
      alt: image.name,
    });
  };

  const doCloseImageModal = () => {
    setImage(null);
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
        accept="image/*"
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
        <div className="mt-2 flex flex-row flex-wrap">
          {value().map((item) => {
            return (
              <div
                className="mr-2 mb-2 rounded-md"
                style={{ height: '100px' }}
                key={item.id}
                onMouseEnter={() => setMouseOver(item.id)}
                onMouseLeave={() => setMouseOver(null)}
              >
                <img
                  alt={item.name}
                  src={item.downloadUrl}
                  className="rounded-md"
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                  }}
                />

                <div
                  className="relative rounded-b-md text-center"
                  style={{
                    display:
                      mouseOver === item.id
                        ? 'block'
                        : 'none',
                    bottom: '1.5rem',
                    width: '100px',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  }}
                >
                  <button
                    type="button"
                    className="text-white"
                    onClick={() => doPreviewImage(item)}
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </button>

                  {!readonly && (
                    <button
                      type="button"
                      className="text-white ml-2"
                      onClick={() => handleRemove(item.id)}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      {image && (
        <ImageModal
          src={image.src}
          alt={image.alt}
          onClose={() => doCloseImageModal()}
        />
      )}
    </div>
  );
}

ImagesUploader.propTypes = {
  readonly: PropTypes.bool,
  max: PropTypes.number,
  storage: PropTypes.object,
  value: PropTypes.any,
  onChange: PropTypes.func,
};

export default ImagesUploader;
