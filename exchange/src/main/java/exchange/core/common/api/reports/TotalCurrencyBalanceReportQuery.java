package exchange.core.common.api.reports;

import exchange.core.common.CoreSymbolSpecification;
import exchange.core.common.PositionDirection;
import exchange.core.common.SymbolType;
import exchange.core.processors.MatchingEngineRouter;
import exchange.core.processors.RiskEngine;
import exchange.core.processors.SymbolSpecificationProvider;
import exchange.core.utils.CoreArithmeticUtils;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import net.openhft.chronicle.bytes.BytesIn;
import net.openhft.chronicle.bytes.BytesOut;
import org.eclipse.collections.impl.map.mutable.primitive.IntLongHashMap;
import org.eclipse.collections.impl.map.mutable.primitive.IntObjectHashMap;

import java.util.Optional;
import java.util.stream.Stream;

@NoArgsConstructor
@EqualsAndHashCode
@ToString
public final class TotalCurrencyBalanceReportQuery implements ReportQuery<TotalCurrencyBalanceReportResult> {

    public TotalCurrencyBalanceReportQuery(BytesIn bytesIn) {
        // do nothing
    }

    @Override
    public int getReportTypeCode() {
        return ReportType.TOTAL_CURRENCY_BALANCE.getCode();
    }

    @Override
    public TotalCurrencyBalanceReportResult createResult(final Stream<BytesIn> sections) {
        return TotalCurrencyBalanceReportResult.merge(sections);
    }

    @Override
    public Optional<TotalCurrencyBalanceReportResult> process(final MatchingEngineRouter matchingEngine) {

        final IntLongHashMap currencyBalance = new IntLongHashMap();

        matchingEngine.getOrderBooks().stream()
                .filter(ob -> ob.getSymbolSpec().type == SymbolType.CURRENCY_EXCHANGE_PAIR)
                .forEach(ob -> {
                    final CoreSymbolSpecification spec = ob.getSymbolSpec();

                    currencyBalance.addToValue(
                            spec.getBaseCurrency(),
                            ob.askOrdersStream(false).mapToLong(ord -> CoreArithmeticUtils.calculateAmountAsk(ord.getSize() - ord.getFilled(), spec)).sum());

                    currencyBalance.addToValue(
                            spec.getQuoteCurrency(),
                            ob.bidOrdersStream(false).mapToLong(ord -> CoreArithmeticUtils.calculateAmountBidTakerFee(ord.getSize() - ord.getFilled(), ord.getReserveBidPrice(), spec)).sum());
                });

        return Optional.of(TotalCurrencyBalanceReportResult.ofOrderBalances(currencyBalance));
    }

    @Override
    public Optional<TotalCurrencyBalanceReportResult> process(final RiskEngine riskEngine) {

        // prepare fast price cache for profit estimation with some price (exact value is not important, except ask==bid condition)
        final IntObjectHashMap<RiskEngine.LastPriceCacheRecord> dummyLastPriceCache = new IntObjectHashMap<>();
        riskEngine.getLastPriceCache().forEachKeyValue((s, r) -> dummyLastPriceCache.put(s, r.averagingRecord()));

        final IntLongHashMap currencyBalance = new IntLongHashMap();

        final IntLongHashMap symbolOpenInterestLong = new IntLongHashMap();
        final IntLongHashMap symbolOpenInterestShort = new IntLongHashMap();

        final SymbolSpecificationProvider symbolSpecificationProvider = riskEngine.getSymbolSpecificationProvider();

        riskEngine.getUserProfileService().getUserProfiles().forEach(userProfile -> {
            userProfile.accounts.forEachKeyValue(currencyBalance::addToValue);
            userProfile.positions.forEachKeyValue((symbolId, positionRecord) -> {
                final CoreSymbolSpecification spec = symbolSpecificationProvider.getSymbolSpecification(symbolId);
                final RiskEngine.LastPriceCacheRecord avgPrice = dummyLastPriceCache.getIfAbsentPut(symbolId, RiskEngine.LastPriceCacheRecord.dummy);
                currencyBalance.addToValue(positionRecord.currency, positionRecord.estimateProfit(spec, avgPrice));

                if (positionRecord.direction == PositionDirection.LONG) {
                    symbolOpenInterestLong.addToValue(symbolId, positionRecord.openVolume);
                } else if (positionRecord.direction == PositionDirection.SHORT) {
                    symbolOpenInterestShort.addToValue(symbolId, positionRecord.openVolume);
                }
            });
        });

        return Optional.of(
                new TotalCurrencyBalanceReportResult(
                        currencyBalance,
                        new IntLongHashMap(riskEngine.getFees()),
                        new IntLongHashMap(riskEngine.getAdjustments()),
                        new IntLongHashMap(riskEngine.getSuspends()),
                        null,
                        symbolOpenInterestLong,
                        symbolOpenInterestShort));
    }

    @Override
    public void writeMarshallable(BytesOut bytes) {
        // do nothing
    }
}
