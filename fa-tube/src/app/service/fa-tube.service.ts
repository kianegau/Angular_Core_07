import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FaTubeService {
  constructor(private http: HttpClient) {}
  public url = 'https://www.googleapis.com/youtube/v3/search';
  public urlPlay = 'https://www.googleapis.com/youtube/v3/videos';
  keyApi = 'AIzaSyB-TJ_7SmJT5_ANaraGDPDRozrwqgkxe3E';

  searchVideos(key: string): Observable<any> {
    const uri = `${this.url}?part=snippet&maxResults=6&q=${key}&key= ${
      this.keyApi
    }&type=video`;
    return this.http.get<any>(uri);
  }

  playVideos(id: string): Observable<any> {
    const uri = `${
      this.urlPlay
    }?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${this.keyApi}`;
    return this.http.get<any>(uri);
  }

  getRelatedById(id: string) {
    const uri = `${this.url}?part=snippet&key=${
      this.keyApi
    }&relatedByVideoId=${id}`;
    return this.http.get<any>(uri);
  }

  orderVideos(order: string, key: string) {
    const uri = `${this.url}?part=snippet&order=${order}&q=${key}&key=${
      this.keyApi
    }`;
    return this.http.get<any>(uri);
  }
}
