import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StyleCheckService } from 'src/app/services/style-check.service';

@Component({
  selector: 'app-game-keyboard',
  templateUrl: './game-keyboard.component.html',
  styleUrls: ['./game-keyboard.component.scss']
})
export class GameKeyboardComponent implements OnInit {
  @Output() public keyboardEmitter: EventEmitter<string> = new EventEmitter<string>();
  @Input() public letterMatch: number = 0;
  @Input() public letters: string[] = [];
  @Input() public rowFilled: boolean = false;


  constructor(public styleCheckService: StyleCheckService) {}

  getKeyBoardEvent(key: string): void {
    this.keyboardEmitter.emit(key);
  }

  public getTileClass(letter: string): string {
    let currentTileType: number = this.styleCheckService.getKeyboardTileType(letter);
    switch(currentTileType) {
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

  ngOnInit(): void {

  }
//hold array of invalid letters that have been submitted, only happens after enter
//yellow and green letters will be based on last row letters entered
}
