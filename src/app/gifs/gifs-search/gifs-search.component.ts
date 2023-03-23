import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service'

@Component({
  selector: 'app-gifs-search',
  templateUrl: './gifs-search.component.html',
  styleUrls: ['./gifs-search.component.css']
})
export class GifsSearchComponent {

  @ViewChild('txtSearch') txtSearch!: ElementRef<HTMLInputElement>;

  search() {
    const value = this.txtSearch.nativeElement.value;
    if( value.trim().length === 0) return;
    console.log(value);
    this.giftService.searchGift(value);
    this.txtSearch.nativeElement.value = '';
  }
  
  constructor(private giftService: GifsService) {}

}
