package exchange.tests.util;

import exchange.core.common.CoreSymbolSpecification;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.BitSet;
import java.util.List;
import java.util.function.Function;

@AllArgsConstructor
@Builder
@Getter
public class TestOrdersGeneratorConfig {

    final List<CoreSymbolSpecification> coreSymbolSpecifications;
    final int totalTransactionsNumber;
    final List<BitSet> usersAccounts;
    final int targetOrderBookOrdersTotal;
    final int seed;
    final boolean avalancheIOC;
    final PreFillMode preFillMode;

    @AllArgsConstructor
    public enum PreFillMode {

        ORDERS_NUMBER(TestOrdersGeneratorConfig::getTargetOrderBookOrdersTotal),
        ORDERS_NUMBER_PLUS_QUARTER(config -> config.targetOrderBookOrdersTotal * 5 / 4); // used for snapshot tests to let some margin positions open

        final Function<TestOrdersGeneratorConfig, Integer> calculateReadySeqFunc;
    }
}
