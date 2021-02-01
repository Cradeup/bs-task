import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { connect } from "react-redux";

function ChangeGraph(props) {
    return (
        <LineChart width={540} height={160} data={props.pricesChanges} >
            <XAxis dataKey="time" tickFormatter={timeStr => new Date(timeStr).toLocaleDateString()} />
            <YAxis />
            <Tooltip labelFormatter={(value, name) => new Date(value).toLocaleDateString()} />
            <Line type='monotone' dataKey='price' stroke="#82ca9d" />
        </LineChart>
    )
}

function mapStateToProps(state) {
    return {
        pricesChanges: state.pricesReducer.pricesChanges,
    }
}

export default connect(mapStateToProps, null)(ChangeGraph)