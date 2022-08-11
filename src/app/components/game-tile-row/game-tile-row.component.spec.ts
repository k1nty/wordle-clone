import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTileRowComponent } from './game-tile-row.component';

describe('GameTileRowComponent', () => {
  let component: GameTileRowComponent;
  let fixture: ComponentFixture<GameTileRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameTileRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameTileRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
