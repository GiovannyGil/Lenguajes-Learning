import { Component, OnInit, ElementRef, Input } from '@angular/core';
import * as CryptoJS from 'crypto-js'
import { NavigationExtras, Router } from '@angular/router';
import { ConstantsService } from '../../servicios/constants.service';
import { NitsService } from '../../servicios/nits.service'
import { AuthService } from '../../servicios/auth.service';
import { Platform } from '@ionic/angular'

declare var cordova:any;
@Component({
  selector: 'app-pse-estado-de-cuentas',
  templateUrl: './pse-estado-de-cuentas.page.html',
  styleUrls: ['./pse-estado-de-cuentas.page.scss'],

})
export class PSEEstadoDeCuentasPage implements OnInit {

  numeroentidad = localStorage.getItem("numeroentidad")
  ahorros = []
  creditos = []
  novedades = []
  debitos = [];
  costostran = {
    Valor: 1000
  }
  parameters = {}
  Total = {
    Valor: "0"
  }
  confirmartranpse = false
  public isDisabled: boolean = false;


  params = {
    CedulaAsociado: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
    operador: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
    Tipo: '',
    pagare: CryptoJS.AES.encrypt("0", this.Constants._secret).toString(),
    RegistroEmpezar: 0,
    RegistroMostrar: 10
  }
  val = 0
  valcre = 0
  valNov = 0

  constructor(public router: Router,
    private Constants: ConstantsService,
    public NitsServices: NitsService,
    private authService: AuthService,
    public plt: Platform,
    public abcde: ElementRef,) { }

  ngOnInit() {
    this.Ahorros()
    this.Creditos()
    this.Novedades()
    this.Costostransaccion()

  }
  Ahorros() {
    this.params.Tipo = CryptoJS.AES.encrypt("AHORRO", this.Constants._secret).toString()
    // this.NitsServices.Cargando()
    this.authService.ApiSendData(this.Constants._APIEstadodecuentasPSE, this.params).subscribe(data => {
      // this.NitsServices.CargandoDismiss()
      if (data[0][0].Codigo == "401") {
        this.NitsServices.mostrarMensajes(data)
        this.router.navigateByUrl('/PSEInicio')
        return
      }
      this.ahorros = data?.[0] || [];
      this.ahorros.map(item => item.countComplete = false);
      
    },
      err => {
        console.log(err)
      });
  }

  Creditos() {
    this.params.Tipo = CryptoJS.AES.encrypt("CREDIT", this.Constants._secret).toString()
    this.NitsServices.Cargando()
    this.authService.ApiSendData(this.Constants._APIEstadodecuentasPSE, this.params).subscribe(data => {
      this.NitsServices.CargandoDismiss()
      this.creditos = data?.[0] || []
      this.creditos.map(item => item.countComplete = false);
    },
    err => {
      this.NitsServices.CargandoDismiss()
      console.log(err)
    });
  }

  Novedades() {
    this.params.Tipo = CryptoJS.AES.encrypt("ESTNOV", this.Constants._secret).toString()
    // this.NitsServices.Cargando()
    this.authService.ApiSendData(this.Constants._APIEstadodecuentasPSE, this.params).subscribe(data => {
      // this.NitsServices.CargandoDismiss()
      this.novedades = data?.[0] || []
      this.novedades.map(item => item.countComplete = false);
    },
      err => {
        console.log(err)
      });
  }

  Costostransaccion() {

    this.parameters = {
      cedula: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
      caso: 9
    }

    // this.NitsServices.Cargando()
    this.authService.ApiSendData(this.Constants._APIPsegeneral, this.parameters).subscribe(data => {
      // this.NitsServices.CargandoDismiss()

      if (data[0][0].Codigo == "999") {
        this.NitsServices.mostrarMensajes(data)
        this.router.navigateByUrl('/PSEInicio')
      }

      data[0][0].Valor = this.format(data[0][0].Valor)
      this.costostran = data[0][0]
      console.log('el valor de transaccion es: ',this.costostran.Valor)
      console.log(this.costostran)
    },
      err => {
        this.NitsServices.CargandoDismiss()
        console.log(err)
      });


  }

  llenardatosinput(Linea, autoriza, dedonde, evento, lineaRecibe, numerocuentaRecibe) {
    const cuentaFinal = dedonde == 'Ahorro' ? numerocuentaRecibe : Linea;
    if(!evento.target.checked){
      switch (dedonde) {
        case 'Ahorro':
          this.ahorros.map(item =>{
            if (item.NombreLineaAhorros == autoriza && item.Linea == lineaRecibe) {
              item.checked = false;
            }
          });
          break;

        case 'Credito':
          this.creditos.map(item => {
            if (item.Pagare == Linea) {
              item.checked = false;
              item.valorapagar = 0;
            };
          });      
          break;
  
        case 'Novedad':
          this.novedades.map(item =>{
            if (item.NombreNovedad == autoriza && item.codnovedad == lineaRecibe) {
              item.checked = false;
            }
          });         
          break;
      
        default:
          break;
      }
      
    }else{
      this.validarvalores(dedonde,cuentaFinal,lineaRecibe,false);
    }
    this.setTotalTransaction();
  };

  submit() {

    if (this.Total.Valor == "0") {
      this.NitsServices.AlertMsm("No se ha diligenciado un valor a pagar por favor verifique...")
      return
    };
    

    let validarEnvio = [].concat(this.ahorros, this.novedades, this.creditos).some(item => item.menor);
    if(validarEnvio) {
      this.NitsServices.AlertMsm("Verifique los valores a pagar");
      return;
    }
    
    var parameterssummit = {
      ahorros: this.ahorros,
      creditos: this.creditos,
      novedades: this.novedades,
      cedula: CryptoJS.AES.encrypt(localStorage.getItem("operador"), this.Constants._secret).toString(),
      costotrasaccion: this.costostran.Valor,
    }    

    this.NitsServices.Cargando()
    this.authService.ApiSendData(this.Constants._APITransaccionespse, parameterssummit).subscribe(data => {
      this.NitsServices.CargandoDismiss()

      if (data[0][0].Codigo == "999") {

        const navigationExtras: NavigationExtras = {
          queryParams: { data: data }
        }

        this.router.navigateByUrl("/pse-transaccionpendiente", navigationExtras);

      } else {
        if (data[0][0].Codigo == "000") {
          if (this.plt.is('ios')){
            cordova.InAppBrowser.open(data[0][0].Mensaje, '_system', 'location=yes')
          }else{
            window.open(data[0][0].Mensaje, '_system', 'location=yes')
          }

          const navigationExtras: NavigationExtras = {
            queryParams: { data: [[ data[0][0].transaccion ]] }
          }
          this.router.navigateByUrl("/PSEInicio", navigationExtras);
          return true;
        }
        // this.NitsServices.mostrarMensajes(data)
      }

    },
      err => {
        this.NitsServices.CargandoDismiss()
        console.log(err)
      });
  }

  validarvalores(dedonde, autoriza, lineaRecibe, desde) {

    switch (dedonde) {
      case 'Novedad':
        this.novedades.map(item => {
          if (item.NumeroNovedad == autoriza && item.codnovedad == lineaRecibe) {
            let saldo = this.convertiraint(item.SaldoNovedad)
            let cuota = this.convertiraint(item.CuotaNovedad)
            let valor = item.valorapagar
            item.menor = valor < cuota;
            item.valorapagar = valor;
            item.checked = true;

            if(desde && (valor < cuota)){
              item.valorapagar = cuota;
              setTimeout(() => {
                valor = cuota;
                item.menor = valor < cuota;
              });
              this.NitsServices.AlertMsm('Recuerda que el valor mínimo a pagar es el valor de la cuota')
            }
          };
        });
  
        this.setTotalTransaction();
        break;
      case 'Ahorro':
        this.ahorros.map(item => {
          if (item.NumeroCuentaAhorros == autoriza && item.Linea == lineaRecibe) {
            let saldo = this.convertiraint(item.SaldoTotalCuenta);
            let cuota = this.convertiraint(item.ValorCuotaAhorro);
            let valor = item.valorapagar;   
            item.menor = valor < cuota;
            item.valorapagar = valor;
            item.checked = true;
            
            if(desde && (valor < cuota)){
              item.valorapagar = cuota;
              setTimeout(() => {
                valor = cuota;
                item.menor = valor < cuota;
              });
              this.NitsServices.AlertMsm('Recuerda que el valor mínimo a pagar es el valor de la cuota')
            }
          };
        })
  
        this.setTotalTransaction();
        break;
      case 'Credito':
        this.creditos.map(item => {
          if (item.Pagare == autoriza) {
            let saldo = this.convertiraint(item.SaldoCapital)
            let cuota = this.convertiraint(item.Anualidad)
            let valor = item.valorapagar
            let montodeControl = 0;
            let motivo = '';
            let puede = 'NO';
            item.menor = valor < cuota;
            item.valorapagar = valor;
            item.checked = true;
  
            if (saldo<=cuota){
              montodeControl = saldo;
              motivo = "Valor mínimo es el saldo";
            }else{
              if (cuota<=50000){
                  montodeControl = cuota;
                  motivo = "Valor menor a la cuota";
              }else {
                  montodeControl = 50000;
                  motivo = "Recuerda que el monto mínimo es 50.000";
              }
            }
          
            if (valor>=montodeControl){
                if (valor<=saldo){
                    puede="SI";
                    motivo="";
                    item.menor = false
                }else{
                    motivo="Valor mayor al saldo";
                }
            }
  
            if(desde && puede == 'NO'){
              item.valorapagar = cuota;
              setTimeout(() => {
                valor = cuota;
                item.menor = valor < cuota;
              });
              this.NitsServices.AlertMsm(motivo)
            }
          }
        })
      
        this.setTotalTransaction();
        break;
      default:
        break;
    }

  };

  setTotalTransaction(){
    const totales1 =  [].concat(this.ahorros, this.novedades, this.creditos).map(item => { 
      if(item.checked) return item.valorapagar
    }).filter(item => item);
    console.log('totales: ',totales1)
    let total1 =  totales1.reduce((a, b) => a + b, 0);
    this.Total.Valor = this.format(total1);
    console.log(this.Total.Valor ) // console de prueba
    // console.log(this.Total.Valor = this.format(this.Total.Valor + this.costostran.Valor))
  }

  convertiraint(valor) {

    valor = valor.substring(0, valor.length - 3)
    valor = valor.replace(/,/g, '') //.replace(',','')
    // valor = valor.replace(/./g, '')
    valor = parseInt(valor)
    
    return valor
  }

  format(input) {
    var num = input
    if (!isNaN(num)) {
      num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
      num = num.split('').reverse().join('').replace(/^[\.]/, '');
      return num;
    }

    else {
      alert('Solo se permiten numeros');
      return input
    }
  }
}
