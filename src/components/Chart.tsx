import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';


export default (props) => {
    return (
        <div>
            <LineChart width={1000} height={550} data={props.chartArray}>
                <XAxis domain={['auto', 'auto']} />
                <YAxis domain={[0, 100]} />
                {/* <YAxis hide yAxisId='WT' dataKey='WT' /> */}
                {/* <YAxis hide yAxisId='OT' dataKey='OT' /> */}
                {/* <YAxis hide yAxisId='CP' dataKey='CP' /> */}
                {/* <YAxis hide yAxisId='TP' dataKey='TP' /> */}
                {/* <YAxis hide yAxisId='IVO' dataKey='IVO' /> */}

                <Tooltip />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                {/* <Line type="monotone" dataKey="IVO" stroke="#8884d8" isAnimationActive={false} /> */}
                {/* <Line type="monotone"  dataKey="CP" stroke="#82ca9d" isAnimationActive={false} /> */}
                {/* <Line type="monotone" dataKey="TP" stroke="#f2a353" isAnimationActive={false} /> */}
                <Line type="monotone" dataKey="WT" stroke="#7ce348" isAnimationActive={false} />
                {/* <Line type="monotone" dataKey="FT" stroke="#f42b3f" isAnimationActive={false} /> */}
                {/* <Line type="monotone" dataKey="OT" stroke="#311eff" isAnimationActive={false} /> */}

            </LineChart>
        </div>
    )
}