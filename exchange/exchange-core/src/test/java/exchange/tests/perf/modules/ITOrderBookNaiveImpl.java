package exchange.tests.perf.modules;

import exchange.core.common.config.LoggingConfiguration;
import exchange.core.orderbook.IOrderBook;
import exchange.core.orderbook.OrderBookNaiveImpl;
import exchange.tests.util.TestConstants;

public class ITOrderBookNaiveImpl extends ITOrderBookBase {

    @Override
    protected IOrderBook createNewOrderBook() {
        return new OrderBookNaiveImpl(TestConstants.SYMBOLSPEC_EUR_USD, LoggingConfiguration.DEFAULT);
    }
}
