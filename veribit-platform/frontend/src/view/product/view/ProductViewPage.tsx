import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/product/view/productViewActions';
import selectors from 'src/modules/product/view/productViewSelectors';
import ProductView from 'src/view/product/view/ProductView';
import ProductViewToolbar from 'src/view/product/view/ProductViewToolbar';
import Breadcrumb from 'src/view/shared/Breadcrumb';

function ProductPage() {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const loading = useSelector(selectors.selectLoading);
  const record = useSelector(selectors.selectRecord);

  useEffect(() => {
    dispatch(actions.doFind(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.product.menu'), '/product'],
          [i18n('entities.product.view.title')],
        ]}
      />

      <div className="mt-4 p-6 bg-white dark:bg-gray-800 dark:border-gray-800 text-gray-900 dark:text-gray-200 border-gray-200 border rounded-md">
        <h1 className="text-lg font-medium mb-6">
          {i18n('entities.product.view.title')}
        </h1>

        <ProductViewToolbar match={match} />

        <ProductView loading={loading} record={record} />
      </div>
    </>
  );
}

export default ProductPage;
