import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfPageComponent } from './self-page.component';

describe('SelfPageComponent', () => {
  let component: SelfPageComponent;
  let fixture: ComponentFixture<SelfPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelfPageComponent]
    });
    fixture = TestBed.createComponent(SelfPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
