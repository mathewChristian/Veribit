package exchange.core.common;

import lombok.Getter;

@Getter
public enum UserStatus {
    ACTIVE(0), // normal user
    SUSPENDED(1); // suspended

    private byte code;

    UserStatus(int code) {
        this.code = (byte) code;
    }

    public static UserStatus of(byte code) {
        switch (code) {
            case 0:
                return ACTIVE;
            case 1:
                return SUSPENDED;
            default:
                throw new IllegalArgumentException("unknown UserStatus:" + code);
        }
    }

}
