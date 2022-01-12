import { useCustomQuery } from 'hooks/useCustomQuery'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { query } from 'queries/getDogs'
import { Dog } from 'types'
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
    justify-content: center;
    height: 160px;
    margin: 5px;
    padding: 10px;
    width: 160px;
`

const StyledLink = styled(Link)`
    padding: 5px;
    text-decoration: none;
`

export const Home = () => {
    const { data } = useCustomQuery<Dog[]>({
        endpoint: 'dogs',
        body: JSON.stringify({
            query,
        }),
        dataPoint: 'dogs',
    })

    return (
        <Container>
            <h3>Dog breeds</h3>
            <ItemsContainer>
                {data?.map((dog: Dog) => (
                    <StyledLink to={`${dog.id}`} key={dog?.id}>
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
