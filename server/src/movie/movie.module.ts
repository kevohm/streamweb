import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';

@Module({
  imports:[],
  providers: [MovieService],
  controllers: [MovieController]
})
export class MovieModule {}
