import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { App } from './App'
import '@testing-library/jest-dom'

vi.mock('@/components/BusTimeCardList', () => ({
  BusTimeCardList: () => <div data-testid="BusTimeCardList" />,
}))

describe('App Component', () => {
  it('contains the correct title', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      'Live bus times for Park Road',
    )
  })

  it('renders the BusTimeCardList component', () => {
    render(<App />)
    expect(screen.getByTestId('BusTimeCardList')).toBeInTheDocument()
  })
})
