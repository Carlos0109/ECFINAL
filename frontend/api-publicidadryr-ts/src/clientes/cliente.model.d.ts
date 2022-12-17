export interface ClienteDTO{
    codigocliente: integer;
    nombre: string;
    apellido: string;
    telefono: internal;
    estado: boolean;
}

export interface ClienteRegistrarDTO{
    nombre: string;
    apellido: string;
    telefono: internal;
    estado: boolean;
}