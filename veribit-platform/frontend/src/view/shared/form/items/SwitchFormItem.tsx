import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import FormErrors from 'src/view/shared/form/formErrors';
import { v4 as uuid } from 'uuid';

function SwitchFormItem(props) {
  const [inputId] = useState(uuid());

  const {
    label,
    name,
    hint,
    required,
    externalErrorMessage,
  } = props;

  const {
    register,
    errors,
    formState: { touched, isSubmitted },
  } = useFormContext();

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
          htmlFor={inputId}
        >
          {label}{' '}
          {required ? (
            <span className="text-sm text-red-400">*</span>
          ) : null}
        </label>
      )}

      <div className="mt-1">
        <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
          <input
            type="checkbox"
            id={inputId}
            name={name}
            ref={register}
            onChange={(event) => {
              props.onChange &&
                props.onChange(event.target.checked);
            }}
            onBlur={(event) => {
              props.onBlur && props.onBlur(event);
            }}
            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
          />
          <label
            htmlFor={inputId}
            className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
          ></label>
        </div>
      </div>

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

SwitchFormItem.defaultProps = {};

SwitchFormItem.propTypes = {
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  label: PropTypes.string,
  hint: PropTypes.string,
  externalErrorMessage: PropTypes.string,
};

export default SwitchFormItem;
