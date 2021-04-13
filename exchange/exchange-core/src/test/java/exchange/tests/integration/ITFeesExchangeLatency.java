package exchange.tests.integration;

import exchange.core.common.config.PerformanceConfiguration;

public class ITFeesExchangeLatency extends ITFeesExchange {
    @Override
    public PerformanceConfiguration getPerformanceConfiguration() {
        return PerformanceConfiguration.latencyPerformanceBuilder().build();
    }
}
