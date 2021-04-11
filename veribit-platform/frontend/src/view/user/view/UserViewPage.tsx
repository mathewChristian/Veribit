import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/user/view/userViewActions';
import selectors from 'src/modules/user/view/userViewSelectors';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import UserView from 'src/view/user/view/UserView';
import UserViewToolbar from 'src/view/user/view/UserViewToolbar';

function UserViewPage(props) {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const loading = useSelector(selectors.selectLoading);
  const user = useSelector(selectors.selectUser);

  useEffect(() => {
    dispatch(actions.doFind(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('user.menu'), '/user'],
          [i18n('user.view.title')],
        ]}
      />

      <div className="mt-4 p-6 bg-white dark:bg-gray-800 dark:border-gray-800 text-gray-900 dark:text-gray-200 border-gray-200 border rounded-md">
        <h1 className="text-lg font-medium mb-6">
          {i18n('user.view.title')}
        </h1>

        <UserViewToolbar match={match} />

        <UserView loading={loading} user={user} />
      </div>
    </>
  );
}

export default UserViewPage;
