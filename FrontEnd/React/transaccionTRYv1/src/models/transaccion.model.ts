export interface Transaccion {
    TransaccionID: string,
    ClienteID: number,
    VehiculoID: number,
    ConcecionarioID: number,
    FechaVenta: string,
    PrecioVenta: number
}

export type createTrans = Omit<Transaccion, 'TransaccionID'>