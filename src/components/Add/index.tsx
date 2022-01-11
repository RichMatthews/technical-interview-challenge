import React from 'react'
import { useMemo } from 'react'
import styled from 'styled-components'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
}`

const DogBreedInput = styled.input`
  margin-bottom: 10px;
  padding: 5px;
  width: 200px;
}`

const FileInput = styled.input`
    background: transparent;
    margin-bottom: 10px;
`

const Button = styled.button`
    background: white;
    border: 1px solid black;
    border-radius: 5px;
    padding: 5px;
`

export const Add = () => {
    const [selectedFile, setSelectedFile] = useState<File>()
    const [dogBreed, setDogBreed] = useState('')

    const navigate = useNavigate()

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFile(event.target.files[0])
    }

    const endpoint = useCallback(() => {
        const formData = new FormData()
        formData.append('file123', selectedFile)

        fetch('http://localhost:4000/upload', {
            method: 'POST',
            body: formData,
        })
            .then((r) => r.json())
            .then(() => navigate('/'))
            .catch((e) => console.log(e))
    }, [navigate, selectedFile])

    const setBreed = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDogBreed(event.target.value)
    }

    const disabled = useMemo(() => {
        return dogBreed.length === 0 || selectedFile === undefined
    }, [dogBreed.length, selectedFile])

    return (
        <Container>
            <h3>Add a new dog breed</h3>
            <DogBreedInput placeholder="add dog breed" onChange={setBreed} />
            <FileInput type="file" name="file123" onChange={changeHandler} />
            <Button onClick={endpoint} disabled={disabled}>
                Submit dog breed
            </Button>
        </Container>
    )
}
