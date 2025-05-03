import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InscripcionTrasladoAsociadosPage } from './inscripcion-traslado-asociados.page';

describe('InscripcionTrasladoAsociadosPage', () => {
  let component: InscripcionTrasladoAsociadosPage;
  let fixture: ComponentFixture<InscripcionTrasladoAsociadosPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InscripcionTrasladoAsociadosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InscripcionTrasladoAsociadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
