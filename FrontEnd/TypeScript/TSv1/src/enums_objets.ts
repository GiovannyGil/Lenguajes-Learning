// ENUMS
// pueden ser numericos como cadenas de texto
enum Roles{
    User, // se puede uniciar en el que se desee dando le el valor ej::: User = 1; o strings ...
    Admin,
    SuperAdmin
}
console.log(Roles.Admin);


const roles = { // objeto
    User:0,
    Admin:1,
    SuperAdmin:2
}