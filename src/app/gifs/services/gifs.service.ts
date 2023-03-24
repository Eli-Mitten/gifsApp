import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Gif, GifSearchResult } from '../interfaces/gifSearchResult.interface';
import { environment } from 'src/environments/environment';




@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string  = environment.APIKEY;
  private serviceUrl: string = 'http://api.giphy.com/v1/gifs'

  private _history: string[] = [];

  public results: Gif[] = [];

  get history() {
    return [...this._history];
  }

  constructor( private http: HttpClient ) {
      this._history = JSON.parse(localStorage.getItem('history')!) || [];
      this.results = JSON.parse(localStorage.getItem('lastResults')!) || []
    
  }

  searchGift( query: string ) {

    query = query.trim().toLocaleLowerCase();

    if(!this._history.includes( query )) {
      this._history.unshift( query );
      this._history = this._history.splice(0, 10);
      localStorage.setItem('history', JSON.stringify(this._history));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query)
    
    this.http.get<GifSearchResult>(`${ this.serviceUrl }/search`, { params })
    .subscribe( resp => {
      this.results = resp.data;
      localStorage.setItem('lastResults', JSON.stringify(this.results));
      });

  }

}
