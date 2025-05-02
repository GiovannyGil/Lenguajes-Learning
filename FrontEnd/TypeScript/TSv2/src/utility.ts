namespace Utility{ // espacio de trabajo
    export namespace Taxes{ // espacio exportado, uso desde otros
        export function CalcIva(price: number){
            return (price*0.19)*price;
        }
        export function CalcPenaIva(price: number){
            return (price*0.30)*price;
        }
    }
}