export const parseCoin = coin => {
    if(coin === 'Ƀ')
        coin = 'BTC';
    else if(coin === 'Ł')
        coin = 'LTC';

    return coin;
};