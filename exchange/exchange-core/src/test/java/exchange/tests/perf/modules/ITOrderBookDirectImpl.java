package exchange.tests.perf.modules;

import exchange.collections.objpool.ObjectsPool;
import exchange.core.common.config.LoggingConfiguration;
import exchange.core.orderbook.IOrderBook;
import exchange.core.orderbook.OrderBookDirectImpl;
import exchange.core.orderbook.OrderBookEventsHelper;
import exchange.tests.util.TestConstants;

public class ITOrderBookDirectImpl extends ITOrderBookBase {

    @Override
    protected IOrderBook createNewOrderBook() {

        return new OrderBookDirectImpl(
                TestConstants.SYMBOLSPEC_EUR_USD,
                ObjectsPool.createDefaultTestPool(),
                OrderBookEventsHelper.NON_POOLED_EVENTS_HELPER,
                LoggingConfiguration.DEFAULT);
    }
}
