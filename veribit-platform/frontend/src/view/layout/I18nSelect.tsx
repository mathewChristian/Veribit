import React from 'react';
import { getLanguages, getLanguageCode } from 'src/i18n';
import actions from 'src/modules/layout/layoutActions';

function I18nSelect(props) {
  const doChangeLanguage = (language) => {
    actions.doChangeLanguage(language);
  };

  return (
    <select
      className="cursor-pointer inline-block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
      value={getLanguageCode()}
      onChange={(event) =>
        doChangeLanguage(event.target.value)
      }
    >
      {getLanguages().map((language) => (
        <option key={language.id} value={language.id}>
          {language.label}
        </option>
      ))}
    </select>
  );
}

export default I18nSelect;
