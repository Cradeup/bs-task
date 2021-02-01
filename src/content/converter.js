import Select from 'react-select'
import './content.css'
import { connect } from "react-redux";
import React from 'react'
import { upadteConvertAmountArea, updateSelectOptionFrom, updateSelectOptionTo } from '../actions/actions';

function Converter(props) {
    let options = [
        { value: 'usd', label: 'USD' },
        { value: 'btc', label: 'BTC' },
        { value: 'eth', label: 'ETH' },
    ]
    function handleChangeFrom(value) {
        props.updateSelectOptionFrom(value)
    }

    function handleChangeTo(value) {
        props.updateSelectOptionTo(value)
    }

    function onAmountChange(value) {
        props.upadteConvertAmountArea(convertAmount.current.value)
    }
    let convertResult

    if (props.currency && props.from && props.to) {
        convertResult = '= ' + props.convertAmount * props.currency.find(element => element.symbol === props.from.value).current_price / props.currency.find(element => element.symbol === props.to.value).current_price 
    }
    if (!props.from || !props.to){
        convertResult = 'Select the currency to convert'
    }
    let convertAmount = React.createRef();
    return (
        <div className='converter-par'>
            <div className='converter-name'>
                Converter
            </div>
            <div>
                <Select placeholder='Select currency...' options={options} onChange={handleChangeFrom} />
            </div>
            <input type='number' className='convert-unput-area' onChange={onAmountChange} value={props.convertAmount} ref={convertAmount} placeholder="Enter the amount..." />
            <div>
                <Select placeholder='Select currency...' options={options} onChange={handleChangeTo} />
            </div>
            <div className="convert_result">{convertResult}</div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        from: state.pricesReducer.selectedOptionFrom,
        to: state.pricesReducer.selectedOptionTo,
        result: state.pricesReducer.convertResult,
        convertAmount: state.pricesReducer.convertAmount,
        convertResult: state.pricesReducer.convertResult,
        currency: state.pricesReducer.prices
    }
}

export default connect(mapStateToProps, { updateSelectOptionFrom, updateSelectOptionTo, upadteConvertAmountArea })(Converter)