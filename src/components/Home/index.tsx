import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { formatName } from 'utils/formatName'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
`

const ItemsContainer = styled.div`
    display: grid;
    grid-gap: 1px;
    grid-template-columns: repeat(3, 1fr);
`

const Item = styled.div`
    align-items: center;
    color: black;
    border: 1px solid black;
    border-radius: 5px;
    display: flex;
    font-family: montserrat;
    justify-content: center;
    height: 160px;
    margin: 5px;
    padding: 10px;
    width: 160px;
`

const StyledLink = styled(Link)`
    padding: 5;
    text-decoration: none;
`

export const Home = () => {
    const [images, setImages] = useState([])

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
            .then((res) => setImages(JSON.parse(res?.data.dogs)))
    }, [])

    return (
        <Container>
            <h3 style={{ fontFamily: 'montserrat' }}>Dog breeds</h3>
            <ItemsContainer>
                {images.map((dog) => (
                    <StyledLink to={`${dog.id}`}>
                        <Item>{formatName(dog.id)}</Item>
                    </StyledLink>
                ))}
                <StyledLink to="/add">
                    <Item>+</Item>
                </StyledLink>
            </ItemsContainer>
        </Container>
    )
}
