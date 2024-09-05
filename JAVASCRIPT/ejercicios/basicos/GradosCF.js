/**
 * ingresar una temperatura en grados Celsius y luego convierta esa temperatura a grados Fahrenheit. 
 * La fórmula para convertir grados Celsius a Fahrenheit es: F = (9/5) * C + 32
 * F = Fahrenheit 
 * C = Celsius
 */

const GradosC = 25

function ConvetirGrados(GradosC){
    let GradosF = (9/5) * GradosC + 32
    console.log(`Grados en C = ${GradosC}°C = Grados en F = ${GradosF}°F`);
}

ConvetirGrados(GradosC)