export interface DVentaDTO{
    id_detalle_venta: integer;
    cantidad: integer;
    producto: string;
    importe: integer;
    id_prod: integer;
    codigo_venta: integer;
}

export interface DVentaRegistrarDTO{
    cantidad: integer;
    producto: string;
    importe: integer;
    id_prod: integer;
    codigo_venta: integer;
}