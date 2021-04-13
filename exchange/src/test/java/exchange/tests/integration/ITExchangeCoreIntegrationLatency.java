package exchange.tests.integration;

import exchange.core.common.config.PerformanceConfiguration;

public final class ITExchangeCoreIntegrationLatency extends ITExchangeCoreIntegration {

    @Override
    public PerformanceConfiguration getPerformanceConfiguration() {
        return PerformanceConfiguration.latencyPerformanceBuilder().build();
    }
}
