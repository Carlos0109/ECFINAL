export interface VentaDTO{
    codigo_venta: integer;
    fech_venta: string;
    nom_cli: string;
    total: double;
    estado: boolean;
    codigo_user: integer;
    codigocliente: integer;
}

export interface VentaRegistrarDTO{
    fech_venta: string;
    nom_cli: string;
    total: double;
    estado: boolean;
    codigo_user: integer;
    codigocliente: integer;
}