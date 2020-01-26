import {
    GET_PROFILE,
    GET_PRICE,
    GET_DCF,
    SET_TICKER,
    GET_QUOTE,
    GET_FINANCIAL_RATIOS,
    GET_FINANCIAL_GROWTH,
    GET_RATING,
    GET_HISTORICAL_PRICES,
    GET_KEY_RATIOS,
    GET_FINANCIAL_STATEMENTS,
    GET_CASH_FLOW,
    GET_COMPANY_RATING,
    GET_BALANCE_SHEET,
} from '../actions/constants';
import _ from 'lodash';

export default (state = {}, action) => {
    switch(action.type) {
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload
            };
        case GET_PRICE:
            return {
                ...state,
                price: action.payload
            };
        case GET_DCF:
            console.log(action.payload)
            return {
                ...state,
                dcf: action.payload
            };
        case SET_TICKER:
            return {
                ...state,
                ticker: action.payload
            };
        case GET_QUOTE:
            return {
                ...state,
                quote: action.payload[0]
            };
        case GET_FINANCIAL_RATIOS:
        let filter = {i1: 0, i2: 0, i3: 0, i4: 0, p1: 0, p2: 0, p3: 0, p4: 0, l1: 0, l2: 0, d1: 0, c1: 0, i:0};
            _.map(action.payload.ratios, data => {
              filter.i1 += parseFloat(data.investmentValuationRatios.priceToBookRatio)
              filter.i2 += parseFloat(data.investmentValuationRatios.priceEarningsRatio)
              filter.i4 += parseFloat(data.investmentValuationRatios.priceToFreeCashFlowsRatio)
              filter.p1 += parseFloat(data.profitabilityIndicatorRatios.returnOnAssets)
              filter.p2 += parseFloat(data.profitabilityIndicatorRatios.returnOnEquity)
              filter.p3 += parseFloat(data.profitabilityIndicatorRatios.netProfitMargin)
              filter.p4 += parseFloat(data.profitabilityIndicatorRatios.operatingProfitMargin)
              filter.l1 += parseFloat(data.liquidityMeasurementRatios.currentRatio)
              filter.d1 += parseFloat(data.debtRatios.debtRatio)
              filter.c1 += parseFloat(data.cashFlowIndicatorRatios.dividendPayoutRatio?  data.cashFlowIndicatorRatios.dividendPayoutRatio: 0)
              filter.i++;
            })
            let obj = {
              priceToBookRatio: filter.i1/ filter.i,
              priceEarningsRatio: filter.i2/ filter.i,
              priceToFreeCashFlowsRatio: filter.i4/ filter.i,
              returnOnAssets: filter.p1/ filter.i,
              returnOnEquity: filter.p2/ filter.i,
              netProfitMargin: filter.p3/ filter.i,
              operatingProfitMargin: filter.p4/ filter.i,
              currentRatio: filter.l1/ filter.i,
              debtRatio: filter.d1/ filter.i,
              dividendPayoutRatio: filter.c1/ filter.i
            };

            let financialStrengthRatio = [
                {
                    key: 'Debt Ratio',
                    value: action.payload.ratios[0].debtRatios.debtRatio
                },
                {
                    key: 'Debt to Equity Ratio',
                    value: action.payload.ratios[0].debtRatios.debtEquityRatio
                },
                {
                    key: 'Current Ratio',
                    value: action.payload.ratios[0].liquidityMeasurementRatios.currentRatio
                },
                {
                    key: 'Capital Expenditure Coverage Ratio',
                    value: action.payload.ratios[0].cashFlowIndicatorRatios.capitalExpenditureCoverageRatios
                }
            ];
            let profitabilityRank = [
                {
                    key: 'Operating Margin',
                    value: action.payload.ratios[0].profitabilityIndicatorRatios.operatingProfitMargin
                },
                {
                    key: 'Net Margin',
                    value: action.payload.ratios[0].profitabilityIndicatorRatios.netProfitMargin
                },
                {
                    key: 'Return of Equity',
                    value: action.payload.ratios[0].profitabilityIndicatorRatios.returnOnEquity
                },
                {
                    key: 'Return on Assets',
                    value: action.payload.ratios[0].profitabilityIndicatorRatios.returnOnAssets
                }

            ];

            let valuationRatio = [
                {
                    key: 'Price to Book Ratio',
                    value: action.payload.ratios[0].investmentValuationRatios.priceToBookRatio
                },
                {
                    key: 'Price to Earnings Ratio',
                    value: action.payload.ratios[0].investmentValuationRatios.priceEarningsRatio
                },
                {
                    key: 'Enterprise Value Multiple',
                    value: action.payload.ratios[0].investmentValuationRatios.enterpriseValueMultiple
                }
            ];

            return {
                ...state,
                ratios: action.payload,
                filtered_ratios: obj,
                financialStrengthRatio,
                valuationRatio,
                profitabilityRank
            };

        case GET_FINANCIAL_GROWTH:
            return {
                ...state,
                growth: action.payload
            };
        case GET_RATING:
            return {
                ...state,
                rating: action.payload
            };
        case GET_HISTORICAL_PRICES:
            return {
                ...state,
                histoPrices: action.payload.historical
            };
        case GET_KEY_RATIOS:
            return {
                ...state,
                keyratios: action.payload
            };
        case GET_FINANCIAL_STATEMENTS:
            return {
                ...state,
                financials: action.payload.financials
            };
        case GET_CASH_FLOW:
            return {
                ...state,
                cashflow: action.payload.financials
            };
        case GET_COMPANY_RATING:
            return {
                ...state,
                com_rating: action.payload.company
            };
        case GET_BALANCE_SHEET:
            return {
                ...state,
                balanceSheet: action.payload.financials
            };
        default:
            return state;
    }
}
