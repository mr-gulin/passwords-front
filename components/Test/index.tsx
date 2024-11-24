'use client';

import { useState } from 'react';

import { useApi } from '@/api/helpers';

interface IProps {
    apiUrl: string;
}

export const Test = ({ apiUrl }: IProps) => {
    const { GET } = useApi(apiUrl);
    const [data, setData] = useState<any>(null);


    const getData = async () => {
        const response = await GET('/test/');

        setData(response);
    };

    return (
        <>
            <div>{data?.message}</div>
            <button onClick={getData}>get data</button>
        </>
    );
};
