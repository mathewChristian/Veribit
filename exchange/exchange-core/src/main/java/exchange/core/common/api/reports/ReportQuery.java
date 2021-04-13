package exchange.core.common.api.reports;

import exchange.core.processors.MatchingEngineRouter;
import exchange.core.processors.RiskEngine;
import net.openhft.chronicle.bytes.BytesIn;
import net.openhft.chronicle.bytes.WriteBytesMarshallable;

import java.util.Optional;
import java.util.stream.Stream;

/**
 * Reports query interface.
 *
 * @param <T> corresponding result type
 */
public interface ReportQuery<T extends ReportResult> extends WriteBytesMarshallable {

    /**
     * @return report type code (integer)
     */
    int getReportTypeCode();

    /**
     * @return report map-reduce constructor
     */
    T createResult(Stream<BytesIn> sections);

    /**
     * Report main logic.
     * This method is executed by matcher engine thread.
     *
     * @param matchingEngine matcher engine instance
     * @return custom result
     */
    Optional<T> process(MatchingEngineRouter matchingEngine);

    /**
     * Report main logic
     * This method is executed by risk engine thread.
     *
     * @param riskEngine risk engine instance.
     * @return custom result
     */
    Optional<T> process(RiskEngine riskEngine);
}
