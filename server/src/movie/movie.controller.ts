import { Controller, Get, Query } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {

    constructor(private readonly movieService: MovieService) {}
    @Get()
    async getMovie(@Query() query: { i?: string; t?: string; type?: string; y?: string; plot?: string; r?: string }) {
      return this.movieService.fetchMovie(query);
    }
}
