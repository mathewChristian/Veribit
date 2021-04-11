import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import ImagesUploader from 'src/view/shared/uploaders/ImagesUploader';
import { useFormContext } from 'react-hook-form';
import FormErrors from 'src/view/shared/form/formErrors';

function ImagesFormItem(props) {
  const {
    label,
    name,
    hint,
    storage,
    max,
    required,
    externalErrorMessage,
  } = props;

  const {
    errors,
    formState: { touched, isSubmitted },
    setValue,
    watch,
    register,
  } = useFormContext();

  useEffect(() => {
    register({ name });
  }, [register, name]);

  const errorMessage = FormErrors.errorMessage(
    name,
    errors,
    touched,
    isSubmitted,
    externalErrorMessage,
  );

  return (
    <div>
      {Boolean(label) && (
        <label
          className={`block text-sm text-gray-800 dark:text-gray-200`}
        >
          {label}{' '}
          {required ? (
            <span className="text-sm text-red-400">*</span>
          ) : null}
        </label>
      )}

      <ImagesUploader
        storage={storage}
        value={watch(name)}
        onChange={(value) => {
          setValue(name, value, { shouldValidate: true });
          props.onChange && props.onChange(value);
        }}
        max={max}
      />

      <div className="text-red-600 text-sm mt-2">
        {errorMessage}
      </div>
      {Boolean(hint) && (
        <div className="text-gray-500 text-sm mt-2">
          {hint}
        </div>
      )}
    </div>
  );
}

ImagesFormItem.defaultProps = {
  max: undefined,
  required: false,
};

ImagesFormItem.propTypes = {
  storage: PropTypes.object.isRequired,
  max: PropTypes.number,

  required: PropTypes.bool,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  hint: PropTypes.string,
  formItemProps: PropTypes.object,
};

export default ImagesFormItem;
