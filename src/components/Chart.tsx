import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';


export default (props) => {
    return (
        <div>
            <LineChart width={1000} height={550}>
                <XAxis domain={['auto', 1000]} />
                {/* <YAxis domain={['auto', 1000]} /> */}
                <Legend />
                <Tooltip />

                {props.IVOShow &&
                <YAxis yAxisId='IVO' domain={['auto', 'auto']} />
                }
                {props.IVOShow && 
                <Line yAxisId='IVO' dot={false} data={props.IVOData}  type="monotone" dataKey="injValveOpen" stroke="#E7E648" isAnimationActive={false} />
                }

                {props.CPShow &&
                <YAxis yAxisId='CP' domain={['auto', 'auto']} />
                }
                {props.CPShow && 
                <Line yAxisId='CP' dot={false} data={props.CPData} type="monotone"  dataKey="casingPressure" stroke="#82ca9d" isAnimationActive={false} />
                }

                {props.TPShow &&
                <YAxis yAxisId='TP' domain={['auto', 'auto']} />
                }
                {props.TPShow && 
                <Line yAxisId='TP' dot={false} data={props.TPData} type="monotone" dataKey="tubingPressure" stroke="#f2a353" isAnimationActive={false} />
                }

                {props.WTShow &&
                <YAxis yAxisId='WT' domain={['auto', 'auto']} />
                }
                {props.WTShow && 
                <Line yAxisId='WT' dot={false} data={props.waterData} type="monotone" dataKey="waterTemp" stroke="#7ce348" isAnimationActive={false} />      }

                {props.FTShow &&
                <YAxis yAxisId='FT' domain={['auto', 'auto']} />
                }
                {props.FTShow && 
                <Line yAxisId='FT' dot={false} data={props.flareData} type="monotone" dataKey="flareTemp" stroke="#f42b3f" isAnimationActive={false} />      }

                {props.OTShow &&
                <YAxis yAxisId='OT' domain={['auto', 'auto']} />
                }
                {props.OTShow && 
                <Line yAxisId='OT' dot={false} data={props.oilData} type="monotone" dataKey="oilTemp" stroke="#311eff" isAnimationActive={false} /> 
                }
            </LineChart>
        </div>
    )
}