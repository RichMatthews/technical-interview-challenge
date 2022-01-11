import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

const Image = styled.img`
  maxWidth: '500px', maxHeight: '500px'
`

export const ContentPage = () => {
    const { dogId } = useParams()

    return (
        <div>
            <h3>{dogId}</h3>
            <Image src={`http://localhost:3000/images/${dogId}.jpg`} alt={dogId} />
        </div>
    )
}
