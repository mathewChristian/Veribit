export default class LayoutDarkMode {
  static get() {
    return (
      sessionStorage.getItem('darkMode') === 'true' || false
    );
  }

  static set(isDarkMode) {
    sessionStorage.setItem(
      'darkMode',
      String(Boolean(isDarkMode)),
    );
  }

  static clear() {
    sessionStorage.removeItem('darkMode');
  }
}
