import { connect } from "react-redux";
import { fetchPrices } from "../actions/actions";
import Balance from "./balance";
import './content.css'
import Converter from "./converter";
import { CryptoElement } from "./crypto-element";
import SecondPage from "./second-page";

function Content(props) {
    if (props.status === 'waiting') {
        props.fetchPrices()
    }
    let cryptoElements
    if (props.content) {
        cryptoElements = props.content.map(item => <CryptoElement name={item.name} price={item.current_price} change24h={item.price_change_percentage_24h} key={item.name} />)
    }
    let contentPar = document.getElementById("content-par")
    function swipeAnimation() {
        contentPar.style.left = -640 + "px"
    }

    return (
        <div>
            <div id="content-par">
                <div className='first-page'>
                    <header>
                        <button className="button-left" onClick={swipeAnimation}>2 Page</button>
                        <div className='columns'>
                            <div className='leftside'></div>
                            <div className='column'>Name</div>
                            <div className='column'>Price</div>
                            <div className='column'>24h</div>
                            <div className='side'></div>
                        </div>
                        <div className='line'></div>
                    </header>
                    <div className='content-inner'>
                        {cryptoElements}
                    </div>
                    <div className='line'></div>
                    <Balance />
                    <Converter />
                </div>
                <SecondPage />
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        content: state.pricesReducer.prices,
        status: state.pricesReducer.status,
        accounts: state.pricesReducer.accounts
    }
}


export default connect(mapStateToProps, { fetchPrices })(Content)