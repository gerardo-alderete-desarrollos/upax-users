import { Injectable } from '@angular/core';
import { spanish } from 'src/languague/spanish';
import { english } from 'src/languague/english';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguagueService {
  changeLanguague = new Subject();
  constructor() { }

  getLanguague() {
    let languague;
    if ( !localStorage.getItem('languague') ) {
      localStorage.setItem('languague', 'false');
    }

    if ( localStorage.getItem('languague') === 'true' ) {
      languague = english;
    } else if ( localStorage.getItem('languague') === 'false' ) {
      languague = spanish;
    }
    return languague;
  }

  changeLanguagueFunction(languague) {
    localStorage.setItem('languague', (languague === 'español' || languague === 'spanish') ? 'false' : 'true');
    this.changeLanguague.next(true);
  }
}
