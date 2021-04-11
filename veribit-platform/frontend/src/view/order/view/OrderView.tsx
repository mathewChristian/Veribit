import React from 'react';
import { i18n } from 'src/i18n';
import Spinner from 'src/view/shared/Spinner';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import UserViewItem from 'src/view/user/view/UserViewItem';
import FilesViewItem from 'src/view/shared/view/FilesViewItem';
import CustomerViewItem from 'src/view/customer/view/CustomerViewItem';
import ProductViewItem from 'src/view/product/view/ProductViewItem';

function OrderView(props) {
  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return (
    <div>
      <CustomerViewItem
        label={i18n('entities.order.fields.customer')}
        value={record.customer}
      />

      <ProductViewItem
        label={i18n('entities.order.fields.products')}
        value={record.products}
      />

      <UserViewItem
        label={i18n('entities.order.fields.employee')}
        value={record.employee}
      />

      <TextViewItem
        label={i18n('entities.order.fields.delivered')}
        value={
          record.delivered
            ? i18n('common.yes')
            : i18n('common.no')
        }
      />

      <FilesViewItem
        label={i18n(
          'entities.order.fields.attachments',
        )}
        value={record.attachments}
      />
    </div>
  );
}

export default OrderView;
