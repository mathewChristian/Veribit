package exchange.tests.integration;

import exchange.core.common.config.PerformanceConfiguration;

public class ITFeesExchangeBasic extends ITFeesExchange {
    @Override
    public PerformanceConfiguration getPerformanceConfiguration() {
        return PerformanceConfiguration.DEFAULT;
    }
}
