"use strict";
// ENUMS
// pueden ser numericos como cadenas de texto
var Roles;
(function (Roles) {
    Roles[Roles["User"] = 0] = "User";
    Roles[Roles["Admin"] = 1] = "Admin";
    Roles[Roles["SuperAdmin"] = 2] = "SuperAdmin";
})(Roles || (Roles = {}));
console.log(Roles.Admin);
const roles = {
    User: 0,
    Admin: 1,
    SuperAdmin: 2
};
