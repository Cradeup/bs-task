import { calculateTotal, updateSelectOptionCashAdd, updateCashAddAmountArea, cashAddButton } from '../actions/actions'
import './content.css'
import { connect } from "react-redux";
import Select from 'react-select'
import React from 'react'

function Balance(props) {
    let options = [
        { value: 'usd', label: 'USD' },
        { value: 'btc', label: 'BTC' },
        { value: 'eth', label: 'ETH' },
    ]
    if (props.status === 'loaded') {
        props.calculateTotal()
    }
    function handleSelectCurrencyToCashAdd(value) {
        props.updateSelectOptionCashAdd(value)
    }
    function cashAddAmountChange(value) {
        props.updateCashAddAmountArea(cashAddAmount.current.value)
    }
    function addCashButton() {
        if (props.selectedOptionCashAdd && props.cashAmountToAdd) {
            props.cashAddButton()
        }
    }
    let cashAddAmount = React.createRef();
    let balance = props.balance.map(account => <div key={account.currency}>{account.currency + ': ' + account.value}</div>)
    return (
        <div className='user-balance'>
            <div className='balance-name'>
                Your balance
            </div>
            {balance}
            <div className='cash-add'>
                <Select placeholder='Currency...' options={options} onChange={handleSelectCurrencyToCashAdd} />
                <input className='cash-add-input' type='number' onChange={cashAddAmountChange} value={props.convertAmount} ref={cashAddAmount} placeholder="Enter the amount..." />
                <button className='cash-add-button' onClick={addCashButton}>Add</button>
            </div>
        </div>
    )
}
function mapStateToProps(state) {
    return {
        balance: state.pricesReducer.accounts,
        status: state.pricesReducer.status,
        selectedOptionCashAdd: state.pricesReducer.selectedOptionCashAdd,
        cashAmountToAdd: state.pricesReducer.cashAmountToAdd
    }
}
export default connect(mapStateToProps, { calculateTotal, updateSelectOptionCashAdd, updateCashAddAmountArea, cashAddButton })(Balance)