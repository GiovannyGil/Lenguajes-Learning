import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PseTransaccionpendientePage } from './pse-transaccionpendiente.page';

describe('PseTransaccionpendientePage', () => {
  let component: PseTransaccionpendientePage;
  let fixture: ComponentFixture<PseTransaccionpendientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PseTransaccionpendientePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PseTransaccionpendientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
