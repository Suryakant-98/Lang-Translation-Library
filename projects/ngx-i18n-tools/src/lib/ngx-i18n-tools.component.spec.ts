import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxI18nToolsComponent } from './ngx-i18n-tools.component';

describe('NgxI18nToolsComponent', () => {
  let component: NgxI18nToolsComponent;
  let fixture: ComponentFixture<NgxI18nToolsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgxI18nToolsComponent]
    });
    fixture = TestBed.createComponent(NgxI18nToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
