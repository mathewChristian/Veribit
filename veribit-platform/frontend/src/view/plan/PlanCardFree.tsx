import React from 'react';
import { useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import authSelectors from 'src/modules/auth/authSelectors';
import Plans from 'src/security/plans';

export default function PlanCardFree(props) {
  const currentTenant = useSelector(
    authSelectors.selectCurrentTenant,
  );

  const isCurrentPlan =
    currentTenant.plan === Plans.values.free;

  const buttonState = isCurrentPlan ? 'current' : null;

  return (
    <div className="p-4 mb-4 text-gray-900 dark:text-gray-200 border-gray-200 dark:border-gray-600 border rounded-md h-full flex flex-col justify-between">
      <div>
        <div className="text-2xl text-center font-bold mb-6 flex-grow-0">
          {i18n(`plan.${Plans.values.free}.label`)}
        </div>
        <div className="text-3xl text-center font-bold mb-4 flex-grow-0">
          {i18n(`plan.free.price`)}
          <span className="text-base font-normal">
            {i18n('plan.pricingPeriod')}
          </span>
        </div>
      </div>

      <div>
        {buttonState === 'current' && (
          <button
            type="button"
            className="disabled:opacity-50 disabled:cursor-default w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            disabled={true}
          >
            {i18n('plan.current')}
          </button>
        )}
      </div>
    </div>
  );
}
