package exchange.core.common.api.binary;

import exchange.core.common.CoreSymbolSpecification;
import exchange.core.utils.SerializationUtils;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import net.openhft.chronicle.bytes.BytesIn;
import net.openhft.chronicle.bytes.BytesOut;
import org.eclipse.collections.impl.map.mutable.primitive.IntObjectHashMap;

import java.util.Collection;

@AllArgsConstructor
@EqualsAndHashCode
@Getter
public final class BatchAddSymbolsCommand implements BinaryDataCommand {

    private final IntObjectHashMap<CoreSymbolSpecification> symbols;

    public BatchAddSymbolsCommand(final CoreSymbolSpecification symbol) {
        symbols = IntObjectHashMap.newWithKeysValues(symbol.symbolId, symbol);
    }

    public BatchAddSymbolsCommand(final Collection<CoreSymbolSpecification> collection) {
        symbols = new IntObjectHashMap<>(collection.size());
        collection.forEach(s -> symbols.put(s.symbolId, s));
    }


    public BatchAddSymbolsCommand(final BytesIn bytes) {
        symbols = SerializationUtils.readIntHashMap(bytes, CoreSymbolSpecification::new);
    }

    @Override
    public void writeMarshallable(BytesOut bytes) {
        SerializationUtils.marshallIntHashMap(symbols, bytes);
    }

    @Override
    public int getBinaryCommandTypeCode() {
        return BinaryCommandType.ADD_SYMBOLS.getCode();
    }
}
