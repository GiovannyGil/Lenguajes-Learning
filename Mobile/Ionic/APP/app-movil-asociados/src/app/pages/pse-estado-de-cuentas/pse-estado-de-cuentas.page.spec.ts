import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PSEEstadoDeCuentasPage } from './pse-estado-de-cuentas.page';

describe('PSEEstadoDeCuentasPage', () => {
  let component: PSEEstadoDeCuentasPage;
  let fixture: ComponentFixture<PSEEstadoDeCuentasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PSEEstadoDeCuentasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PSEEstadoDeCuentasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
