class ContenedorMemoria {
    
    constructor() {
        this.elementos = [];
    }

    listar(id) {
        const elem = this.elementos.find(e => e.id === id);
        if (!elem) {
            throw new Error('No existe el elemento con id ' + id);
        } else {
            return elem;
        }
    }

    listarTodos() {
        return [...this.elementos];
    }

    guardar(elem) {
        let newId
        if (this.elementos.length === 0) {
            newId = 1;
        } else {
            newId = this.elementos[this.elementos.length - 1].id + 1;
        }
    }

    actualizar(elem) {
        elem.id = Number(elem.id);
        const index = this.elementos.findIndex(e => e.id === elem.id);
        if (index === -1) {
            throw new Error('No existe el elemento con id ' + elem.id);
        } else {
            this.elementos[index] = elem;
        }
    }

    borrar(id) {
        const index = this.elementos.findIndex(e => e.id === id);
        if (index === -1) {
            throw new Error('No existe el elemento con id ' + id);
        } else {
            this.elementos.splice(index, 1);
        }
    }

    borrarTodos() {
        this.elementos = [];
    }
}

export default ContenedorMemoria;

