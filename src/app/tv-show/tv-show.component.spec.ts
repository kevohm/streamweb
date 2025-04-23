import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvShowComponent } from './tv-show.component';

describe('TvShowComponent', () => {
  let component: TvShowComponent;
  let fixture: ComponentFixture<TvShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvShowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
