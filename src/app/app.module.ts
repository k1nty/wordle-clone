import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameTileComponent } from './components/game-tile/game-tile.component';
import { GameTileRowComponent } from './components/game-tile-row/game-tile-row.component';
import { GameKeyboardComponent } from './components/game-keyboard/game-keyboard.component';
import { StyleCheckService } from './services/style-check.service';


@NgModule({
  declarations: [
    AppComponent,
    GameTileComponent,
    GameTileRowComponent,
    GameKeyboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [StyleCheckService],
  bootstrap: [AppComponent]
})
export class AppModule { }
