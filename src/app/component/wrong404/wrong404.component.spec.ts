import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Wrong404Component } from './wrong404.component';

describe('Wrong404Component', () => {
  let component: Wrong404Component;
  let fixture: ComponentFixture<Wrong404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Wrong404Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Wrong404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
