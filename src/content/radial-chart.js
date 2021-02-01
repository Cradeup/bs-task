import {
    PieChart, Pie, Legend, Tooltip,
} from 'recharts';
import './second-page-content.css'

export default function Chart(props) {
    let data = props.props
    return (
        <div className='chart'>
            Distribution of your currencies
            <div className='distr-line'> </div>
            <PieChart width={150} height={150}>
                <Pie dataKey="value" data={data} cx={60} cy={60} outerRadius={60} fill="#8884d8"></Pie>
                <Tooltip />
            </PieChart>
        </div>
    )
} 
