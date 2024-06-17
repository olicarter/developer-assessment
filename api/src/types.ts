export interface BusTime {
  id: number;
  busId: number;
  destination: string;
  minutesUntilArrival: number;
  nonOperationalDays: number[];
}

export enum Order {
  Asc = 'asc',
  Desc = 'desc',
}

export type SortBy<T> = keyof T;
