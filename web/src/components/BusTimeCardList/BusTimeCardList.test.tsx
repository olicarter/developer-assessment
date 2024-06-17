import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { setupServer } from 'msw/node'
import { HttpResponse, http } from 'msw'
import { BusTimeCardList } from './BusTimeCardList'
import '@testing-library/jest-dom'

const mockBusTimes = [
  {
    id: '1',
    busId: '1',
    destination: 'Downtown',
    minutesUntilArrival: 5,
  },
  {
    id: '2',
    busId: '2',
    destination: 'Uptown',
    minutesUntilArrival: 10,
  },
]

const server = setupServer(
  http.get(`${import.meta.env.VITE_API_URL}/bus-times`, () => {
    return HttpResponse.json(mockBusTimes)
  }),
)

vi.mock('@/components/BusTimeCard', () => ({
  BusTimeCard: ({
    busId,
    destination,
    minutesUntilArrival,
  }: {
    busId: string
    destination: string
    minutesUntilArrival: number
  }) => (
    <div data-testid="BusTimeCard">
      <h4>{busId}</h4>
      <p>{destination}</p>
      <p>{minutesUntilArrival} mins</p>
    </div>
  ),
}))

describe('BusTimeCardList Component', () => {
  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' })
  })

  beforeEach(() => {
    vi.spyOn(global, 'fetch')
  })

  afterAll(() => {
    server.close()
  })

  afterEach(() => {
    vi.clearAllMocks()
    server.resetHandlers()
  })

  it('fetches and displays bus times', async () => {
    render(<BusTimeCardList />)
    expect(global.fetch).toHaveBeenCalledTimes(1)
    await waitFor(() => {
      expect(screen.getAllByTestId('BusTimeCard')).toHaveLength(
        mockBusTimes.length,
      )
    })
    mockBusTimes.forEach(busTime => {
      expect(screen.getByText(busTime.busId)).toBeInTheDocument()
      expect(screen.getByText(busTime.destination)).toBeInTheDocument()
      expect(
        screen.getByText(`${busTime.minutesUntilArrival} mins`),
      ).toBeInTheDocument()
    })
  })

  it('polls bus times every 10 seconds', async () => {
    vi.useFakeTimers()
    render(<BusTimeCardList />)
    expect(global.fetch).toHaveBeenCalledTimes(1)
    vi.advanceTimersByTime(10000)
    expect(global.fetch).toHaveBeenCalledTimes(2)
    vi.useRealTimers()
  })

  it('clears the polling interval on unmount', () => {
    vi.useFakeTimers()
    const clearIntervalSpy = vi.spyOn(global, 'clearInterval')
    const { unmount } = render(<BusTimeCardList />)
    unmount()
    expect(clearIntervalSpy).toHaveBeenCalledTimes(1)
    vi.useRealTimers()
  })
})
