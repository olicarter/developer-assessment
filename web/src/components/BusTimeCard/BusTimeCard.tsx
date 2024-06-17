import { type BusTime } from '@/types'
import classes from './BusTimeCard.module.css'

export interface BusTimeCardProps extends BusTime {}

export function BusTimeCard(props: BusTimeCardProps) {
  return (
    <div className={classes.Card}>
      <header>
        <h4 className={classes.CardTitle}>{props.busId}</h4>
      </header>
      <div className={classes.CardDetails}>
        <span>To {props.destination}</span>
        <span>
          {props.minutesUntilArrival <= 1
            ? 'Due'
            : `${props.minutesUntilArrival} mins`}
        </span>
      </div>
    </div>
  )
}
