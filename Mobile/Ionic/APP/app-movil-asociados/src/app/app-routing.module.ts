import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'loginpage',
    pathMatch: 'full'
  },
  {
    path: 'loginpage',
    loadChildren: () => import('./pages/loginpage/loginpage.module').then( m => m.LoginpagePageModule)
  },
  {
    path: 'contactos',
    loadChildren: () => import('./pages/contactos/contactos.module').then( m => m.ContactosPageModule)
  },
  {
    path: 'ubicacion',
    loadChildren: () => import('./pages/ubicacion/ubicacion.module').then( m => m.UbicacionPageModule)
  },
  {
    path: 'ubicacion-iframe',
    loadChildren: () => import('./pages/ubicacion-iframe/ubicacion-iframe.module').then( m => m.UbicacionIframePageModule)
  },
  {
    path: 'portafolio',
    loadChildren: () => import('./pages/portafolio/portafolio.module').then( m => m.PortafolioPageModule)
  },
  {
    path: 'demo',
    loadChildren: () => import('./pages/demo/demo.module').then( m => m.DemoPageModule)
  },
  {
    path: 'confirmar-login',
    loadChildren: () => import('./pages/confirmar-login/confirmar-login.module').then( m => m.ConfirmarLoginPageModule)
  },
  {
    path: 'publicidad',
    loadChildren: () => import('./pages/publicidad/publicidad.module').then( m => m.PublicidadPageModule)
  },
  {
    path: 'respuestas-seguridad',
    loadChildren: () => import('./pages/respuestas-seguridad/respuestas-seguridad.module').then( m => m.RespuestasSeguridadPageModule)
  },
  {
    path: 'preguntas-seguridad',
    loadChildren: () => import('./pages/preguntas-seguridad/preguntas-seguridad.module').then( m => m.PreguntasSeguridadPageModule)
  },
  {
    path: 'recuperacion-clave',
    loadChildren: () => import('./pages/recuperacion-clave/recuperacion-clave.module').then( m => m.RecuperacionClavePageModule)
  },
  {
    path: 'about-asociado',
    loadChildren: () => import('./pages/about-asociado/about-asociado.module').then( m => m.AboutAsociadoPageModule)
  },
  {
    path: 'certificados',
    loadChildren: () => import('./pages/certificados/certificados.module').then( m => m.CertificadosPageModule)
  },
  {
    path: 'cambio-clave',
    loadChildren: () => import('./pages/cambio-clave/cambio-clave.module').then( m => m.CambioClavePageModule)
  },
  {
    path: 'imagenyfrase',
    loadChildren: () => import('./pages/imagenyfrase/imagenyfrase.module').then( m => m.ImagenyfrasePageModule)
  },
  {
    path: 'simulador-ahorros',
    loadChildren: () => import('./pages/simulador-ahorros/simulador-ahorros.module').then( m => m.SimuladorAhorrosPageModule)
  },
  {
    path: 'simulador-creditos',
    loadChildren: () => import('./pages/simulador-creditos/simulador-creditos.module').then( m => m.SimuladorCreditosPageModule)
  },
  {
    path: 'total-simuladorahorros',
    loadChildren: () => import('./pages/total-simuladorahorros/total-simuladorahorros.module').then( m => m.TotalSimuladorahorrosPageModule)
  },
  {
    path: 'total-simuladorcreditos',
    loadChildren: () => import('./pages/total-simuladorcreditos/total-simuladorcreditos.module').then( m => m.TotalSimuladorcreditosPageModule)
  },
  {
    path: 'pago-creditos',
    loadChildren: () => import('./pages/pago-creditos/pago-creditos.module').then( m => m.PagoCreditosPageModule)
  },
  {
    path: 'traslado-ahorros',
    loadChildren: () => import('./pages/traslado-ahorros/traslado-ahorros.module').then( m => m.TrasladoAhorrosPageModule)
  },
  {
    path: 'retiros-gana',
    loadChildren: () => import('./pages/retiros-gana/retiros-gana.module').then( m => m.RetirosGanaPageModule)
  },
  {
    path: 'segunda-clave',
    loadChildren: () => import('./pages/segunda-clave/segunda-clave.module').then( m => m.SegundaClavePageModule)
  },
  {
    path: 'traslado-terceros',
    loadChildren: () => import('./pages/traslado-terceros/traslado-terceros.module').then( m => m.TrasladoTercerosPageModule)
  },
  {
    path: 'estado-cuentas',
    loadChildren: () => import('./pages/estado-cuentas/estado-cuentas.module').then( m => m.EstadoCuentasPageModule)
  },
  {
    path: 'seguimiento-novedades',
    loadChildren: () => import('./pages/seguimiento-novedades/seguimiento-novedades.module').then( m => m.SeguimientoNovedadesPageModule)
  },
  {
    path: 'preseguimiento-novedades',
    loadChildren: () => import('./pages/preseguimiento-novedades/preseguimiento-novedades.module').then( m => m.PreseguimientoNovedadesPageModule)
  },
  {
    path: 'detalle-novedades',
    loadChildren: () => import('./pages/detalle-novedades/detalle-novedades.module').then( m => m.DetalleNovedadesPageModule)
  },
  {
    path: 'seguimiento-debitos-automaticos',
    loadChildren: () => import('./pages/seguimiento-debitos-automaticos/seguimiento-debitos-automaticos.module').then( m => m.SeguimientoDebitosAutomaticosPageModule)
  },
  {
    path: 'seguimiento-ahorros',
    loadChildren: () => import('./pages/seguimiento-ahorros/seguimiento-ahorros.module').then( m => m.SeguimientoAhorrosPageModule)
  },
  {
    path: 'preseguimiento-ahorros',
    loadChildren: () => import('./pages/preseguimiento-ahorros/preseguimiento-ahorros.module').then( m => m.PreseguimientoAhorrosPageModule)
  },
  {
    path: 'detalle-ahorros',
    loadChildren: () => import('./pages/detalle-ahorros/detalle-ahorros.module').then( m => m.DetalleAhorrosPageModule)
  },
  {
    path: 'seguimiento-creditos',
    loadChildren: () => import('./pages/seguimiento-creditos/seguimiento-creditos.module').then( m => m.SeguimientoCreditosPageModule)
  },
  {
    path: 'preseguimiento-creditos',
    loadChildren: () => import('./pages/preseguimiento-creditos/preseguimiento-creditos.module').then( m => m.PreseguimientoCreditosPageModule)
  },
  {
    path: 'detalle-creditos',
    loadChildren: () => import('./pages/detalle-creditos/detalle-creditos.module').then( m => m.DetalleCreditosPageModule)
  },
  {
    path: 'credito-rotativo',
    loadChildren: () => import('./pages/credito-rotativo/credito-rotativo.module').then( m => m.CreditoRotativoPageModule)
  },
  {
    path: 'crear-usuario',
    loadChildren: () => import('./pages/crear-usuario/crear-usuario.module').then( m => m.CrearUsuarioPageModule)
  },
  {
    path: 'recordar-usuario',
    loadChildren: () => import('./pages/recordar-usuario/recordar-usuario.module').then( m => m.RecordarUsuarioPageModule)
  },
  {
    path: 'recargas',
    loadChildren: () => import('./pages/recargas/recargas.module').then( m => m.RecargasPageModule)
  },
  {
    path: 'creacion-ahorros-fecsa',
    loadChildren: () => import('./pages/creacion-ahorros-fecsa/creacion-ahorros-fecsa.module').then( m => m.CreacionAhorrosFecsaPageModule)
  },
  {
    path: 'pagos-nomina',
    loadChildren: () => import('./pages/pagos-nomina/pagos-nomina.module').then( m => m.PagosNominaPageModule)
  },
  {
    path: 'PSEInicio',
    loadChildren: () => import('./pages/PSEInicio/PSEInicio.module').then( m => m.PSEInicioPageModule)
  },
 // {
  //   path: 'psemodal-historico',
  //   loadChildren: () => import('./pages/psemodal-historico/psemodal-historico.module').then( m => m.PSEModalHistoricoPageModule)
  // },
  // {
  //   path: 'pseestado-de-cuentas',
  //   loadChildren: () => import('./pages/pseestado-de-cuentas/pseestado-de-cuentas.module').then( m => m.PSEEstadoDeCuentasPageModule)
  // },
  {
    path: 'seguros',
    loadChildren: () => import('./pages/seguros/seguros.module').then( m => m.SegurosPageModule)
  },
  {
    path: 'seguros-movil',
    loadChildren: () => import('./pages/seguros-movil/seguros-movil.module').then( m => m.SegurosMovilPageModule)
  },
  {
    path: 'seguros-soat',
    loadChildren: () => import('./pages/seguros-soat/seguros-soat.module').then( m => m.SegurosSoatPageModule)
  },
  {
    path: 'seguros-vida',
    loadChildren: () => import('./pages/seguros-vida/seguros-vida.module').then( m => m.SegurosVidaPageModule)
  },
  {
    path: 'seguros-exequial',
    loadChildren: () => import('./pages/seguros-exequial/seguros-exequial.module').then( m => m.SegurosExequialPageModule)
  },
  {
    path: 'seguros-fmc',
    loadChildren: () => import('./pages/seguros-fmc/seguros-fmc.module').then( m => m.SegurosFmcPageModule)
  },
  {
    path: 'seguros-hogar',
    loadChildren: () => import('./pages/seguros-hogar/seguros-hogar.module').then( m => m.SegurosHogarPageModule)
  },
  {
    path: 'seguros-vehiculos',
    loadChildren: () => import('./pages/seguros-vehiculos/seguros-vehiculos.module').then( m => m.SegurosVehiculosPageModule)
  },
  {
    path: 'cursos',
    loadChildren: () => import('./pages/cursos/cursos.module').then( m => m.CursosPageModule)
  },
  {
    path: 'sedes-vacacionales',
    loadChildren: () => import('./pages/sedes-vacacionales/sedes-vacacionales.module').then( m => m.SedesVacacionalesPageModule)
  },
  {
    path: 'auxilios',
    loadChildren: () => import('./pages/auxilios/auxilios.module').then( m => m.AuxiliosPageModule)
  },
  {
    path: 'auxilios-requisitos',
    loadChildren: () => import('./pages/auxilios-requisitos/auxilios-requisitos.module').then( m => m.AuxiliosRequisitosPageModule)
  },
  {
    path: 'psemodal-historico',
    loadChildren: () => import('./pages/psemodal-historico/psemodal-historico.module').then( m => m.PSEModalHistoricoPageModule)
  },
  {
    path: 'pse-estado-de-cuentas',
    loadChildren: () => import('./pages/pse-estado-de-cuentas/pse-estado-de-cuentas.module').then( m => m.PSEEstadoDeCuentasPageModule)
  },
  {
    path: 'pse-transaccionpendiente',
    loadChildren: () => import('./pages/pse-transaccionpendiente/pse-transaccionpendiente.module').then( m => m.PseTransaccionpendientePageModule)
  },
  {
    path: 'inscripcion-traslado-asociados',
    loadChildren: () => import('./pages/inscripcion-traslado-asociados/inscripcion-traslado-asociados.module').then( m => m.InscripcionTrasladoAsociadosPageModule)
  },
  {
    path: 'cuentas-inscritas',
    loadChildren: () => import('./pages/cuentas-inscritas/cuentas-inscritas.module').then( m => m.CuentasInscritasPageModule)
  },
  {
    path: 'traslado-otros-asociados',
    loadChildren: () => import('./pages/traslado-otros-asociados/traslado-otros-asociados.module').then( m => m.TrasladoOtrosAsociadosPageModule)
  },
  {
    path: 'retiros-efecty',
    loadChildren: () => import('./pages/retiros-efecty/retiros-efecty.module').then( m => m.RetirosEfectyPageModule)
  },
  {
    path: 'crear-convenio',
    loadChildren: () => import('./pages/crear-convenio/crear-convenio.module').then( m => m.CrearConvenioPageModule)
  },
  {
    // PAGINA 404 -> NOT FOUND
    path: '**', component: PageNotFoundComponent
  }





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
