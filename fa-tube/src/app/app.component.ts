import { Component } from '@angular/core';
import { FaTubeService } from './service/fa-tube.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Variable to store values of input text
  searchValue = '';
  // Variable to store values for paging, default assigned by 1
  p = 1;
  // Array value to store list video as a result of search action
  videos = [];
  // Variable to show or hidden span element notify about yes or no search results
  showVideo = false;
  // Variable to store string of path display video
  videoPath = '';
  // Variable to store string convert to safe path on iframe
  trustedUrl;
  description = '';
  title = '';
  channelName;
  iimagess = '../assets/not-found.png';
  // Variable to store detail of video
  videosdetail;
  // Variable to store list of video related
  videosRelated = [];
  // Array to execute sort by action
  orders: any[] = [
    { id: 0, name: 'date' },
    { id: 1, name: 'rating' },
    { id: 2, name: 'relevance' },
    { id: 3, name: 'title' },
    { id: 4, name: 'videoCount' },
    { id: 5, name: 'viewCount' }
  ];
  selected = 0;
  // Constructor to call Service, funxtion to handle safe url and Modal
  constructor(
    private fatubeService: FaTubeService,
    private sanitizer: DomSanitizer,
    private modalService: NgbModal
  ) {}
  // Function handle when user press enter
  handleInput() {
    this.fatubeService
      .orderVideos(this.orders[this.selected].name, this.searchValue)
      .subscribe(data => {
        this.videos = data.items;
        if (this.videos.length !== 0) {
          this.showVideo = true;
        } else {
          this.showVideo = false;
        }
      });
    this.videos = [];
    console.log(this.orders[this.selected].name);
    console.log(this.searchValue);
  }
  // Function handle even when user clicks image of videos then display popup video
  playVideo(id, description, title, channelname) {
    this.title = title;
    this.description = description;
    this.channelName = channelname;
    this.videoPath = `http://www.youtube.com/embed/${id.videoId}`;
    this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.videoPath
    );
    this.fatubeService.playVideos(id.videoId).subscribe(data => {
      this.videosdetail = data.items;
      console.log(id.videoId);
    });
    this.fatubeService.getRelatedById(id.videoId).subscribe(data => {
      this.videosRelated = data.items;
    });
    // Statement to add attribute for iframe
    // document.querySelector('iframe').setAttribute('src', this.trustedUrl);
  }
  // Function to handle location, size and css for popup screen
  openVerticallyCentered(content) {
    this.modalService.open(content, {
      centered: true,
      size: 'lg',
      windowClass: 'myCustomModalClass'
    });
  }
  // Function to handle when use proceeds sort by list video
  selectOption(id: number) {
    this.fatubeService
      .orderVideos(this.orders[id].name, this.searchValue)
      .subscribe(data => {
        this.videos = data.items;
        if (this.videos.length !== 0) {
          this.showVideo = true;
        } else {
          this.showVideo = false;
        }
      });
    this.videos = [];
  }
  // Function to handle display or hidden element contain list video
  checkVideo() {
    if (this.searchValue === '') {
      this.videos = [];
      return false;
    }
    return true;
  }
}
