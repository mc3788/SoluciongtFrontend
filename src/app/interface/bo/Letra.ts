export class Letra {
    id: number;
    serie: string;
    idUsuario: number;
    status: string;

    constructor(
                 id: number,
                 serie: string,
                 idUsuario: number,
                 status: string
    ) {
      this.id = id;
      this.serie = serie;
      this.idUsuario = idUsuario;
      this.status = status;
    }

  }
