import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { i18n } from 'src/i18n';
import Errors from 'src/modules/shared/error/errors';
import OrderForm from 'src/view/order/form/OrderForm';
import OrderService from 'src/modules/order/orderService';

function OrderFormModal(props) {
  const [saveLoading, setSaveLoading] = useState(false);

  const doSubmit = async (_, data) => {
    try {
      setSaveLoading(true);
      const { id } = await OrderService.create(data);
      const record = await OrderService.find(id);
      props.onSuccess(record);
    } catch (error) {
      Errors.handle(error);
    } finally {
      setSaveLoading(false);
    }
  };

  return ReactDOM.createPortal(
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        tabIndex={-1}
        onClick={props.onClose}
      >
        <div
          className="relative mx-auto w-auto max-h-screen pt-6 pb-6"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 rounded-t">
              <div className="text-lg font-semibold">
                {i18n('entities.order.new.title')}
              </div>
              <button
                type="button"
                className="ml-auto bg-transparent border-0 text-gray-900 float-right text-lg leading-none font-semibold outline-none focus:outline-none"
                onClick={props.onClose}
              >
                <span className="bg-transparent text-gray-700 h-6 w-6 text-lg block outline-none focus:outline-none">
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </button>
            </div>
            <div className="relative p-6 flex-auto overflow-y-scroll">
              <OrderForm
                saveLoading={saveLoading}
                onSubmit={doSubmit}
                onCancel={props.onClose}
                modal
              />
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>,
    (document as any).getElementById('modal-root'),
  );
}

export default OrderFormModal;
