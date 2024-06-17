import { Controller, Get, Query } from '@nestjs/common';
import { ApiService } from '@/api.service';
import { Order, type BusTime, type SortBy } from '@/types';

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('/bus-times')
  getBusTimes(
    @Query('day') day: string,
    @Query('order') order: Order,
    @Query('sort_by') sortBy: SortBy<BusTime>,
  ) {
    // TODO: Validate query parameters
    return this.apiService.getBusTimes({ day: Number(day), order, sortBy });
  }
}
