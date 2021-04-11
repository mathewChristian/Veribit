import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import FormErrors from 'src/view/shared/form/formErrors';
import Select from 'react-select';
import { i18n } from 'src/i18n';
import { useFormContext } from 'react-hook-form';
import _uniqBy from 'lodash/uniqBy';
import { useSelector } from 'react-redux';
import layoutSelectors from 'src/modules/layout/layoutSelectors';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import selectControlStyles from 'src/view/shared/form/items/selectControlStyles';
import { v4 as uuid } from 'uuid';
function AutocompleteInMemoryFormItem(props) {
  const [inputId] = useState(uuid());

  const {
    errors,
    watch,
    setValue,
    register,
    formState: { touched, isSubmitted },
  } = useFormContext();

  const {
    label,
    name,
    hint,
    placeholder,
    autoFocus,
    externalErrorMessage,
    mode,
    required,
    isClearable,
    mapper,
    fetchFn,
  } = props;

  const originalValue = watch(name);

  const isDarkMode = useSelector(
    layoutSelectors.selectDarkMode,
  );

  const [fullDataSource, setFullDataSource] = useState<
    Array<any>
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    register({ name });
  }, [register, name]);

  useEffect(() => {
    const fetchAllResults = async () => {
      setLoading(true);

      try {
        let fullDataSource = await fetchFn();

        fullDataSource = fullDataSource.map((data) =>
          mapper.toAutocomplete(data),
        );

        setFullDataSource(fullDataSource);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setFullDataSource([]);
        setLoading(false);
        return [];
      }
    };

    fetchAllResults().then(() => {});
    // eslint-disable-next-line
  }, []);

  const prioritizeFromDataSource = (selected) => {
    return (
      (fullDataSource || []).find(
        (item) => item.value === selected.value,
      ) || selected
    );
  };

  const value = () => {
    if (mode === 'multiple') {
      return valueMultiple();
    } else {
      return valueOne();
    }
  };

  const valueMultiple = () => {
    if (originalValue) {
      return originalValue.map((value) =>
        prioritizeFromDataSource(
          mapper.toAutocomplete(value),
        ),
      );
    }

    return [];
  };

  const valueOne = () => {
    if (originalValue) {
      return prioritizeFromDataSource(
        mapper.toAutocomplete(originalValue),
      );
    }

    return null;
  };

  const handleSelect = (value) => {
    if (mode === 'multiple') {
      return handleSelectMultiple(value);
    } else {
      return handleSelectOne(value);
    }
  };

  const handleSelectMultiple = (values) => {
    if (!values) {
      setValue(name, [], { shouldValidate: true });
      props.onChange && props.onChange([]);
      return;
    }

    const newValue = values.map((value) =>
      mapper.toValue(value),
    );
    setValue(name, newValue, { shouldValidate: true });
    props.onChange && props.onChange(newValue);
  };

  const handleSelectOne = (value) => {
    if (!value) {
      setValue(name, null, { shouldValidate: true });
      props.onChange && props.onChange(null);
      return;
    }

    const newValue = mapper.toValue(value);
    setValue(name, newValue, { shouldValidate: true });
    props.onChange && props.onChange(newValue);
  };

  const options = () => {
    const { mode } = props;

    if (!fullDataSource) {
      return [];
    }

    if (value()) {
      if (mode === 'multiple') {
        return _uniqBy(
          [...fullDataSource, ...value()],
          'value',
        );
      } else {
        return _uniqBy(
          [...fullDataSource, value()],
          'value',
        );
      }
    }

    return fullDataSource;
  };

  const hintOrLoading = loading
    ? i18n('autocomplete.loading')
    : hint;

  const errorMessage = FormErrors.errorMessage(
    name,
    errors,
    touched,
    isSubmitted,
    externalErrorMessage,
  );

  const controlStyles = selectControlStyles(
    isDarkMode,
    Boolean(errorMessage),
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
      <div style={{ display: 'flex' }}>
        <Select
          className="w-full mt-2"
          styles={controlStyles}
          id={inputId}
          name={name}
          isMulti={mode === 'multiple' ? true : false}
          placeholder={placeholder || ''}
          autoFocus={autoFocus || undefined}
          onChange={handleSelect}
          value={value()}
          isClearable={isClearable}
          options={options()}
          onBlur={(event) => {
            props.onBlur && props.onBlur(event);
          }}
          loadingMessage={() =>
            i18n('autocomplete.loading')
          }
          noOptionsMessage={() =>
            i18n('autocomplete.noOptions')
          }
        />

        {props.showCreate && props.hasPermissionToCreate ? (
          <button
            className="mt-2 ml-2 flex-shrink-0 text-sm disabled:opacity-50 disabled:cursor-default px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            type="button"
            onClick={props.onOpenModal}
            style={{ height: 42 }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        ) : null}
      </div>

      <div className="text-red-600 text-sm mt-2">
        {errorMessage}
      </div>
      {Boolean(hintOrLoading) && (
        <div className="text-gray-500 text-sm mt-2">
          {hintOrLoading}
        </div>
      )}
    </div>
  );
}

AutocompleteInMemoryFormItem.defaultProps = {
  isClearable: true,
  mode: 'default',
  required: false,
};

AutocompleteInMemoryFormItem.propTypes = {
  fetchFn: PropTypes.func.isRequired,
  mapper: PropTypes.object.isRequired,
  required: PropTypes.bool,
  mode: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  hint: PropTypes.string,
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,
  externalErrorMessage: PropTypes.string,
  isClearable: PropTypes.bool,
  showCreate: PropTypes.bool,
  hasPermissionToCreate: PropTypes.bool,
};

export default AutocompleteInMemoryFormItem;
