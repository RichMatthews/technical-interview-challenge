import { useEffect, useState } from 'react'

type args = {
    endpoint: string
    body: any
    dataPoint?: string
}

export const useCustomQuery = <T>({ endpoint, body, dataPoint }: args) => {
    const [data, setData] = useState<T>()
    useEffect(() => {
        fetch(`http://localhost:4000/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body,
        })
            .then((res) => res.json())
            .then((res) => {
                if (dataPoint) {
                    setData(JSON.parse(res.data[dataPoint]))
                }
            })
    }, [endpoint, body, dataPoint])

    return { data }
}
