import './second-page-content.css'
import { connect } from "react-redux";
import Chart from './radial-chart'
import { fetchPriceChange } from '../actions/actions';
import Select from 'react-select'
import ChangeGraph from './change-graph'

function SecondPage(props) {
    let options = [
        { value: 'BTC', label: 'bitcoin' },
        { value: 'ETH', label: 'ethereum' }
    ]
    let contentPar = document.getElementById("content-par")
    function swipeAnimation() {
        contentPar.style.left = 0 + "px"
    }
    let currency
    let reduce
    if (props.content) {
        currency = props.balance.map(account => ({ name: account.currency, value: account.value * props.content.find(currency => currency.symbol === account.currency).current_price }))
        reduce = currency.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0).toFixed(1)
    }
    if (props.changesStatus === 'waiting') {
        props.fetchPriceChange('bitcoin')
    }

    function fetchChanges(value) {
        props.fetchPriceChange(value.label)
    }
    return (
        <div className='second-page'>
            <div className='second-page-content'>
                <button className="button-right" onClick={swipeAnimation}>1 Page</button>
                <div>
                    <Chart props={currency} />
                </div>
                <div className='change-graph'>
                    <div>Currency change</div>
                    <div className='change-graph-line'></div>
                    <Select placeholder='Select currency...' className='chage-graph-select' options={options} onChange={fetchChanges} />
                    <ChangeGraph />
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        balance: state.pricesReducer.accounts,
        content: state.pricesReducer.prices,
        pricesChanges: state.pricesReducer.pricesChanges,
        changesStatus: state.pricesReducer.changesStatus,
    }
}

export default connect(mapStateToProps, { fetchPriceChange })(SecondPage)