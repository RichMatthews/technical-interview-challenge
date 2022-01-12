import React from 'react'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useCustomQuery } from 'hooks/useCustomQuery'
import { Dog } from 'types'
import { formatName } from 'utils/formatName'
import { query } from 'queries/getDogs'

const Container = styled.div`
    height: 200px;
    width: 200px;
`

const Image = styled.img`
    max-height: 500px;
    max-width: 500px;
`

export const ContentPage = () => {
    const { dogId } = useParams()
    const { data } = useCustomQuery<Dog[]>({
        endpoint: 'dogs',
        body: JSON.stringify({
            query,
        }),
        dataPoint: 'dogs',
    })

    const dog: Dog = useMemo(() => data?.find((dog: Dog) => dog.id === dogId), [data, dogId])

    return (
        <Container>
            <h3>{formatName(dog?.id)}</h3>
            <Image src={`http://localhost:3000/images/${dog?.image}`} alt={dogId} />
        </Container>
    )
}
