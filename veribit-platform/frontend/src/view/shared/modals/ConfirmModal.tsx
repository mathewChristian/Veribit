import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ReactDOM from 'react-dom';

const ConfirmModal = (props) => {
  return ReactDOM.createPortal(
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        tabIndex={-1}
        onClick={props.onClose}
      >
        <div
          className="relative my-6 mx-auto w-96"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 rounded-t">
              <div className="text-lg font-semibold">
                {props.title}
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
            <div className="flex items-center justify-end p-6 rounded-b">
              <button
                type="button"
                className="mr-2 text-sm disabled:opacity-50 disabled:cursor-default px-4 py-2 tracking-wide dark:border-gray-800 dark:bg-gray-800 dark:hover:bg-gray-600 dark:text-white text-gray-700 border border-gray-300 transition-colors duration-200 transform bg-white rounded-md hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                onClick={props.onClose}
              >
                {props.cancelText}
              </button>
              <button
                type="button"
                onClick={props.onConfirm}
                className="text-sm disabled:opacity-50 disabled:cursor-default px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              >
                {props.okText}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>,
    (document as any).getElementById('modal-root'),
  );
};

export default ConfirmModal;
