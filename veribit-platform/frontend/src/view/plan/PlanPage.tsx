import React from 'react';
import { i18n } from 'src/i18n';
import Plans from 'src/security/plans';
import PlanCardFree from 'src/view/plan/PlanCardFree';
import PlanCardPaid from 'src/view/plan/PlanCardPaid';
import Breadcrumb from 'src/view/shared/Breadcrumb';

function PlanPage(props) {
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('plan.menu')],
        ]}
      />

      <div className="mt-4 p-6 bg-white dark:bg-gray-800 dark:border-gray-800 dark:text-white border-gray-200 border rounded-md">
        <h1 className="text-lg font-medium mb-6">
          {i18n('plan.title')}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <PlanCardFree />
          </div>
          <div>
            <PlanCardPaid plan={Plans.values.growth} />
          </div>
          <div>
            <PlanCardPaid plan={Plans.values.enterprise} />
          </div>
        </div>
      </div>
    </>
  );
}

export default PlanPage;
