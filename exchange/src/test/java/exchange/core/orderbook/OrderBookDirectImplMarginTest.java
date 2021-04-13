package exchange.core.orderbook;

import exchange.collections.objpool.ObjectsPool;
import exchange.core.common.CoreSymbolSpecification;
import exchange.core.common.config.LoggingConfiguration;
import exchange.tests.util.TestConstants;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public final class OrderBookDirectImplMarginTest extends OrderBookDirectImplTest {

    @Override
    protected IOrderBook createNewOrderBook() {
        return new OrderBookDirectImpl(
                getCoreSymbolSpec(),
                ObjectsPool.createDefaultTestPool(),
                OrderBookEventsHelper.NON_POOLED_EVENTS_HELPER,
                LoggingConfiguration.DEFAULT);
    }

    @Override
    protected CoreSymbolSpecification getCoreSymbolSpec() {
        return TestConstants.SYMBOLSPEC_EUR_USD;
    }

}