import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  getWeather(@Query() query: any) {
    return this.weatherService.weather(query);
  }

  @Get('history')
  getHistory(@Query() query: any) {
    return this.weatherService.history(query);
  }

  @Get('future')
  getFuture(@Query() query: any) {
    return this.weatherService.future(query);
  }

  @Get('timezone')
  getTimeZone(@Query() query: any) {
    return this.weatherService.timezone(query);
  }
}
