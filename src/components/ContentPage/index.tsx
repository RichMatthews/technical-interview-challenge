import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { formatName } from 'utils/formatName'

const Container = styled.div`
    height: 200px;
    width: 200px;
`

const Image = styled.img`
    max-height: 500px;
    max-width: 500px;
`

export const ContentPage = () => {
    const [dog, setDog] = useState(null)
    const { dogId } = useParams()

    useEffect(() => {
        fetch('http://localhost:4000/dogs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `query GetDogs{
                    dogs
                }`,
            }),
        })
            .then((res) => res.json())
            .then((res) => JSON.parse(res?.data.dogs))
            .then((dogs) => setDog(dogs.find((dog) => dog.id === dogId)))
    }, [dogId])

    return (
        <Container>
            <h3>{formatName(dog?.id)}</h3>
            <Image src={`http://localhost:3000/images/${dogId}.jpg`} alt={dogId} />
        </Container>
    )
}
