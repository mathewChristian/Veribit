import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import authActions from 'src/modules/auth/authActions';
import authSelectors from 'src/modules/auth/authSelectors';
import layoutActions from 'src/modules/layout/layoutActions';
import { getHistory } from 'src/modules/store';
import I18nSelect from 'src/view/layout/I18nSelect';
import Avatar from 'src/view/shared/Avatar';
import config from 'src/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faBars,
  faLock,
  faMoon,
  faSignOutAlt,
  faThLarge,
  faCode,
} from '@fortawesome/free-solid-svg-icons';
import { Menu } from '@headlessui/react';
import layoutSelectors from 'src/modules/layout/layoutSelectors';

function Header(props) {
  const dispatch = useDispatch();

  const doToggleMenu = () => {
    dispatch(layoutActions.doToggleMenu());
  };

  const darkMode = useSelector(
    layoutSelectors.selectDarkMode,
  );

  const userText = useSelector(
    authSelectors.selectCurrentUserNameOrEmailPrefix,
  );
  const userAvatar = useSelector(
    authSelectors.selectCurrentUserAvatar,
  );
  const currentTenant = useSelector(
    authSelectors.selectCurrentTenant,
  );

  const doSignout = () => {
    dispatch(authActions.doSignout());
  };

  const doNavigateToProfile = () => {
    getHistory().push('/profile');
  };

  const doNavigateToPasswordChange = () => {
    getHistory().push('/password-change');
  };

  const doNavigateToTenants = () => {
    getHistory().push('/tenant');
  };

  return (
    <nav className="bg-white shadow dark:bg-gray-800">
      <div className="px-6 py-3">
        <div className="md:flex md:items-center md:justify-between">
          <div className="w-full flex items-center justify-between">
            <div className="text-xl font-semibold text-gray-700">
              <button
                className="focus:outline-none text-xl font-bold text-gray-700 dark:text-white md:text-2xl hover:text-gray-700 dark:hover:text-gray-300"
                onClick={doToggleMenu}
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
            </div>

            <div className="flex items-center mt-0">
              <div className="mr-6">
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input
                    type="checkbox"
                    name="darkMode"
                    id="darkMode"
                    checked={darkMode}
                    onChange={(event) =>
                      dispatch(
                        layoutActions.doDarkModeChange(
                          event.target.checked,
                        ),
                      )
                    }
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  />
                  <label
                    htmlFor="darkMode"
                    className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                  ></label>
                </div>
                <label
                  htmlFor="darkMode"
                  className="text-xs text-gray-700 dark:text-white"
                >
                  <FontAwesomeIcon icon={faMoon} />
                </label>
              </div>
              <div className="mr-6 md:block lg:block hidden">
                <I18nSelect />
              </div>

              <Menu>
                <Menu.Button className="flex items-center focus:outline-none">
                  <Avatar
                    size="small"
                    src={userAvatar || undefined}
                    alt="avatar"
                  />

                  <div className="text-left mx-2 text-sm font-medium text-gray-700 dark:text-gray-200 hidden md:block lg:block">
                    {userText}
                    {[
                      'multi',
                      'multi-with-subdomain',
                    ].includes(config.tenantMode) && (
                      <div className="text-xs font-medium">
                        {currentTenant &&
                          currentTenant.name}
                      </div>
                    )}
                  </div>
                </Menu.Button>

                <Menu.Items>
                  <div className="absolute right-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-xl dark:bg-gray-800">
                    <Menu.Item>
                      <button
                        onClick={doNavigateToProfile}
                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 transform dark:text-gray-200 hover:bg-blue-500 hover:text-white dark:hover:text-white"
                        type="button"
                      >
                        <FontAwesomeIcon
                          className="mr-2"
                          icon={faUser}
                        />
                        {i18n('auth.profile.title')}
                      </button>
                    </Menu.Item>
                    <Menu.Item>
                      <button
                        onClick={doNavigateToPasswordChange}
                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 transform dark:text-gray-200 hover:bg-blue-500 hover:text-white dark:hover:text-white"
                        type="button"
                      >
                        <FontAwesomeIcon
                          className="mr-2"
                          icon={faLock}
                        />
                        {i18n('auth.passwordChange.title')}
                      </button>
                    </Menu.Item>
                    {[
                      'multi',
                      'multi-with-subdomain',
                    ].includes(config.tenantMode) && (
                      <Menu.Item>
                        <button
                          onClick={doNavigateToTenants}
                          className="w-full text-left block px-4 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 transform dark:text-gray-200 hover:bg-blue-500 hover:text-white dark:hover:text-white"
                          type="button"
                        >
                          <FontAwesomeIcon
                            className="mr-2"
                            icon={faThLarge}
                          />
                          {i18n('auth.tenants')}
                        </button>
                      </Menu.Item>
                    )}
                    {config.apiDocumentationUrl && (
                      <Menu.Item>
                        <a
                          href={config.apiDocumentationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full text-left block px-4 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 transform dark:text-gray-200 hover:bg-blue-500 hover:text-white dark:hover:text-white"
                        >
                          <FontAwesomeIcon
                            className="mr-2"
                            icon={faCode}
                          />
                          {i18n('api.menu')}
                        </a>
                      </Menu.Item>
                    )}
                    <Menu.Item>
                      <button
                        onClick={doSignout}
                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 transform dark:text-gray-200 hover:bg-blue-500 hover:text-white dark:hover:text-white"
                        type="button"
                      >
                        <FontAwesomeIcon
                          className="mr-2"
                          icon={faSignOutAlt}
                        />
                        {i18n('auth.signout')}
                      </button>
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
