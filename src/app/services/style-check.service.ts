import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StyleCheckService {
  public randomWordArray: string[] = [];
  public invalidLetters: string[] = [];
  public validLettersNotInPosition: string[] = [];
  public validLettersInPosition: string[] = [];
  public letterInPosition: number[] = [];

  constructor() { }

  public getRandomWord(randomWord: any) {
    let randWord: string = randomWord;
    return randWord.split('');
  }

  // pass in array instead of letters 
  public getLetterMatch(index: number, letters: any, rowFilled: any, randomWord: any): number {
    this.randomWordArray = this.getRandomWord(randomWord);
    const timesLetterAppearsInRandomWord: number = this.randomWordArray.filter(letter => {
      return letter === letters[index];
    }).length;

    const timesLetterAppearsInGuessedWord: number = letters.filter((letter: any) => {
      return letter === letters[index];
    }).length;

    if(rowFilled === false){
      return 0;
    }
    if(letters[index] === this.randomWordArray[index]){
      return 1;
    }
    let randWordIndex: number = this.randomWordArray.indexOf(letters[index]);
    if(randWordIndex === -1){
      return 3;
    }
    // if(randWordIndex !== -1){
    //   if(letters[randWordIndex] === this.randomWordArray[randWordIndex]){
    //     return 0;
    //   }
    //   const val: number = this.randLetterCount(timesLetterAppearsInRandomWord, timesLetterAppearsInGuessedWord, index);
    //   return val;
    // }
    return 0;
  }

  
  public randLetterCount(timesLetterAppearsInRandomWord: number, timesLetterAppearsInGuessedWord: number, index: number): number {
    let nextReoccuringIndex: number = 0;
    let letterDifference: number = 0;
    for(let i = 0; i < this.letterInPosition.length; i++){ 
      if(this.letterInPosition[i] === 1){
        letterDifference = timesLetterAppearsInRandomWord - this.letterInPosition[i];
        this.letterInPosition[i] = letterDifference;
      }
      if(this.letterInPosition[i] === 2){
        nextReoccuringIndex = i;
      }
    }
    console.log(this.letterInPosition);
    // for(let i = 0; i < this.letterInPosition.length; i++){
    //   console.log('i', i);
      if(timesLetterAppearsInGuessedWord > timesLetterAppearsInRandomWord){
        console.log('index', nextReoccuringIndex);
        if(this.letterInPosition[index] >= 1 && index === nextReoccuringIndex){
          return 0;
        }
        if(this.letterInPosition[index] >= 1 && index !== nextReoccuringIndex){
          return 2;
        }
      }
      if(timesLetterAppearsInGuessedWord === timesLetterAppearsInRandomWord){
        if(this.letterInPosition[index] >= 1 && index === nextReoccuringIndex){
          return 0;
        }
        if(this.letterInPosition[index] >= 1 && index !== nextReoccuringIndex){
          return 2;
        }
      }
      if(timesLetterAppearsInGuessedWord < timesLetterAppearsInRandomWord){
          return 2;
      }
        return 0;
    //}
    return 0;
  }

  public getKeyboardTileType(letter: string): number {
    if(this.invalidLetters.indexOf(letter) !== -1){
      return 3;
    }
    if(this.validLettersInPosition.indexOf(letter) !== -1){
      return 1;
    }
    if(this.validLettersNotInPosition.indexOf(letter) !== -1){
      return 2;
    }
    return 0;
  }
}