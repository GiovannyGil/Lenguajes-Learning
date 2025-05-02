// INTERFACES EXTENDS ==== "HERENCIA" de interfaces


interface Person{
    id: number;
    name: string;
}
interface Employees extends Person{
    dept: number;
}

interface Customer extends Person{
    country: string;
}


const cust:Customer = {id: 1,name: "John",country: "United States"};
const empl:Employees={id: 1,name: "John",dept: 2};