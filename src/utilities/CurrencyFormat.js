export const format = (currency, value) => {
    const formatter = new Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2
    });

    return formatter.format(value)
};