package exchange.tests.integration;

import exchange.core.common.config.PerformanceConfiguration;

public class ITExchangeCoreIntegrationStressBasic extends ITExchangeCoreIntegrationStress {

    @Override
    public PerformanceConfiguration getPerformanceConfiguration() {
        return PerformanceConfiguration.DEFAULT;
    }
}
