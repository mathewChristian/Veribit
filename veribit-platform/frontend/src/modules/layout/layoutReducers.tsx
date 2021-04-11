import actions from 'src/modules/layout/layoutActions';
import { getLanguageCode } from 'src/i18n';
import LayoutDarkMode from 'src/modules/layout/layoutDarkMode';

const initialData = {
  menuVisible: true,
  language: getLanguageCode(),
  loading: false,
  darkMode: LayoutDarkMode.get(),
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.DARK_MODE_CHANGE) {
    LayoutDarkMode.set(payload);

    return {
      ...state,
      darkMode: payload,
    };
  }

  if (type === actions.MENU_TOGGLE) {
    return {
      ...state,
      menuVisible: !state.menuVisible,
    };
  }

  if (type === actions.MENU_SHOW) {
    return {
      ...state,
      menuVisible: true,
    };
  }

  if (type === actions.MENU_HIDE) {
    return {
      ...state,
      menuVisible: false,
    };
  }

  return state;
};
