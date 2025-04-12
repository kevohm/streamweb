import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { TvShowDetailsComponent } from './tv-show-details/tv-show-details.component';
import { WatchComponent } from './watch/watch.component';
import { TrailerComponent } from './trailer/trailer.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "movie/:id",
        component: MovieDetailsComponent
    },
    {
        path: "tv-show/:id",
        component: TvShowDetailsComponent
    },
    {
        path: "watch/:id",
        component: WatchComponent
    },
    {
        path: "trailer/:id",
        component: TrailerComponent
    }
];

