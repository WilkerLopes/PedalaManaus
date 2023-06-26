import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchStationComponent } from './search-station.component';

describe('SearchStationComponent', () => {
  let component: SearchStationComponent;
  let fixture: ComponentFixture<SearchStationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchStationComponent]
    });
    fixture = TestBed.createComponent(SearchStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
