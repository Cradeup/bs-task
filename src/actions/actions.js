import { fetchJSON } from "../fetch-JSON";
import { FETCH_PRICES, FETCH_PRICES_FAIL, FETCH_PRICES_SUCCES, UPDATE_OPTION_FROM, UPDATE_OPTION_TO, CALCULATE_TOTAL, UPDATE_CONVERT_AMOUNT_AREA, UPDATE_CASH_ADD_OPTION,UPDATE_CASH_ADD_AMOUNT_AREA, CASH_ADD_BUTTON, FETCH_PRICE_CHANGE, FETCH_PRICE_CHANGE_SUCCES, FETCH_PRICE_CHANGE_FAIL } from "./types";

export const fetchPrices = () => dispatch => {
    dispatch({
        type: FETCH_PRICES
    });
    fetchJSON(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=bitcoin%2C%20ethereum&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=14d`)
        .then(fetchPricesSuccess(dispatch))
        .catch(() => fetchPricesFail(dispatch))
}

export const fetchPriceChange = (value) => dispatch => {
    dispatch({
        type: FETCH_PRICE_CHANGE
    });
    fetchJSON(`https://api.coingecko.com/api/v3/coins/${value}/market_chart?vs_currency=usd&days=14&interval=daily`)
    .then(fetchPriceChangeSucces(dispatch))
}

export const fetchPriceChangeSucces = dispatch => priceChanges => {
    dispatch({
        type: FETCH_PRICE_CHANGE_SUCCES,
        payload: priceChanges
    })
}

export const fetchPriceChangeFail = dispatch => () => {
    dispatch({
        type: FETCH_PRICE_CHANGE_FAIL
    })
}

export const fetchPricesSuccess = dispatch => prices => {
    prices.push({name: 'US dollar', symbol: 'usd', current_price: 1, price_change_percentage_24h: 0})
    dispatch({
        type: FETCH_PRICES_SUCCES,
        payload: prices
    })
}

export const fetchPricesFail = dispatch => () => {
    dispatch({
        type: FETCH_PRICES_FAIL
    })
}

export const updateSelectOptionFrom = convertFrom => dispatch => {
    dispatch({
        type: UPDATE_OPTION_FROM,
        payload: convertFrom
    })
}

export const updateSelectOptionTo = convertTo => dispatch => {
    dispatch({
        type: UPDATE_OPTION_TO,
        payload: convertTo
    })
}


export const calculateTotal = () => dispatch => {
    dispatch({
        type: CALCULATE_TOTAL,
    })
} 

export const upadteConvertAmountArea = convertAmount => dispatch => {
    dispatch({
        type: UPDATE_CONVERT_AMOUNT_AREA,
        payload: convertAmount
    })
}

export const updateSelectOptionCashAdd = currencyToAdd => dispatch => {
    dispatch({
        type: UPDATE_CASH_ADD_OPTION,
        payload: currencyToAdd
    })
}

export const updateCashAddAmountArea = cashAddAmount => dispatch => {
    dispatch({
        type: UPDATE_CASH_ADD_AMOUNT_AREA,
        payload: cashAddAmount
    })
}

export const cashAddButton = () => dispatch => {
    dispatch({
        type: CASH_ADD_BUTTON
    })
}