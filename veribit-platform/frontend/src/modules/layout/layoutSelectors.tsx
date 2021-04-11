import { createSelector } from 'reselect';

const selectRaw = (state) => state.layout;

const selectMenuVisible = createSelector(
  [selectRaw],
  (layout) => Boolean(layout.menuVisible),
);

const selectDarkMode = createSelector(
  [selectRaw],
  (layout) => Boolean(layout.darkMode),
);

const selectLoading = createSelector(
  [selectRaw],
  (layout) => Boolean(layout.loading),
);

const selectLanguage = createSelector(
  [selectRaw],
  (layout) => layout.language,
);

const layoutSelectors = {
  selectRaw,
  selectMenuVisible,
  selectLoading,
  selectLanguage,
  selectDarkMode,
};

export default layoutSelectors;
