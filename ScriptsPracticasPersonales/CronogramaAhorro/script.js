/**
 *  Monto objetivo: $17,000,000
 * Aporte inicial: $102,000 (ya está en la cuenta).
 * Aporte Mensual: "calculo"
 * Tasa de interés anual: 12% (lo que da una tasa de interés mensual del 1%).
 * Fecha de inicio del ahorro: 30/10/2024.
 * Fecha de fin del ahorro: 31/12/2026.
 * Número total de meses: Se calculará entre las fechas dadas.
 */


// Variables -> obtener los elementos del DOM
let montoObjetivo = document.getElementById('montoObjetivo');
let montoInicial = document.getElementById('montoInicial');
let TEA = document.getElementById('TEA');
let fechaInicial = document.getElementById('fechaInicial');
let fechaFinal = document.getElementById('fechaFinal');
// let cantidadMeses = document.getElementById('cantidadMeses')
// let montoMensual = document.getElementById('montoMensual')

function calcular(){
    let TEMG = ((1 + TEA) ** (1/12) -1)

    cantidadMeses = (fechaFinal - fechaInicial) * 12
    

    


    document.getElementById("TEM").value = TEMG
}