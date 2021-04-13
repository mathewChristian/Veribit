package exchange.core.orderbook;

import exchange.collections.objpool.ObjectsPool;
import exchange.core.common.CoreSymbolSpecification;
import exchange.core.common.config.LoggingConfiguration;
import exchange.tests.util.TestConstants;

public final class OrderBookDirectImplExchangeTest extends OrderBookDirectImplTest {

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
        return TestConstants.SYMBOLSPECFEE_XBT_LTC;
    }
}