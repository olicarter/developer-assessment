import { Injectable } from '@nestjs/common';
import { orderBy, random } from 'lodash';
import { Order, SortBy, type BusTime } from './types';

@Injectable()
export class ApiService {
  getBusTimes({
    day,
    order = Order.Asc,
    sortBy = 'minutesUntilArrival',
  }: {
    day: number;
    order?: Order;
    sortBy?: SortBy<BusTime>;
  }) {
    const busTimes = this.generateRandomBusTimes(5);
    const busTimesForDay = this.filterBusTimesForDay(busTimes, day);
    return orderBy(busTimesForDay, sortBy, order);
  }

  filterBusTimesForDay(busTimes: BusTime[], day: number) {
    return busTimes.filter((busTime) => {
      return !busTime.nonOperationalDays.includes(day);
    });
  }

  private generateRandomBusTimes(timesToGenerate: number) {
    let data: BusTime[] = [];
    for (let i = 0; i < timesToGenerate; i++) {
      const {
        id: busId,
        destination,
        nonOperationalDays,
      } = this.getRandomBusRoute();
      data.push({
        id: i,
        busId,
        destination,
        minutesUntilArrival: random(1, 15),
        nonOperationalDays,
      });
    }
    return data;
  }

  private getRandomBusRoute() {
    const busRoutes = [
      { id: 176, destination: 'Newham Close', nonOperationalDays: [1, 3] },
      { id: 185, destination: 'Train Station', nonOperationalDays: [5, 2] },
      {
        id: 193,
        destination: 'Shopping Centre',
        nonOperationalDays: [1, 5, 4],
      },
    ];
    return busRoutes[random(0, busRoutes.length - 1)];
  }
}
