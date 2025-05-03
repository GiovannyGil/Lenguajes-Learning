(() => {
  // styles.css.js
  var css = `
.container-plugin {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 97vh;
}

.form-plugin {
  width: 60%;
  margin: 0 auto;
}

.form-plugin h2{
  color: #0e4380;
  font-size: 1.5em;
  margin-bottom: 10px;
  text-align: center;
}

.form-plugin label {
  display: block;
  margin-bottom: 10px;
  font-weight: 700;
  color: #000;
}

.form-plugin input, .form-plugin select {
  margin-bottom: 5px;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 5px;
  outline: none;
  border: 1px solid #ccc;
  font-family: Arial, sans-serif;
  background-color: white;
  color: black;
}

.form-plugin input:focus, .form-plugin select:focus {
  outline: none;
  border: 2px solid #0e4380;
}

.form-plugin div {
  width: 50%;
  margin: 10px auto;
}

.form-plugin button {
  padding: 10px;
  width: 20%;
  background-color: #0e4380;
  color: #fff;
  font-weight: 700;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: block;
  margin: 15px auto 0 auto;
}

.form-plugin button:hover {
  transform: translateY(-2px);
  transition: 0.5s;
}

.numero::-webkit-inner-spin-button,
#miInputNumerico::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.numero {
    -moz-appearance: textfield;
}

.div-saldo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100% !important;
  margin: 10px 0;
  padding-top: 10px;
  border-top: 1px solid #ccc;
  color: #000;
}

.div-fecha {
  width: 100% !important;
  margin: 0 0 10px 0;

}

.div-fecha p:first-child {
  font-weight: 700;
  margin: 0 0 10px 0;
}

.p-fecha {
  margin: 0 0 10px 0;
  font-weight: 700;
  font-size: 1.5rem;
}

.div-saldo p{
  font-weight: 700;
  margin: 0;
}

.input-alerta-danger {
  border: 1px solid #FF4858 !important;
}

.p-alerta {
  margin: 0;
  font-weight: 300;
  color: #a9a9a9;
  margin-bottom: 10px;
  font-size: 0.8rem;
}

.p-alerta-danger {
  margin: 0;
  font-weight: 300;
  color: #FF4858;
  margin-bottom: 10px;
  font-size: 0.8rem;
}


@media screen and (max-width: 768px){
  .form-plugin {
    width: 70%;
  }

  .form-plugin div {
    width: 100%;
  }

  .form-plugin button {
    width: 40%;
  }
}

@media (min-width: 768px) and (max-width: 1300px){
  .form-plugin  {
    width: 60%;
  }

  .form-plugin div {
    width: 70%;
  }

  .form-plugin button {
    width: 30%;
  }
}
`;

  // index.js
  var FormNovedades = class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
      this.render();
      this.initializeDataEventListener();
    }
    initializeDataEventListener() {
      if (!this.dataEventListenerInitialized) {
        document.addEventListener("obtenerData", (e) => {
          const respuesta = e['detail'];
          this.addOptions(respuesta);
          this.configurarEventos(respuesta);
        });
        this.dataEventListenerInitialized = true;
      }
    }
    render() {
      this.shadowRoot.innerHTML = `
      <style>
        ${css}
      </style>
      <div class="container-plugin">
    
        <form class="form-plugin" id="form-novedad" onsubmit="this.enviarDatos">

        <h2>Crear Convenio</h2>
        <div>
        
          <label for="convenio">Convenio *</label>
          <select 
            id="convenio" 
            name="convenio"
          >
          </select>

          <p class="p-alerta" id="convenio-alerta">Por favor seleccionar un convenio</p>
          
          <label for="fechaLimite">Fecha limite para crear la novedad</label>
          <input 
            type="text"
            id="fechaLimite"
            name="fechaLimite"
            placeholder="YYYY-MM-DD"
            class="numero"
            readonly
          />

          <p class="p-alerta" id="fechaP-alerta">Verificar si la fecha limite no se ha cumplido.</p>

          <label for="cuotaMensual">Cuota Mensual *</label>
          <input 
            type="text" 
            id="cuotaMensual" 
            name="cuotaMensual" 
            placeholder="Cuota mensual"
            class="numero"
          />
          <p class="p-alerta" id="coutaM-alerta">Por favor ingresar una cuota mensual, si la cuota ya tiene valor no ingresarlo</p>

          <label for="formaPago">Forma de pago *</label>
          <select 
            id="formaPago" 
            name="formaPago"
          >
            <option value="0">--Seleccionar forma de pago--</option>
            <option value="N\xF3mina">N\xF3mina</option>
            <option value="Taquilla">Taquilla</option>
          </select>
          <p class="p-alerta" id="formaP-alerta">Por favor seleccionar una forma de pago</p>
          
        </div>

        <button type="submit" id="submit-button">Crear Convenio</button>
        </form>
      </div>
    `;
    }
    // Eventos que se ejecutan despues del renderizado del componente
    async configurarEventos(respuesta) {
      const data = await respuesta;
      this.shadowRoot.querySelector("#convenio").addEventListener("change", (e) => this.handleConvenioChange(e, data));
      this.shadowRoot.querySelector("#form-novedad").addEventListener("submit", (e) => this.enviarDatos(e, data));
      this.shadowRoot.querySelector("#cuotaMensual").setAttribute("disabled", true);
      this.shadowRoot.querySelector("#formaPago").setAttribute("disabled", true);
    }
    // Metodo para agregar las opciones al select de convenios
    addOptions(data) {
      const convenio = this.shadowRoot.querySelector("#convenio");
      const option = document.createElement("option");
      option.value = "0";
      option.textContent = "--Seleccionar convenio--";
      convenio.appendChild(option);
      Object.values(data).forEach((value) => {
        const option2 = document.createElement("option");
        option2.value = value.NomNovedad;
        option2.textContent = value.NomNovedad;
        convenio.appendChild(option2);
      });
    }
    // Funcion para obtener los datos de un convenio cuando este se haya seleccionado en 
    handleConvenioChange(e, data) {
      const cuotaMensual = this.shadowRoot.querySelector("#cuotaMensual");
      const formaPago = this.shadowRoot.querySelector("#formaPago");
      const plazoMensual = this.shadowRoot.querySelector("#plazoMensual");
      const saldoTotal = this.shadowRoot.getElementById("saldoTotal");
      const convenio = this.shadowRoot.getElementById("convenio");
      const textoPfecha = this.shadowRoot.getElementById("fechaP-alerta");
      const textoCuota = this.shadowRoot.getElementById("coutaM-alerta");
      const fechaLimite = this.shadowRoot.querySelector("#fechaLimite");
      let tipoNovedad = "";
      if (convenio.value === "0") {
        this.shadowRoot.querySelector("#cuotaMensual").setAttribute("disabled", true);
        this.shadowRoot.querySelector("#formaPago").setAttribute("disabled", true);
        fechaLimite.value = "";
      } else {
        this.shadowRoot.querySelector("#cuotaMensual").removeAttribute("disabled", false);
        this.shadowRoot.querySelector("#formaPago").removeAttribute("disabled", false);
      }
      if (plazoMensual) {
        saldoTotal.innerText = "$ 0 COP";
        plazoMensual.value = "";
      }
      cuotaMensual.value = "";
      formaPago.value = "0";
      if (!textoPfecha) {
        const textoPfecha2 = document.createElement("p");
        textoPfecha2.innerText = "Verificar si la fecha limite no se ha cumplido.";
        textoPfecha2.classList.add("p-alerta");
        textoPfecha2.id = "fechaP-alerta";
        fechaLimite.insertAdjacentElement("afterend", textoPfecha2);
      } else {
        textoPfecha.innerText = "Verificar si la fecha limite no se ha cumplido.";
        textoPfecha.classList.remove("p-alerta-danger");
        textoPfecha.classList.add("p-alerta");
      }
      Object.values(data).forEach((valueN) => {
        if (valueN.NomNovedad === e.target.value) {
          fechaLimite.value = valueN.fechalimite;
          const fechaLimiteW = new Date(fechaLimite.value);
          const fechaLimiteW2 = new Date(fechaLimiteW.getFullYear(), fechaLimiteW.getMonth(), fechaLimiteW.getDate());
          const fechaActual = /* @__PURE__ */ new Date();
          const fechaActualW = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate());
          if (fechaLimiteW2 < fechaActualW) {
            fechaLimite.style.color = "#FF4858";
            fechaLimite.style.fontWeight = "bold";
          } else {
            fechaLimite.style.color = "black";
          }
          tipoNovedad = valueN.tiponovedad;
        }
      });
      Object.values(data).forEach((valueN) => {
        if (valueN.NomNovedad === e.target.value) {
          if (valueN.cuotapordefecto === "0") {
            cuotaMensual.removeAttribute("readonly");
            cuotaMensual.addEventListener("input", () => {
              cuotaMensual.value = this.agregarPuntos(cuotaMensual.value.replace(/[^0-9]/g, ""));
              const plazoMensual2 = this.shadowRoot.getElementById("plazoMensual");
              if (plazoMensual2) {
                const saldoTotal2 = this.shadowRoot.getElementById("saldoTotal");
                saldoTotal2.innerText = "$ " + this.agregarPuntos(cuotaMensual.value.replace(/[^0-9]/g, "") * plazoMensual2.value) + " COP";
              }
              if (cuotaMensual.value === "" || cuotaMensual.value === "0" || cuotaMensual.value < 0) {
                textoCuota.innerText = "Debe ingresar un valor mayor a 0";
                this.eliminarAlertas("cuotaMensual", "coutaM-alerta");
                setTimeout(() => {
                  textoCuota.innerText = "Si la cuota ya tiene valor no ingresarlo, de lo contrario ingesar una cuota mensual";
                }, 3e3);
                cuotaMensual.value = "";
                return;
              }
            });
          } else if (valueN.cuotapordefecto !== "0") {
            cuotaMensual.setAttribute("readonly", true);
            cuotaMensual.value = this.agregarPuntos(valueN.cuotapordefecto);
          }
        }
      });
      if (tipoNovedad === "NCCS" || tipoNovedad === "NVCS") {
        this.renderizarInformacion();
        this.calcularSaldo();
      } else {
        const plazoMensualExistente = this.shadowRoot.getElementById("plazoMensual");
        const saldoTotalExistente = this.shadowRoot.getElementById("div-total");
        const labelPlazoExistente = this.shadowRoot.getElementById("label-plazo");
        const textoPExistente = this.shadowRoot.getElementById("plazoM-alerta");
        if (plazoMensualExistente) {
          plazoMensualExistente.value = "";
          plazoMensualExistente.remove();
          saldoTotalExistente.remove();
          labelPlazoExistente.remove();
          textoPExistente.remove();
        }
      }
    }
    // Metodo para renderizar los campos adicionales, plazo mensual y saldo total, pero solo se renderizan si el tipo de novedad es "novedad varia no causada con saldo" o "novedad varia causada con saldo"
    renderizarInformacion() {
      const plazoMensualExistente = this.shadowRoot.getElementById("plazoMensual");
      const textoPforma = this.shadowRoot.getElementById("formaP-alerta");
      const plazoSaldo = `
      <label for="plazoMensual" id="label-plazo">Plazo Mensual *</label>
      <input 
        type="number" 
        id="plazoMensual" 
        name="plazoMensual" 
        placeholder="Plazo mensual"
        class="numero"
      />

      <p class="p-alerta" id="plazoM-alerta">Debe ingresar un plazo mensual</p>

      <div class="div-saldo" id="div-total">
        <p id="saldoTotalLabel">Saldo Total:</p>
        <p id="saldoTotal">$ 0 COP</p>
      </div>
    `;
      if (!plazoMensualExistente) {
        textoPforma.insertAdjacentHTML("afterend", plazoSaldo);
      }
    }
    // Metodo para calcular el saldo total segun el plazo mensual y la cuota mensual, tambien se agrega la funcion para agregar comas a los numeros
    calcularSaldo() {
      const plazoMensual = this.shadowRoot.getElementById("plazoMensual");
      const saldoTotal = this.shadowRoot.getElementById("saldoTotal");
      const cuotaMensual = this.shadowRoot.getElementById("cuotaMensual");
      const textoPlazo = this.shadowRoot.getElementById("plazoM-alerta");
      if (plazoMensual) {
        plazoMensual.addEventListener("input", () => {
          const cuotaMensualValue = cuotaMensual.value;
          const numeroCuota = parseFloat(cuotaMensualValue.replace(/[^0-9]/g, ""));
          let plazoMensualValue = parseInt(plazoMensual.value);
          let saldo = 0;
          if (plazoMensualValue === 0 || plazoMensualValue < 0) {
            textoPlazo.innerText = "Por favor ingresar un plazo mensual mayor a 0";
            this.eliminarAlertas("plazoMensual", "plazoM-alerta");
            setTimeout(() => {
              textoPlazo.innerText = "Por favor ingresar un plazo mensual";
            }, 3e3);
            plazoMensual.value = "";
          } else if (plazoMensualValue > 999) {
            textoPlazo.innerText = "El plazo mensual no puede superar las 999 cuotas";
            this.eliminarAlertas("plazoMensual", "plazoM-alerta");
            setTimeout(() => {
              textoPlazo.innerText = "Por favor ingresar un plazo mensual";
            }, 3e3);
            plazoMensual.value = "";
          } else if (!Number.isInteger(plazoMensualValue) || plazoMensual.value.toString().includes(".")) {
            textoPlazo.innerText = "Por favor ingresar un plazo mensual entero";
            this.eliminarAlertas("plazoMensual", "plazoM-alerta");
            setTimeout(() => {
              textoPlazo.innerText = "Por favor ingresar un plazo mensual";
            }, 3e3);
            plazoMensual.value = "";
            saldoTotal.innerText = "$ 0 COP";
          } else if (!plazoMensualValue) {
            plazoMensualValue = 0;
            saldo = plazoMensualValue * numeroCuota || 0;
            saldo = this.agregarPuntos(saldo);
            saldoTotal.innerText = "$ 0 COP";
          } else {
            let saldo2 = plazoMensualValue * numeroCuota || 0;
            saldo2 = this.agregarPuntos(saldo2);
            saldoTotal.innerText = "$ " + saldo2 + " COP";
          }
        });
      }
      
    }
    //Funcion para agregar los puntos de los miles a los valores numericos
    agregarPuntos(nStr) {
      nStr += "";
      let x = nStr.split(".");
      let x1 = x[0];
      let x2 = x.length > 1 ? "." + x[1] : "";
      let rgx = /(\d+)(\d{3})/;
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, "$1.$2");
      }
      return x1 + x2;
    }
    // Metodo para enviar los datos del formulario
    enviarDatos(e, data) {
      e.preventDefault();
      const selectors = {
        convenio: this.shadowRoot.getElementById("convenio").value,
        cuotaMensual: this.shadowRoot.getElementById("cuotaMensual").value,
        formaPago: this.shadowRoot.getElementById("formaPago").value,
        plazoMensual: this.shadowRoot.getElementById("plazoMensual") ? this.shadowRoot.getElementById("plazoMensual").value : '',
        saldoTotal: this.shadowRoot.getElementById("saldoTotal") ? this.shadowRoot.getElementById("saldoTotal").innerText : ''
      };
      
      const convenio = selectors.convenio;
      const cuotaMensual = selectors.cuotaMensual.replace(/[^0-9]/g, "");
      let formaPago = selectors.formaPago;
      const plazoMensual = selectors.plazoMensual || '';
      const saldoTotal = selectors.saldoTotal ? selectors.saldoTotal.replace(/[^0-9]/g, "") : '';
      
      if (convenio === "0") {
        this.eliminarAlertas("convenio", "convenio-alerta");
      }
      if (cuotaMensual.trim() === "") {
        this.eliminarAlertas("cuotaMensual", "coutaM-alerta");
      }
      if (formaPago === "0") {
        this.eliminarAlertas("formaPago", "formaP-alerta");
      } else {
        formaPago = selectors.formaPago === "N\xF3mina" ? "N" : "T";
      }
      if (plazoMensual === "") {
        this.eliminarAlertas("plazoMensual", "plazoM-alerta");
      }
      if (convenio === "0" || cuotaMensual.trim() === "" || formaPago === "0" || plazoMensual === "") {
        return;
      }
      let codigo = "";
      data.forEach((value) => {
        if (value.NomNovedad === convenio) {
          codigo = value.codigo;
        }
      });
      const formData = {
        codigo,
        nombreNovedad: convenio,
        cuotaMensual,
        formaPago,
        plazoMensual,
        saldoTotal
      };
      const textoPfecha = this.shadowRoot.getElementById("fechaP-alerta");
      Object.values(data).forEach((valueN) => {
        if (valueN.NomNovedad === this.shadowRoot.getElementById("convenio").value) {
          const fechaLimite = valueN.fechalimite;
          const fechaLimiteW = new Date(fechaLimite);
          const fechaLimiteW2 = new Date(fechaLimiteW.getFullYear(), fechaLimiteW.getMonth(), fechaLimiteW.getDate());
          const fechaActual = /* @__PURE__ */ new Date();
          const fechaActualW = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate());
          if (fechaLimiteW2 < fechaActualW) {
            textoPfecha.innerText = "La fecha limite para crear la novedad ya se cumplio.";
            textoPfecha.classList.remove("p-alerta");
            textoPfecha.classList.add("p-alerta-danger");
            return;
          }
          const event = new CustomEvent("formularioSubmit", {
            detail: formData
          });
          document.dispatchEvent(event);
          const plazoMensualExistente = this.shadowRoot.getElementById("plazoMensual");
          const saldoTotalExistente = this.shadowRoot.getElementById("div-total");
          const labelPlazoExistente = this.shadowRoot.getElementById("label-plazo");
          const textoPExistente = this.shadowRoot.getElementById("plazoM-alerta");
          const formaPago2 = this.shadowRoot.getElementById("formaPago");
          if (plazoMensualExistente) {
            plazoMensualExistente.value = "";
            plazoMensualExistente.remove();
            saldoTotalExistente.remove();
            labelPlazoExistente.remove();
            textoPExistente.remove();
            formaPago2.setAttribute("disabled", true);
          }
          this.shadowRoot.getElementById("form-novedad").reset();
        }
      });
    }
    // Metodo para eliminar las alertas de los campos del formulario
    eliminarAlertas(elemento, textoP) {
      const elemento2 = this.shadowRoot.getElementById(elemento);
      elemento2.classList.add("input-alerta-danger");
      const textoP2 = this.shadowRoot.getElementById(textoP);
      textoP2.classList.add("p-alerta-danger");
      setTimeout(() => {
        elemento2.classList.remove("input-alerta-danger");
        textoP2.classList.remove("p-alerta-danger");
      }, 3e3);
    }
  };
  customElements.define("form-novedades", FormNovedades);
})();
