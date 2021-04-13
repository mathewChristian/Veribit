package exchange.core.common;

public interface IOrder extends StateHash {

    long getPrice();

    long getSize();

    long getFilled();

    long getUid();

    OrderAction getAction();

    long getOrderId();

    long getTimestamp();

    long getReserveBidPrice();

}
