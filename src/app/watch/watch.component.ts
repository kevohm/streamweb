import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-watch',
  imports: [],
  templateUrl: './watch.component.html',
  styleUrl: './watch.component.css'
})
export class WatchComponent {
  videoId?:string 
  videoType?:string
  sources = {
    vidsrc:"https://vidsrc.xyz/embeded",
    videasy:"https://player.videasy.net"
  }
  currentSource = "vidsrc"
  safeUrl?: SafeResourceUrl;

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {
   
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const type = this.route.snapshot.queryParamMap.get('type');
    if(id && type && ["tv","movie"].includes(type)){
      this.videoId = id
      this.videoType = type
      const url = `https://vidsrc.xyz/embeded/${this.videoType}/${this.videoId}?autoPlay=false`;
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }
}
