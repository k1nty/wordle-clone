import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { StyleCheckService } from 'src/app/services/style-check.service';

@Component({
  selector: 'app-game-tile-row',
  templateUrl: './game-tile-row.component.html',
  styleUrls: ['./game-tile-row.component.scss']
})
export class GameTileRowComponent implements OnInit {
  @Input() letters: string[] = [];
  @Input() randomWord: string = '';
  @Input() rowFilled: boolean = false;

  constructor(public styleCheckService: StyleCheckService) { }
  
  ngOnInit(): void {}

  public getDataFromService(index: number): number {
    let tileType: number = this.styleCheckService.getLetterMatch(index, this.letters, this.rowFilled, this.randomWord);
    return tileType;
  }

  public flipTile(letter: string): boolean {
    if(this.letters.indexOf(letter) !== -1){
      return this.rowFilled;
    }else{
      return false;
    }
  }

}