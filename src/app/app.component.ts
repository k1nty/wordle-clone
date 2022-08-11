import { Component, HostListener, OnInit, Output } from '@angular/core';
import { DataService } from './services/data.service';
import { StyleCheckService } from './services/style-check.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  public approvedInputs: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 
  'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'Backspace', 'Enter'];
  public rowLetters: string[][] = [];
  public letters: string[] = [];
  public rowIndex: number = 0;
  public wordBank: string[] = [];
  public randomWord: string = '';
  public shakeIt: boolean = false;
  public invalidLetters: string[] = [];
  public validLettersNotInPosition: string[] = [];
  public validLettersInPosition: string[] = [];
  public rowLettersNext: boolean = false;
  public letterInPosition: number[] = [];
   
  @HostListener('document:keydown', ['$event']) public userInput(e: KeyboardEvent){
    e.preventDefault();
    this.handleKeyboardInput(e.key);
  }

  constructor(
    public dataService: DataService,
    public styleCheckService: StyleCheckService) {}

  ngOnInit(): void {
    this.dataService.getWordBank().subscribe((response: string) => { // retrieves list of 5 letter words
      this.wordBank = response.split('\r\n'); // splits list of words in word bank
      //this.randomWord = this.getRandomWordFromBank(); //call function to randomly select word from bank
      this.randomWord = 'eerie';
      console.log(this.randomWord);
    });

    for(let i = 0; i < 6; i++){
      this.rowLetters.push([]); //initializes grid
    }
    this.letters = this.rowLetters[this.rowIndex]; // pushes inputted word into current row
    this.letterInPosition.length = 4;
    //this.letterInPosition = [];
  }

  public getRandomWordFromBank(): string { // randomly retrieves word from bank
    const randomIndex: number = Math.floor(Math.random() * this.wordBank.length);
    return this.wordBank[randomIndex];
  }

  public handleKeyboardInput(key: string): void { // handles all keyboard logic
    if(key !== 'Backspace' && key !== 'Enter' && this.letters.length === 5){ 
      return; // only allows 5 inputs in each row that isnt backspace of enter
    }
    if(key === 'Enter' && this.letters.length < 5){ 
      return; // row needs to be completely filled for enter to register 
    }
    let index = this.approvedInputs.indexOf(key);
    if(index === -1){ // only allows approved inputs to register
      return;
    }
    if(key !== 'Backspace' && key !== 'Enter'){
      this.letters.push(key); // all inputs other than backspace and enter are allowed to be pushed to current letters array
    }
    if(key === 'Backspace' && this.letters.length > 0){
      this.letters.splice(this.letters.length - 1, 1); // removes present words in array 
      this.shakeIt = false; // sets shakeIt back to false if invalid word is inputted
    }
    console.log(this.letters);
    if(key === 'Enter' && this.letters.length >= 5){
      const wordExists: boolean = this.checkIfWordExists(); // check if word exists 
      if(this.checkIfWon()){
        //this.checkForValidLetters();
        this.injectValidAndInvalidLetters(); // keeps track of already submitted valid and invalid letters
        this.setCurrentRowsLettersToNext();
        this.rowLettersNext = true;
        this.congratsYouWon();
        this.approvedInputs = []; // makes sure letters can not be inputted after user won.
        console.log('CONGRATS! YOU WIN!!!!!!');
      }else if(wordExists){
        //this.checkForValidLetters();
        this.injectValidAndInvalidLetters(); // keeps track of already submitted valid and invalid letters
        this.setCurrentRowsLettersToNext();
        console.log('whoops......try again');
      }else if(!wordExists){
        if(!this.shakeIt){ // word does not exist 
          this.wrongGuessShakeAnimation(); // triggers shake animation
        }
        console.log('this does not exist'); //[ngClass] for css animation
      }else{
        this.finalGuess(); 
      }
    }
  }

  public checkIfWordExists(): boolean { // checking if word inputted actually exists in word bank
    let myWord: string = this.letters.join('');
    console.log(this.wordBank.indexOf(myWord));
    return this.wordBank.indexOf(myWord) !== -1;
  }

  public checkIfWon(): boolean { // checks if inputted word matches random word
    const goldenWord: string = this.letters.join('');
    console.log(goldenWord);
    return goldenWord === this.randomWord;
  }

  public setCurrentRowsLettersToNext(): void { // increments row index, and emptys previous inputted letters from letters array
    this.rowIndex++;
    this.letters = this.rowLetters[this.rowIndex];
    //console.log(this.rowIndex);
  }

  public rowFilled(index: number): boolean { // checks if current row is filled
    return this.rowIndex > index;
  }

  public wrongGuessShakeAnimation(): any { // used to trigger wrong guess shake animation
    this.shakeIt = true;
    setTimeout(() => {
      this.shakeIt = false;
    }, 1500);
  }

  public shakeRow(currentRowLetters: string[]): boolean {
    return currentRowLetters === this.letters && this.shakeIt;
  }

  public finalGuess(): boolean {
    if(this.rowLettersNext === true){
      return false
    }else if (this.rowIndex === 6 && this.rowLettersNext === false){
      return true;
    }
    return false;
  }

  public congratsYouWon(): boolean { 
    return this.rowLettersNext === true;
  }

  public checkForValidLetters(): void {
    let randWord: string[] = this.randomWord.split('');
    for(let i = 0; i < this.letters.length; i++){
      if(this.letters[i] === randWord[i]){
        this.letterInPosition[i] = 1;
      }else if(randWord.indexOf(this.letters[i]) !== -1){
        this.letterInPosition[i] = 2;
      }else{
        this.letterInPosition[i] = -1;
      }
    }
    this.styleCheckService.letterInPosition = this.letterInPosition;
  }

  public injectValidAndInvalidLetters(): void {
    const correctLettersObj: any = {};
    for(let i = 0; i < this.letters.length; i++){
      let letterMatchTileType: number = this.styleCheckService.getLetterMatch(i, this.letters, true, this.randomWord);
      if(letterMatchTileType === 3){
        if(this.invalidLetters.indexOf(this.letters[i]) === -1){
          this.invalidLetters.push(this.letters[i]);
        }
      } else if(letterMatchTileType === 2){
        if(this.validLettersNotInPosition.indexOf(this.letters[i]) === -1){
          this.validLettersNotInPosition.push(this.letters[i]);
        }
      } else if(letterMatchTileType === 1){
        let currentLetter: string = this.letters[i];
        if(correctLettersObj[currentLetter] != undefined){
          correctLettersObj[currentLetter]++;
        }else{
          correctLettersObj[currentLetter] = 1;
        }
        if(this.validLettersInPosition.indexOf(this.letters[i]) === -1){
          this.validLettersInPosition.push(this.letters[i]);
        }
      }
    }
    const randomWordLetter: string[] = this.styleCheckService.getRandomWord(this.randomWord);
    const randomWordObject: any = {};
    const letterDifferenceObject: any = {};
    for(let i = 0; i < randomWordLetter.length; i++){
      let currentLetter: string = randomWordLetter[i];
      if(randomWordObject[currentLetter] != undefined){
        randomWordObject[currentLetter]++;
      }else{
        randomWordObject[currentLetter] = 1;
      }
    }
    const randomWordKeys: string[] = Object.keys(randomWordObject);
    console.log(randomWordObject);

    for(let i = 0; i < randomWordKeys.length; i++){
      let key: string = randomWordKeys[i];
      if(correctLettersObj[key]){
        if(letterDifferenceObject[key] == undefined){
          letterDifferenceObject[key] = randomWordObject[key] - correctLettersObj[key];
        }else{
          letterDifferenceObject[key] -= correctLettersObj[key];
        }
        
      }
    }

    for(let i = 0; i < this.letters.length; i++){
      let letterMatchTileType: number = this.styleCheckService.getLetterMatch(i, this.letters, true, this.randomWord);
      let currentLetter: string = this.letters[i];
      if(letterDifferenceObject[currentLetter] != undefined){
        if(letterMatchTileType != 1){
          letterDifferenceObject[currentLetter]--;
          if(letterDifferenceObject[currentLetter] >= 0){
            this.validLettersNotInPosition.push(currentLetter);
          }
        }
      }
      //if(letterMatchTileType !== 1)
    }
    console.log(correctLettersObj, randomWordObject, letterDifferenceObject);
    this.styleCheckService.invalidLetters = this.invalidLetters;
    this.styleCheckService.validLettersInPosition = this.validLettersInPosition;
    this.styleCheckService.validLettersNotInPosition = this.validLettersNotInPosition;
  }
}
