package exchange.tests.util;

import exchange.core.common.config.InitialStateConfiguration;
import exchange.core.common.config.PerformanceConfiguration;
import exchange.core.common.config.SerializationConfiguration;
import lombok.extern.slf4j.Slf4j;

import java.util.stream.IntStream;

import static junit.framework.TestCase.assertTrue;
import static org.junit.Assert.assertEquals;

@Slf4j
public class ThroughputTestsModule {

    public static void throughputTestImpl(final PerformanceConfiguration performanceCfg,
                                          final TestDataParameters testDataParameters,
                                          final InitialStateConfiguration initialStateCfg,
                                          final SerializationConfiguration serializationCfg,
                                          final int iterations) {

        final ExchangeTestContainer.TestDataFutures testDataFutures = ExchangeTestContainer.prepareTestDataAsync(testDataParameters, 1);

        try (final ExchangeTestContainer container = ExchangeTestContainer.create(performanceCfg, initialStateCfg, serializationCfg)) {

            final float avgMt = container.executeTestingThread(
                    () -> (float) IntStream.range(0, iterations)
                            .mapToObj(j -> {
                                container.loadSymbolsUsersAndPrefillOrdersNoLog(testDataFutures);

                                final float perfMt = container.benchmarkMtps(testDataFutures.getGenResult().join().apiCommandsBenchmark.join());
                                log.info("{}. {} MT/s", j, String.format("%.3f", perfMt));

                                assertTrue(container.totalBalanceReport().isGlobalBalancesAllZero());

                                // compare orderBook final state just to make sure all commands executed same way
                                testDataFutures.coreSymbolSpecifications.join().forEach(
                                        symbol -> assertEquals(
                                                testDataFutures.getGenResult().join().getGenResults().get(symbol.symbolId).getFinalOrderBookSnapshot(),
                                                container.requestCurrentOrderBook(symbol.symbolId)));

                                // TODO compare events, balances, positions

                                container.resetExchangeCore();

                                System.gc();

                                return perfMt;
                            })
                            .mapToDouble(x -> x)
                            .average().orElse(0));

            log.info("Average: {} MT/s", avgMt);
        }
    }

}
