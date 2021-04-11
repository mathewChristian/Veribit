import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { i18n } from 'src/i18n';
import authSelectors from 'src/modules/auth/authSelectors';
import actions from 'src/modules/plan/planActions';
import selectors from 'src/modules/plan/planSelectors';
import Plans from 'src/security/plans';

export default function PlanCardPaid(props) {
  const dispatch = useDispatch();
  const { plan } = props;

  const currentTenant = useSelector(
    authSelectors.selectCurrentTenant,
  );

  const loading = useSelector(selectors.selectLoading);

  const hasPermissionToEdit = useSelector(
    selectors.selectPermissionToEdit,
  );

  const isPlanUser = useSelector(
    selectors.selectIsPlanUser,
  );

  const isCurrentPlan = currentTenant.plan === plan;

  const buttonState = isCurrentPlan
    ? 'manage'
    : currentTenant.plan === Plans.values.free
    ? 'payment'
    : 'none';

  const doCheckout = () => {
    dispatch(actions.doCheckout(plan));
  };

  const doPortal = () => {
    dispatch(actions.doPortal());
  };

  return (
    <div className="p-4 mb-4 text-gray-900 dark:text-gray-200 border-gray-200 dark:border-gray-600 border rounded-md h-full flex flex-col justify-between">
      <div>
        <div className="text-2xl text-center font-bold mb-6 flex-grow-0">
          {i18n(`plan.${plan}.label`)}
        </div>
        <div className="text-3xl text-center font-bold mb-4 flex-grow-0">
          {i18n(`plan.${plan}.price`)}
          <span className="text-base font-normal">
            {i18n('plan.pricingPeriod')}
          </span>
        </div>
      </div>

      <div>
        {isCurrentPlan &&
          currentTenant.planStatus ===
            'cancel_at_period_end' && (
            <p className="pt-2 pb-2 text-left text-sm -ml-4 -mr-4 bg-red-500 text-white pl-4 border-b border-t border-gray-200">
              {i18n('plan.cancelAtPeriodEnd')}
            </p>
          )}

        {isCurrentPlan &&
          currentTenant.planStatus === 'error' && (
            <p className="pt-2 pb-2 text-left text-sm -ml-4 -mr-4 bg-red-500 text-white pl-4 border-b border-t border-gray-200">
              {i18n('plan.somethingWrong')}
            </p>
          )}

        {buttonState === 'payment' && (
          <button
            type="button"
            className="disabled:opacity-50 disabled:cursor-default w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            disabled={
              !hasPermissionToEdit || !isPlanUser || loading
            }
            onClick={doCheckout}
          >
            {i18n('plan.subscribe')}
          </button>
        )}

        {buttonState === 'manage' && isPlanUser && (
          <button
            type="button"
            className="disabled:opacity-50 disabled:cursor-default w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            disabled={!hasPermissionToEdit || loading}
            onClick={doPortal}
          >
            {i18n('plan.manage')}
          </button>
        )}

        {buttonState === 'manage' && !isPlanUser && (
          <>
            <span
              data-tip={i18n('plan.notPlanUser')}
              data-for={`plan-not-plan-user-${plan}-tooltip`}
            >
              <button
                type="button"
                className="disabled:opacity-50 disabled:cursor-default w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                disabled={true}
              >
                {i18n('plan.manage')}
              </button>
            </span>
            <ReactTooltip
              id={`plan-not-plan-user-${plan}-tooltip`}
            />
          </>
        )}
      </div>
    </div>
  );
}
