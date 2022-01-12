import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from 'components/Home'
import { ContentPage } from 'components/ContentPage'
import { Add } from 'components/Add'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

type ThemeType = {
    fontFamily: 'string'
}

const GlobalStyle = createGlobalStyle<{ theme: ThemeType }>`
  * {
    font-family: ${({ theme }) => theme.fontFamily};
  }
`

export const App = () => {
    return (
        <ThemeProvider theme={{ fontFamily: 'Montserrat' }}>
            <>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path=":dogId" element={<ContentPage />} />
                        <Route path="/add" element={<Add />} />
                    </Routes>
                </BrowserRouter>
                <GlobalStyle />
            </>
        </ThemeProvider>
    )
}
