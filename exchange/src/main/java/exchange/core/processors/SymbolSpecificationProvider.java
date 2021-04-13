package exchange.core.processors;


import exchange.core.common.CoreSymbolSpecification;
import exchange.core.common.StateHash;
import exchange.core.utils.HashingUtils;
import exchange.core.utils.SerializationUtils;
import lombok.extern.slf4j.Slf4j;
import net.openhft.chronicle.bytes.BytesIn;
import net.openhft.chronicle.bytes.BytesOut;
import net.openhft.chronicle.bytes.WriteBytesMarshallable;
import org.eclipse.collections.impl.map.mutable.primitive.IntObjectHashMap;

import java.util.Objects;

@Slf4j
public final class SymbolSpecificationProvider implements WriteBytesMarshallable, StateHash {

    // symbol->specs
    private final IntObjectHashMap<CoreSymbolSpecification> symbolSpecs;

    public SymbolSpecificationProvider() {
        this.symbolSpecs = new IntObjectHashMap<>();
    }

    public SymbolSpecificationProvider(BytesIn bytes) {
        this.symbolSpecs = SerializationUtils.readIntHashMap(bytes, CoreSymbolSpecification::new);
    }


    public boolean addSymbol(final CoreSymbolSpecification symbolSpecification) {
        if (getSymbolSpecification(symbolSpecification.symbolId) != null) {
            return false; // CommandResultCode.SYMBOL_MGMT_SYMBOL_ALREADY_EXISTS;
        } else {
            registerSymbol(symbolSpecification.symbolId, symbolSpecification);
            return true;
        }
    }

    /**
     * Get symbol specification
     *
     * @param symbol - symbol code
     * @return symbol specification
     */
    public CoreSymbolSpecification getSymbolSpecification(int symbol) {
        return symbolSpecs.get(symbol);
    }

    /**
     * register new symbol specification
     *
     * @param symbol - symbol code
     * @param spec   - symbol specification
     */
    public void registerSymbol(int symbol, CoreSymbolSpecification spec) {
        symbolSpecs.put(symbol, spec);
    }

    /**
     * Reset state
     */
    public void reset() {
        symbolSpecs.clear();
    }

    @Override
    public void writeMarshallable(BytesOut bytes) {
        // write symbolSpecs
        SerializationUtils.marshallIntHashMap(symbolSpecs, bytes);
    }

    @Override
    public int stateHash() {
        return Objects.hash(HashingUtils.stateHash(symbolSpecs));
    }

}
