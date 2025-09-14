import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIncident } from './create-incident';

describe('CreateIncident', () => {
  let component: CreateIncident;
  let fixture: ComponentFixture<CreateIncident>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateIncident]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateIncident);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
