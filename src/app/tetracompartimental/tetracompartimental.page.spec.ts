import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TetracompartimentalPage } from './tetracompartimental.page';

describe('TetracompartimentalPage', () => {
  let component: TetracompartimentalPage;
  let fixture: ComponentFixture<TetracompartimentalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TetracompartimentalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TetracompartimentalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
