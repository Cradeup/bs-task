import './crypto-element.css'

export function CryptoElement(props) {
    return (
        <div className='crypto-element-par'>
            <div className='side'></div>
            <div className='element-column'>
                {props.name}
            </div>
            <div className='element-column'>
                {'$'+ props.price}
            </div>
            <div className='element-column'>
                {props.change24h + '%'}
            </div>
            <div className='side'></div>
        </div>
    )
}