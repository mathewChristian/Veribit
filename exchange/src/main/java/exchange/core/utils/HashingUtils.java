package exchange.core.utils;

import exchange.core.common.StateHash;
import lombok.extern.slf4j.Slf4j;
import org.agrona.collections.MutableLong;
import org.eclipse.collections.impl.map.mutable.primitive.IntObjectHashMap;
import org.eclipse.collections.impl.map.mutable.primitive.LongObjectHashMap;

import java.util.Arrays;
import java.util.BitSet;
import java.util.Iterator;
import java.util.Objects;
import java.util.stream.Stream;

@Slf4j
public final class HashingUtils {

    public static int stateHash(final BitSet bitSet) {
        return Arrays.hashCode(bitSet.toLongArray());
    }

    public static <T extends StateHash> int stateHash(final LongObjectHashMap<T> hashMap) {

        final MutableLong mutableLong = new MutableLong();
        hashMap.forEachKeyValue((k, v) -> mutableLong.addAndGet(Objects.hash(k, v.stateHash())));
        return Long.hashCode(mutableLong.value);
    }

    public static <T extends StateHash> int stateHash(final IntObjectHashMap<T> hashMap) {

        final MutableLong mutableLong = new MutableLong();
        hashMap.forEachKeyValue((k, v) -> mutableLong.addAndGet(Objects.hash(k, v.stateHash())));
        return Long.hashCode(mutableLong.value);
    }


    public static int stateHashStream(final Stream<? extends StateHash> stream) {
        int h = 0;
        final Iterator<? extends StateHash> iterator = stream.iterator();
        while (iterator.hasNext()) {
            h = h * 31 + iterator.next().stateHash();
        }
        return h;
    }

    /**
     * Checks if both streams contain same elements in same order
     *
     * @param s1 stream 1
     * @param s2 stream 2
     * @return true if streams contain same elements in same order
     */
    public static boolean checkStreamsEqual(final Stream<?> s1, final Stream<?> s2) {
        final Iterator<?> iter1 = s1.iterator(), iter2 = s2.iterator();
        while (iter1.hasNext() && iter2.hasNext()) {
            if (!iter1.next().equals(iter2.next())) {
                return false;
            }
        }
        return !iter1.hasNext() && !iter2.hasNext();
    }

}