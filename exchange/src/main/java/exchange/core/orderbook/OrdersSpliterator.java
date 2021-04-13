package exchange.core.orderbook;

import lombok.AllArgsConstructor;

import java.util.Spliterator;
import java.util.function.Consumer;


@AllArgsConstructor
public final class OrdersSpliterator implements Spliterator<OrderBookDirectImpl.DirectOrder> {

    private OrderBookDirectImpl.DirectOrder pointer;

    @Override
    public boolean tryAdvance(Consumer<? super OrderBookDirectImpl.DirectOrder> action) {
        if (pointer == null) {
            return false;
        } else {
            action.accept(pointer);
            pointer = pointer.prev;
            return true;
        }
    }

    @Override
    public Spliterator<OrderBookDirectImpl.DirectOrder> trySplit() {
        return null;
    }

    @Override
    public long estimateSize() {
        return Long.MAX_VALUE;
    }

    @Override
    public int characteristics() {
        return Spliterator.ORDERED;
    }
}
