//src/app/interfaces/productResponse.interface.ts
export interface ProductResponse {
    _id: string;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    categoria: string;
    usuario_id:string;
    imagenes: string[];
    fecha_creacion: string
    fecha_actualizacion: string;
    __v: number;
}
