'use client';

import { useState } from 'react';

import { getRequest } from '@/api/helpers';

export const Test = () => {
    const [data, setData] = useState<any>(null);


    const getData = async () => {
        const response = await getRequest('/test');

        setData(response);
    };

    return (
        <>
            <div>{data?.message}</div>
            <button onClick={getData}>get data</button>
        </>
    );
};
