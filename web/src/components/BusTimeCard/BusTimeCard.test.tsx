import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BusTimeCard, BusTimeCardProps } from './BusTimeCard'
import '@testing-library/jest-dom'

describe('BusTimeCard', () => {
  const mockProps: BusTimeCardProps = {
    busId: 42,
    id: 123,
    destination: 'Central Station',
    minutesUntilArrival: 10,
  }

  it('renders title correctly', () => {
    render(<BusTimeCard {...mockProps} />)
    expect(screen.getByText('42')).toBeInTheDocument()
  })

  it('renders destination correctly', () => {
    render(<BusTimeCard {...mockProps} />)
    expect(screen.getByText('To Central Station')).toBeInTheDocument()
  })

  it('displays "Due" when minutesUntilArrival is 0', () => {
    render(<BusTimeCard {...mockProps} minutesUntilArrival={0} />)
    expect(screen.getByText('Due')).toBeInTheDocument()
  })

  it('displays "Due" when minutesUntilArrival is 1', () => {
    render(<BusTimeCard {...mockProps} minutesUntilArrival={1} />)
    expect(screen.getByText('Due')).toBeInTheDocument()
  })

  it('displays correct minutes when minutesUntilArrival is greater than 1', () => {
    render(<BusTimeCard {...mockProps} minutesUntilArrival={5} />)
    expect(screen.getByText('5 mins')).toBeInTheDocument()
  })

  it('displays a large number of minutes correctly', () => {
    render(<BusTimeCard {...mockProps} minutesUntilArrival={9999} />)
    expect(screen.getByText('9999 mins')).toBeInTheDocument()
  })
})
