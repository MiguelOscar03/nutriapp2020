import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BicompartimentalPage } from './bicompartimental.page';

describe('BicompartimentalPage', () => {
  let component: BicompartimentalPage;
  let fixture: ComponentFixture<BicompartimentalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BicompartimentalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BicompartimentalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
