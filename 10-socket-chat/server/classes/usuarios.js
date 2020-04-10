class Usuarios {

    constructor() {
        this.personas = [];
    }

    agregarPersona(id, nombre, sala) {
        let persona = { id, nombre, sala };
        this.personas.push(persona);
        return this.getPersonasPorSala(sala);
    }

    getPersona(id) {
        let persona = this.personas.find(x => x.id === id);
        return persona;
    }

    getPersonas() {
        return this.personas;
    }

    getPersonasPorSala(sala) {
        return this.personas.filter(x => x.sala == sala);
    }

    borrarPersona(id) {
        let personaBorrada = this.getPersona(id);
        this.personas = this.personas.filter(x => x.id !== id);
        return personaBorrada;
    }



}


module.exports = {
    Usuarios
}