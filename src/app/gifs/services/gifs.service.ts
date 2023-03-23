import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gif, GifSearchResult } from '../interfaces/gifSearchResult.interface';



@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'YwlOiDQxhFd3TUqHHKwyZ3syAUpX7A4v'

  private _history: string[] = [];

  public results: Gif[] = [];

  get history() {
    return [...this._history];
  }

  constructor( private http: HttpClient ) {}

  searchGift( query: string ) {

    query = query.trim().toLocaleLowerCase();

    if(!this._history.includes( query )) {
      this._history.unshift( query );
      this._history = this._history.splice(0, 10);
    }

    this.http.get<GifSearchResult>(`http://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${query}&limit=10`)
      .subscribe( resp => {
        console.log(JSON.stringify(resp));
        this.results = resp.data;
      });

  }

}
