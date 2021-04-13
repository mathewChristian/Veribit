package exchange.core.processors;

import exchange.core.common.cmd.OrderCommand;

public interface SimpleEventHandler {

    /**
     * Handle command with resulting data
     *
     * @param seq   - sequence number
     * @param event - event
     * @return true to forcibly publish sequence (batches)
     */
    boolean onEvent(long seq, OrderCommand event);

}
