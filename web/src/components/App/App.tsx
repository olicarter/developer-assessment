import { BusTimeCardList } from '@/components/BusTimeCardList'
import classes from './App.module.css'

export function App() {
  return (
    <div className={classes.App}>
      <header>
        <h3 className={classes.Title}>
          Live bus times for <b>Park Road</b>
        </h3>
      </header>
      <BusTimeCardList />
    </div>
  )
}
