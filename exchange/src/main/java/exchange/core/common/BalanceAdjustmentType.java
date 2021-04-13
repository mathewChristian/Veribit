package exchange.core.common;

import lombok.Getter;

@Getter
public enum BalanceAdjustmentType {
    ADJUSTMENT(0),
    SUSPEND(1);

    private byte code;

    BalanceAdjustmentType(int code) {
        this.code = (byte) code;
    }

    public static BalanceAdjustmentType of(byte code) {
        switch (code) {
            case 0:
                return ADJUSTMENT;
            case 1:
                return SUSPEND;
            default:
                throw new IllegalArgumentException("unknown BalanceAdjustmentType:" + code);
        }
    }
}
