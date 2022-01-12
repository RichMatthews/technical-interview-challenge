import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ContentPage } from './index'
import * as hooks from 'hooks/useCustomQuery'

jest.mock('react-router-dom', () => ({
    useParams: () => ({
        dogId: 'german_shepherd',
    }),
}))

describe('ContentPage Component', () => {
    it('renders the correct dog', () => {
        jest.spyOn(hooks, 'useCustomQuery').mockReturnValue({
            data: [
                { id: 'german_shepherd', image: 'germanshepherd.jpg' },
                { id: 'border_collie', image: 'bordercollie.jpg' },
            ],
        })

        render(<ContentPage />, { wrapper: MemoryRouter })

        expect(screen.getByText('German Shepherd')).toBeTruthy()
    })
})
