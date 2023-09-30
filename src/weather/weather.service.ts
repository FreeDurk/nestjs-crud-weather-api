import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, catchError } from 'rxjs';
@Injectable()
export class WeatherService {
  constructor(private readonly httpService: HttpService) {}
  weather(query) {
    if (!query.location) {
      query.location = 'Cebu';
    }

    return this.httpService
      .get('/current.json?q=' + query.location + '&aqi=' + query.aqi)
      .pipe(map((res) => res.data))
      .pipe(
        catchError((err) => {
          throw new HttpException(err.response.data, err.response.status);
        }),
      );
  }

  history(query: any) {
    return this.httpService
      .get(
        '/history.json?q=' +
          query.location +
          '&dt=' +
          query.dt +
          '&end_dt=' +
          query.end_dt +
          '&aqi=' +
          query.aqi,
      )
      .pipe(map((res) => res.data))
      .pipe(
        catchError((err) => {
          throw new HttpException(err.response.data, err.response.status);
        }),
      );
  }

  future(query: any) {
    return this.httpService
      .get(
        '/future.json?q=' +
          query.location +
          '&dt=' +
          query.dt +
          '&end_dt=' +
          query.end_dt +
          '&aqi=' +
          query.aqi,
      )
      .pipe(map((res) => res.data))
      .pipe(
        catchError((err) => {
          throw new HttpException(err.response.data, err.response.status);
        }),
      );
  }

  timezone(query: any) {
    return this.httpService
      .get('/timezone.json?q=' + query.location)
      .pipe(map((res) => res.data))
      .pipe(
        catchError((err) => {
          throw new HttpException(err.response.data, err.response.status);
        }),
      );
  }
}
