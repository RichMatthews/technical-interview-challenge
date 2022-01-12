import * as React from 'react'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Home } from './index'
import * as hooks from 'hooks/useCustomQuery'

describe('Home Component', () => {
    it('renders the title correctly', () => {
        render(<Home />, { wrapper: MemoryRouter })

        expect(screen.getByText('Dog breeds')).toBeTruthy()
    })

    it('renders the dogs returned from the API and the ability to add another dog', () => {
        jest.spyOn(hooks, 'useCustomQuery').mockReturnValue({
            data: [
                { id: 'german_shepherd', image: 'germanshepherd.jpg' },
                { id: 'border_collie', image: 'bordercollie.jpg' },
            ],
        })

        render(<Home />, { wrapper: MemoryRouter })

        expect(screen.getByText('German Shepherd')).toBeTruthy()
        expect(screen.getByText('Border Collie')).toBeTruthy()
        expect(screen.getByText('+')).toBeTruthy()
    })
})
