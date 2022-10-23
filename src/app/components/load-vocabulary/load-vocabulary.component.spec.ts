import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadVocabularyComponent } from './load-vocabulary.component';

describe('LoadVocabularyComponent', () => {
  let component: LoadVocabularyComponent;
  let fixture: ComponentFixture<LoadVocabularyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadVocabularyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadVocabularyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
