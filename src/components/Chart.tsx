import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';


export default (props) => {
    return (
        <div>
            <LineChart width={1000} height={500} data={props.chartArray}>
                <XAxis />
                <YAxis dataKey={props.dataKey} />
                <Tooltip />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Line  type="monotone" dataKey="y" stroke="#8884d8" isAnimationActive={false} />
                <Line  type="monotone" dataKey="y" stroke="#82ca9d" isAnimationActive={false} />
                <Line  type="monotone" dataKey="y" stroke="#f2a353" isAnimationActive={false} />
                <Line  type="monotone" dataKey="y" stroke="#7ce348" isAnimationActive={false} />
                <Line  type="monotone" dataKey="y" stroke="#f42b3f" isAnimationActive={false} />
                <Line  type="monotone" dataKey="y" stroke="#311eff" isAnimationActive={false} />

            </LineChart>
        </div>
    )
}