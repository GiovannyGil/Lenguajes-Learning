// PARAMETROS
// permiten pasarle informacion a una funcion para que haga operaciones con dicha informacion


//parámetro en lo que lleva o se necesita para que funcione el función
// una función puede tener un solo parámetro o muchos
const saludo = (name='amigo') =>{
    name= name;
    console.log(`hola!!, ${ name}`);
}

let name1 = 'GIO'
saludo(name1); // <-- argumento para la función
saludo();


/*
la diferencia entre el argumento y el parámetro, es que el parámetro es el valor que pide la función en los paréntesis ()

y el argumento es el valor que se le da a la función cuando es llamada para que los use, pasando estos a ser parámetros al entrar a la función
*/