
export class Usuario {

    constructor(
        public id: string,
        public control: string,
        public nombre: string,
        public paterno: string,
        public materno: string,
        public semestre_proximo: number,
        public promedio: number,
        public sexo: string,
        public fecha_nacimiento: string,
        public curp: string,
        public carrera: string,
        public correo: string,
        public enviado?: boolean,
        public fecha_envio?: string,
        public folio?: string,
        public password?: string,
        public envio_archivos?: boolean
    ){}

}


    