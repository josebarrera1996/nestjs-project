// Agregando nuevas propiedades al 'Request' de 'Express' dentro de este namespace
declare namespace Express {
    interface Request {
        idUser: string,
        roleUser: string
    }
}