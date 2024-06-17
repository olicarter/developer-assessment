import { useEffect, useState } from 'react'
import { BusTimeCard } from '@/components/BusTimeCard'
import { type BusTime } from '@/types'
import classes from './BusTimeCardList.module.css'

async function fetchBusTimes() {
  const url = new URL(`${import.meta.env.VITE_API_URL}/bus-times`)
  url.searchParams.set('day', '1')
  url.searchParams.set('order', 'asc')
  url.searchParams.set('sort_by', 'minutesUntilArrival')
  try {
    const response = await fetch(url)
    return await response.json()
  } catch (error) {
    // Improve error handling
    return []
  }
}

export function BusTimeCardList() {
  const [busTimes, setBusTimes] = useState<BusTime[]>([])

  useEffect(() => {
    fetchBusTimes().then(setBusTimes)
    // Poll bus times every 10 seconds
    const interval = setInterval(() => {
      fetchBusTimes().then(setBusTimes)
    }, 10000)
    // Stop polling when component unmounts
    return () => clearInterval(interval)
  }, [])

  return (
    <ul className={classes.BusTimeCardList}>
      {busTimes.map(busTime => (
        <BusTimeCard key={busTime.id} {...busTime} />
      ))}
    </ul>
  )
}
