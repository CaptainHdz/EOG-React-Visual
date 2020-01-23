import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';


export default (props) => {
    return (
        <div>
            <LineChart width={1000} height={550}>
                <XAxis domain={[0, 1000]} />
                <YAxis domain={['auto', 1000]} />
                <Legend />
                <Tooltip />
                {/* <CartesianGrid stroke="#ccc" strokeDasharray="5 5" /> */}
                <Line dot={false} data={props.IVOData}  type="monotone" dataKey="injValveOpen" stroke="#E7E648" isAnimationActive={false} />
                <Line dot={false} data={props.CPData} type="monotone"  dataKey="casingPressure" stroke="#82ca9d" isAnimationActive={false} />
                <Line dot={false} data={props.TPData} type="monotone" dataKey="tubingPressure" stroke="#f2a353" isAnimationActive={false} />
                <Line dot={false} data={props.waterData} type="monotone" dataKey="waterTemp" stroke="#7ce348" isAnimationActive={false} />
                <Line dot={false} data={props.flareData} type="monotone" dataKey="flareTemp" stroke="#f42b3f" isAnimationActive={false} />
                <Line dot={false} data={props.oilData} type="monotone" dataKey="oilTemp" stroke="#311eff" isAnimationActive={false} />

            </LineChart>
        </div>
    )
}