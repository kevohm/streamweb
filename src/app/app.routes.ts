import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VideoComponent } from './video/video.component';

export const routes: Routes = [
    {
        path:"",
        component: HomeComponent
    },
    {
        path:":id",
        component: VideoComponent
    },
];
