import axios from 'axios';

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
    GET_FREE_CASH_FLOW,
    GET_CAPITAL_EXPEUDITURE,
    GET_COMPANY_RATING,
    GET_BALANCE_SHEET,
    GET_PROFITABILITY_RANK

} from './constants';

import config from '../config/config';

export const getProfile = ticker => {
    return async dispatch => {
        let profile = await axios.get(`https://financialmodelingprep.com/api/v3/company/profile/${ticker}`);
        dispatch({type: GET_PROFILE, payload: profile.data});
    }
};

export const getPrice = ticker => {
    return async dispatch => {
        let price = await axios.get(`https://financialmodelingprep.com/api/v3/stock/real-time-price/${ticker}`);
        dispatch({type: GET_PRICE, payload: price.data});
    }
};

export const getDcf = ticker => {
    return async dispatch => {
        let dcf = await axios.get(`https://financialmodelingprep.com/api/v3/company/discounted-cash-flow/${ticker}`);
        dispatch({type: GET_DCF, payload: dcf.data});
    }
};

export const getQuote = ticker => {
    return async dispatch => {
        let quote = await axios.get(`https://financialmodelingprep.com/api/v3/quote/${ticker}`);
        dispatch({type: GET_QUOTE, payload: quote.data});
    }
};

export const getFinancialratio = ticker => {
    return async dispatch => {
        let ratios = await axios.get(`https://financialmodelingprep.com/api/v3/financial-ratios/${ticker}`);
        dispatch({type: GET_FINANCIAL_RATIOS, payload: ratios.data});
    }
};

export const getFinancialGrowth = ticker => {
    return async dispatch => {
        let growth = await axios.get(`https://financialmodelingprep.com/api/v3/financial-statement-growth/${ticker}`);
        dispatch({type: GET_FINANCIAL_GROWTH, payload: growth.data});
    }
};

export const getRating = ticker => {
    return async dispatch => {
        let rating = await axios.get(`https://financialmodelingprep.com/api/v3/company/rating/${ticker}`);
        dispatch({type: GET_RATING, payload: rating.data});
    }
};

export const getHistoricalPrices = ticker => {
    return async dispatch => {
        let prices = await axios.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${ticker}`);
        dispatch({type: GET_HISTORICAL_PRICES, payload: prices.data});
    }
};
export const getKeyRatios = ticker => {
    return async dispatch => {
        let keyratios = await axios.get(`https://financialmodelingprep.com/api/v3/company-key-metrics/${ticker}`);
        dispatch({type: GET_KEY_RATIOS, payload: keyratios.data});
    }
};
export const getFinancialStatements = ticker => {
    return async dispatch => {
        let finance = await axios.get(`https://financialmodelingprep.com/api/v3/financials/income-statement/${ticker}`);
        dispatch({type: GET_FINANCIAL_STATEMENTS, payload: finance.data});
    }
};
export const getBalanceSheet = ticker => {
    return async dispatch => {
        let balanceSheet = await axios.get(`https://financialmodelingprep.com/api/v3/financials/balance-sheet-statement/${ticker}`);
        dispatch({type: GET_BALANCE_SHEET, payload: balanceSheet.data});
    }
};


/*Tickers */

export const setTicker= ticker => {
    return async dispatch => {
        dispatch({type: SET_TICKER, payload: ticker});
    }
};

export const getCashflow = ticker => {
    return async dispatch => {
        let flow = await axios.get(`https://financialmodelingprep.com/api/v3/financials/cash-flow-statement/${ticker}`);
        dispatch({type: GET_CASH_FLOW, payload: flow.data});
    }
};

export const getFreeCashflow = ticker => {
    return async dispatch => {
        let free = await axios.get(`https://financialmodelingprep.com/api/v3/financials/cash-flow-statement/${ticker}`);
        dispatch({type: GET_FREE_CASH_FLOW, payload: free.data});
    }
};

export const getCapitalExpenditure = ticker => {
    return async dispatch => {
        let cpe = await axios.get(`https://financialmodelingprep.com/api/v3/financials/cash-flow-statement/${ticker}`);
        dispatch({type: GET_CAPITAL_EXPEUDITURE, payload: cpe.data});
    }
};

export const getCompanyRating = ticker => {
    return async dispatch => {
        let cmr = await axios.get(`https://financialmodelingprep.com/api/v3/company/rating/${ticker}`);
        dispatch({type: GET_COMPANY_RATING, payload: cmr.data});
    }
};

export const getProfitabilityRank = ticker => {
    return async dispatch => {
        let prorank = await axios.get(`https://financialmodelingprep.com/api/v3/financial-ratios/${ticker}`);
        dispatch({type: GET_PROFITABILITY_RANK, payload: prorank.data});
    }
};
