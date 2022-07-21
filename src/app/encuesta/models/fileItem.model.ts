
export class FileItem {

    public archivo: File;
    public nombreArchivo: string;
    public url: string;
    public estaSubiendo: boolean;
    public progreso: number;

    constructor( archivo: File, nombreArchivo: string ) {

        this.archivo = archivo;
        this.nombreArchivo = nombreArchivo;
        /* this.nombreArchivo = archivo.name */;

        this.estaSubiendo = false;
        this.progreso = 0;

    }

}