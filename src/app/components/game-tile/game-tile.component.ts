import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-tile',
  templateUrl: './game-tile.component.html',
  styleUrls: ['./game-tile.component.scss']
})
export class GameTileComponent implements OnInit {
  @Input() letter: string = '';
  @Input() letterMatch: number = 0; //0 = default, 1 = match, 2 = exists, 3 = dne

  constructor() {
  }

  ngOnInit(): void {
  }

  public getTileClass(): string {
    switch(this.letterMatch) {
      case 0:
        return '';
      case 1:
        return 'letter-match';
      case 2:
        return 'letter-exist';
      case 3:
        return 'letter-dne';
      default:
        return '';
    }

  }

}
