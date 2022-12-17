export interface UsuarioDTO{
    codigo_user: integer;
    nombre_user: string;
    ape_user: string;
    cargo: string;
    username: string;
    pass: string;
    estado: boolean;
}

export interface UsuarioRegistrarDTO{
    nombre_user: string;
    ape_user: string;
    cargo: string;
    username: string;
    pass: string;
    estado: boolean;
}