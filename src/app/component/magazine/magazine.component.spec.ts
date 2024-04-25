import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagazineComponent } from './magazine.component';

describe('MagazineComponent', () => {
  let component: MagazineComponent;
  let fixture: ComponentFixture<MagazineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagazineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MagazineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
