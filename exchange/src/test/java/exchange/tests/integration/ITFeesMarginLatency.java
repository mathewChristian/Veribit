package exchange.tests.integration;

import exchange.core.common.config.PerformanceConfiguration;

public final class ITFeesMarginLatency extends ITFeesMargin {
    @Override
    public PerformanceConfiguration getPerformanceConfiguration() {
        return PerformanceConfiguration.latencyPerformanceBuilder().build();
    }
}
