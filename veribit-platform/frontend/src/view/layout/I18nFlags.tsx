import React from 'react';
import { getLanguages } from 'src/i18n';
import actions from 'src/modules/layout/layoutActions';

function I18nFlags(props) {
  const doChangeLanguage = (language) => {
    actions.doChangeLanguage(language);
  };

  return (
    <div className="flex items-center justify-center w-full">
      {getLanguages().map((language) => (
        <img
          className="mr-2 cursor-pointer"
          key={language.id}
          alt={language.label}
          title={language.label}
          src={language.flag}
          onClick={() => doChangeLanguage(language.id)}
        />
      ))}
    </div>
  );
}

export default I18nFlags;
