export interface ProductoDTO{
    id_prod: integer;
    precio_prod: double;
    cant_prod: integer;
    nombreprod: string;
    estado: boolean;
    cod_cat: integer;
}

export interface ProductoRegistrarDTO{
    precio_prod: double;
    cant_prod: integer;
    nombreprod: string;
    estado: boolean;
    cod_cat: integer;
}