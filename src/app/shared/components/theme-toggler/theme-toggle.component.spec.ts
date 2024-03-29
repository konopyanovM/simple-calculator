import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeToggleComponent } from './theme-toggle.component';

describe('ThemeTogglerComponent', () => {
  let component: ThemeToggleComponent;
  let fixture: ComponentFixture<ThemeToggleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ThemeToggleComponent],
    });
    fixture = TestBed.createComponent(ThemeToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
