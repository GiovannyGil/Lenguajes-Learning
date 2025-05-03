import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrasladoOtrosAsociadosPage } from './traslado-otros-asociados.page';

describe('TrasladoOtrosAsociadosPage', () => {
  let component: TrasladoOtrosAsociadosPage;
  let fixture: ComponentFixture<TrasladoOtrosAsociadosPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TrasladoOtrosAsociadosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TrasladoOtrosAsociadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
