import { FETCH_PRICES, FETCH_PRICES_FAIL, FETCH_PRICES_SUCCES, UPDATE_OPTION_FROM, UPDATE_OPTION_TO, UPDATE_CONVERT_AMOUNT_AREA, UPDATE_CASH_ADD_OPTION, UPDATE_CASH_ADD_AMOUNT_AREA, CASH_ADD_BUTTON, FETCH_PRICE_CHANGE, FETCH_PRICE_CHANGE_SUCCES, FETCH_PRICE_CHANGE_FAIL } from "../actions/types";
import { createReducer } from '@reduxjs/toolkit'


const initialState = {
    status: 'waiting',
    prices: null,
    usdPrice: 1,
    accounts: [
        { currency: 'btc', value: 1 },
        { currency: 'eth', value: 30 },
        { currency: 'usd', value: 1200 },
    ],
    selectedOptionFrom: null,
    selectedOptionTo: null,
    convertAmount: '',
    convertResult: null,
    selectedOptionCashAdd: null,
    cashAmountToAdd: null,
    pricesChanges: null,
    selectPriceChanges: 'bitcoin',
    changesStatus: 'waiting'
}


export default createReducer(initialState, {
    [FETCH_PRICES]: (state) => {
        if (state.status === 'waiting') {
            state.status = 'loading'
        }
    },
    [FETCH_PRICES_SUCCES]: (state, action) => {
        if (state.status === 'loading') {
            state.prices = action.payload
            state.status = 'loaded'
        }
    },
    [FETCH_PRICES_FAIL]: (state) => {
        state.status = 'failed'
    },
    [UPDATE_OPTION_FROM]: (state, action) => {
        state.selectedOptionFrom = action.payload
    },
    [UPDATE_OPTION_TO]: (state, action) => {
        state.selectedOptionTo = action.payload
    },
    [UPDATE_CONVERT_AMOUNT_AREA]: (state, action) => {
        state.convertAmount = action.payload
    },
    [UPDATE_CASH_ADD_OPTION]: (state, action) => {
        state.selectedOptionCashAdd = action.payload
        console.log(state.selectedOptionCashAdd)
    },
    [UPDATE_CASH_ADD_AMOUNT_AREA]: (state, action) => {
        state.cashAmountToAdd = action.payload
        console.log(state.cashAmountToAdd)
    },
    [CASH_ADD_BUTTON]: (state) => {
        state.accounts.find(account => account.currency === state.selectedOptionCashAdd.value).value = state.accounts.find(account => account.currency === state.selectedOptionCashAdd.value).value + Number(state.cashAmountToAdd)
    },
    [FETCH_PRICE_CHANGE]: (state) => {
        if (state.changesStatus === 'waiting'){
            state.changesStatus = 'loading'
        }
    },
    [FETCH_PRICE_CHANGE_SUCCES]: (state, action) => {
        if (state.changesStatus === 'loading') {
            state.pricesChanges = action.payload.prices
            state.status = 'loaded'
            state.pricesChanges =  state.pricesChanges.map(price => ({time: price[0], price: price[1]}))
            console.log(state.pricesChanges)
        }
    }
})


