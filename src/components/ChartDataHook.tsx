import React from 'react';
import {useSubscription} from '@apollo/react-hooks';
import {useState} from 'react';
import { gql } from 'apollo-boost';

//This is a prototype that I have not implemented

const GET_MEASUREMENTS = gql`subscription{newMeasurement{
    metric,
    value,
    at,
    unit
  }
  }`;

export default () => {
    const {data: data, loading} = useSubscription(GET_MEASUREMENTS)
    const [flareTemp, setFlareTemp] = useState(0)

    // if (!loading) {
    //     console.log(data.newMeasurement.metric, data.newMeasurement.value)
    //     if (data.newMeasurement.metric === 'flareTemp') {
    //         setTimeout(() => setFlareTemp(data.newMeasurement.value), 250 )
    //     }
    // }

    return (
    <div>
        <h2>Flare Temp: {flareTemp}</h2>
    </div>
    )
}