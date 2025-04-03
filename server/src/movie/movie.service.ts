import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class MovieService {
  
  constructor(private configService: ConfigService) {}
  
  async fetchMovie(query: { i?: string; t?: string; type?: string; y?: string; plot?: string; r?: string }) {
    const { i, t, type, y, plot, r } = query;
    const apiKey = this.configService.get<string>('OMDB_API_KEY');
    const baseUrl = this.configService.get<string>('OMDB_API_URL');

    if (!i && !t) {
      throw new HttpException("Either 'i' (IMDb ID) or 't' (Title) is required.", HttpStatus.BAD_REQUEST);
    }
    if(!baseUrl || !apiKey){
      Logger.error("Invalid url (base_url)", 'MovieService')
      throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    try {
      const response = await axios.get(baseUrl, {
        params: { apikey: apiKey, i, t, type, y, plot: plot || 'short', r: r || 'json' },
      });

      return response.data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
