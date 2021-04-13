package exchange.core.orderbook;

import exchange.core.common.CoreSymbolSpecification;
import exchange.core.common.config.LoggingConfiguration;
import exchange.tests.util.TestConstants;

public final class OrderBookNaiveImplExchangeTest extends OrderBookBaseTest {

    @Override
    protected IOrderBook createNewOrderBook() {
        return new OrderBookNaiveImpl(getCoreSymbolSpec(), LoggingConfiguration.DEFAULT);
    }

    @Override
    protected CoreSymbolSpecification getCoreSymbolSpec() {
        return TestConstants.SYMBOLSPEC_ETH_XBT;
    }


}