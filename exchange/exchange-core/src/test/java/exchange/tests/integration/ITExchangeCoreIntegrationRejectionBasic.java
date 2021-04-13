package exchange.tests.integration;

import exchange.core.common.config.PerformanceConfiguration;

public class ITExchangeCoreIntegrationRejectionBasic extends ITExchangeCoreIntegrationRejection {


    @Override
    public PerformanceConfiguration getPerformanceConfiguration() {
        return PerformanceConfiguration.baseBuilder().build();
    }
}
