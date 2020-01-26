import _ from 'lodash';

export const filterFinancialsForRevenue = data => {
    return _.map(data, rev => {
        return parseFloat(rev.Revenue);
    }).reverse();
};

export const filterFinancialsForDate = data => {
    return _.map(data, fin => {
        return fin.date;
    }).reverse();
};

export const filterFinancialsForNetIncome = data => {
    return _.map(data, rev => {
        return parseFloat(rev["Net Income"]);
    }).reverse();
};

export const filterFinancialsForEPS = data => {
    return _.map(data, rev => {
        return parseFloat(rev.EPS);
    }).reverse();
};

// Cashflow

export const filterCashflowForDate = data => {
    return _.map(data, fin => {
        return fin.date;
    }).reverse();
};

export const filterCashflowForNetcashflow = data => {
    return _.map(data, cf => {
        return parseFloat(cf["Net cash flow / Change in cash"]);
    }).reverse();
};

export const filterFreeCashflowForNetcashflow = data => {
    return _.map(data, fcf => {
        return parseFloat(fcf["Free Cash Flow"]);
    }).reverse();
};

export const filterCapitalExpenditure = data => {
    return _.map(data, fcf => {
        return parseFloat(fcf["Capital Expenditure"]);
    }).reverse();
};

export const filterCompanyRating = data => {
    return _.map(data, cmr => {
        return parseFloat(cmr["rating"]);
    }).reverse();
};
export const filterBalanceForPie = data => {
    if (!data)
        return;

    const single = data[0];
    return [single['Cash and cash equivalents'], single['Total debt'], single['Total assets'], single['Total shareholders equity'], single['Retained earnings (deficit)']];
};
