/**
 * Array.toLocaleString()
 * 
 * es un metodo que convierte un array en una cadena de texto (string) y separa los elementos por un string, por defecto es ","
 * o por una configuracion personalizada para el manejo de los datos/cadena
 */

const array1 = [1, 'a', new Date('21 Dec 1997 14:12:00 UTC')];
const localeString = array1.toLocaleString('en', { timeZone: 'UTC' });

console.log(localeString);
// Expected output: "1,a,12/21/1997, 2:12:00 PM",
// This assumes "en" locale and UTC timezone - your results may vary



// ---------------
const prices = ["￥7", 500, 8123, 12];
prices.toLocaleString("ja-JP", { style: "currency", currency: "JPY" });

// "￥7,￥500,￥8,123,￥12"
