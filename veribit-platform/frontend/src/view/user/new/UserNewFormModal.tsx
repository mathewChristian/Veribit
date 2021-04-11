import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { i18n } from 'src/i18n';
import Errors from 'src/modules/shared/error/errors';
import UserService from 'src/modules/user/userService';
import UserNewForm from 'src/view/user/new/UserNewForm';

function UserNewFormModal(props) {
  const [saveLoading, setSaveLoading] = useState(false);

  const doSubmit = async (_, data) => {
    try {
      setSaveLoading(true);
      await UserService.create(data);
      const { rows } = await UserService.fetchUsers(
        {
          email: data.emails[0],
        },
        null,
        1,
        0,
      );
      props.onSuccess(rows[0]);
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
          className="relative my-6 mx-auto w-auto"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 rounded-t">
              <div className="text-lg font-semibold">
                {i18n('user.new.titleModal')}
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
            <div className="relative p-6 flex-auto">
              <UserNewForm
                saveLoading={saveLoading}
                onSubmit={doSubmit}
                onCancel={props.onClose}
                modal
                single
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

export default UserNewFormModal;
