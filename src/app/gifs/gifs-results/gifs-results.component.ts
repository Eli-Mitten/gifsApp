import { Component } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-gifs-results',
  templateUrl: './gifs-results.component.html',
  styleUrls: []
})
export class GifsResultsComponent {

  get results() {
    return this.gifsService.results;
  }

  constructor( private gifsService: GifsService) {}

}
